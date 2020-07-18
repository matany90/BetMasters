const admin = require('firebase-admin');
const functions = require('firebase-functions');
const { config: { apiBaseUrl, apiKey, eventsInterval, dateFormat} } = require('./footballAPI.config');
const moment = require('moment');
const _ = require('lodash');

admin.initializeApp();

const fetchFromDB = path => admin.database().ref(path).once('value')
  .then(snapshot => snapshot.val());

const footballAPI = require('axios').default.create({
  baseURL: apiBaseUrl,
  params: {
    APIkey:  apiKey
  }
});

const fetchMatchesFromAPI = () => 
  footballAPI.get('/', {
    params: {
      action: 'get_events',
      from: moment().subtract(eventsInterval).format(dateFormat) ,
      to: moment().add(eventsInterval).format(dateFormat)
    }
  });

const fetchLeaguesFromAPI = () => 
  footballAPI.get('/', {
    params: {
      action: 'get_leagues'
    }
  });

const updateLeaguesFromAPI = () => 
  Promise.all([ fetchLeaguesFromAPI(),  fetchFromDB('/matches') ])
  .then(results => {
    [{ data }, leaguesUpdates] = results;
    leaguesUpdates = leaguesUpdates || {};

    data.forEach(league =>  leaguesUpdates[league.league_id] = _.merge(leaguesUpdates[league.league_id], league));

    return admin.database().ref('/matches').update(leaguesUpdates);
  });
  

const formatMatch =
  ({ match_hometeam_name,
    match_awayteam_name,
    match_date,
    match_time,
    match_hometeam_score,
    match_awayteam_score,
    match_status,
    country_name,
    league_name }) =>
    ({
      hometeamName: match_hometeam_name,
      hometeamScore:  match_hometeam_score,
      awayteamName: match_awayteam_name,
      awayTeamScore: match_awayteam_score,
      matchStatus: match_status,
      hometeamOdd: 1.2,
      awayteamOdd: 1.7,
      drawOdd: 2.4,
      date: match_date,
      time: match_time,
      countryName: country_name,
      leagueName: league_name  
    });

const updateFromAPI = () => {
  const fetchMatchesPromise =  fetchMatchesFromAPI();
  
  return Promise.all([fetchMatchesPromise.then(updateMatchesFromAPI),
  fetchMatchesPromise.then(updateFormsFromAPI)]);
};
 
  
  
const updateMatchesFromAPI = ({ data }) =>
  fetchFromDB('/matches')
    .then(matchUpdates => {
      data.forEach(match => matchUpdates[match.league_id] = _.merge(matchUpdates[match.league_id],
        { matches: { [match.match_id]: formatMatch(match) } }));

      return matchUpdates;
    });

const hasPendingMatch = (bets, matches) => bets.find(({ matchUid }) => 
  matches.find(match => match.match_id === matchUid && match.match_status !== "FT"));

const isCorrectBet = (bet, { match_hometeam_score, match_awayteam_score }) => 
        (bet === '1' && match_hometeam_score > match_awayteam_score) ||
        (bet === 'x' && match_hometeam_score === match_awayteam_score) ||
        (bet === '2' && match_hometeam_score < match_awayteam_score);

const updateFormsFromAPI = ({ data }) => 
   fetchFromDB('/forms')
    .then(formUpdates => {
      _.forEach(formUpdates, userForms => _.forEach(userForms, form => 
        form.won = hasPendingMatch(form.bets, data)? -1 : form.bets.every(({ bet, matchUid }) => 
                        isCorrectBet(bet, data.find(match => match.match_id === matchUid))) ? 1 : 0
      ));
      
      return formUpdates;
    });

exports.updateMatchesFromAPI = functions.https.onRequest((request, response) => {
  updateLeaguesFromAPI()
  .then(updateFromAPI)
  .then(([matches, forms]) => admin.database().ref().update({ matches, forms }))
  .catch(err => console.error("Football API matches update failure:\n" + err));

  response.sendStatus(200);
});