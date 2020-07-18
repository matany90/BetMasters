import firebase from 'react-native-firebase';
import { NavigationActions } from 'react-navigation';
import moment from 'moment';
import { 
    MATCHES_LIST_FETCH,
    SLIDER_VALUE_CHANGED,
    NEW_FORM_UPDATE_PUSH,
    NEW_FORM_UPDATE_SLICE,
    NEW_FORM_UPDATE_CHANGE_BET,
    FETCH_CURRENT_FORMS,
    OPEN_FORM,
    SUBMIT_FORM_SUCCESS,
    SUBMIT_FORM
 } from './types.js';
import { arraify } from '../utils';

export const fetchMatchesList = () => {
	return (dispatch) => {
        const currentTimestamp = Math.floor(new Date().getTime() / 1000);
        const endTimestamp = currentTimestamp + (30 * 24 * 60 * 60); // one month
        firebase.database().ref('/matches/437')
        .orderByChild('timestamp')
        .startAt(currentTimestamp)
        .endAt(endTimestamp)
		.on('value', snapshot => {
			dispatch({ type: MATCHES_LIST_FETCH, payload: snapshot.val() });
		});
	};
};

/* eslint-disable no-param-reassign */
export const updateNewForm = (newForm, matchUid, bet, odd) => {
    const val = { matchUid, bet, odd };

    const isExistsWithDifferentBet = newForm.findIndex((element) =>
    element.matchUid === matchUid && element.bet !== bet);
    const isExists = newForm.findIndex((element) =>
    element.matchUid === matchUid && element.bet === bet);

    if (isExistsWithDifferentBet !== -1) {
        //replace bet with pressed bet
        return {
            type: NEW_FORM_UPDATE_CHANGE_BET,
            payload: { isExistsWithDifferentBet, bet, odd }
        };
        //newForm[isExistsWithDifferentBet].bet = bet;
    } else if (isExists !== -1) {
        //remove from array
        return {
            type: NEW_FORM_UPDATE_SLICE,
            payload: isExists
        };
    } else {
        return {
            type: NEW_FORM_UPDATE_PUSH,
            payload: val
        };
    }
};

export const fetchCurrentForms = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/forms/${currentUser.uid}`)
        .orderByChild('timestamps')
        .on('value', snapshot => {
            dispatch({ type: FETCH_CURRENT_FORMS, payload: arraify(snapshot.val()) });
        });
    };
};

export const openForm = (navigator, formUid) => 
    dispatch => {
        dispatch(NavigationActions.navigate({ routeName: 'Form' }));
        dispatch({ type: OPEN_FORM, payload: formUid });
    };


/* eslint-disable no-param-reassign */

export const submitForm = (newForm, coins, league) => {
    return (dispatch) => {
        const { currentUser } = firebase.auth();
        const totalOdd = newForm.map(item => item.odd).reduce((prev, next) => prev * next);
        const totalCoins = totalOdd * coins;
        //const timestamp = Math.floor(new Date().getTime() / 1000);
        const now = moment();
        const date = now.format('YYYY-MM-DD');
        const time = now.format('HH:mm');
        const val = {
            coins,
            date,
            time,
            totalOdd,
            totalCoins,
            won: -1,
            bets: newForm,
            leagueUid: league.uid
        };
           dispatch({ type: SUBMIT_FORM });
            firebase.database().ref(`/forms/${currentUser.uid}`)
                .push(val)
                .then(() => {
                    firebase.database().ref(league.level ? 'mainLeagues' : 'friendlyLeagues')
                        .child(league.uid)
                        .child('participants')
                        .child(currentUser.uid)
                        .child('coins')
                        .transaction(currentCoins => {
                            return (currentCoins || 0) - coins;
                        })
                        .then(() => {
                            dispatch({ type: SUBMIT_FORM_SUCCESS });
                            dispatch(NavigationActions.back());
                        });
                });
    };
};
