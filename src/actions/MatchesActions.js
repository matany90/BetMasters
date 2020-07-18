
import firebase from 'react-native-firebase';
import _ from 'lodash';
import { arraify, fetchData } from '../utils';
import {
    FETCH_MATCHES,
    SELECTED_COUNTRY,
    SELECTED_LEAGUE,
    UPDATE_MATCHES_AFTER_PICKER,
    CLEAN_PICKERS
} from './types.js';

export const fetchMatches = () =>
    dispatch =>
        fetchData(firebase.database().ref('/matches'),
            matchesSnapshot =>
                dispatch({ type: FETCH_MATCHES, payload: arraify(matchesSnapshot.val()) }));


export const selectedPickerCountry = (countryChoice, allData) => {
    return (dispatch) => {
        const dataAfterFilter = _.filter(allData, match => {
            return containsCountry(match, countryChoice === 'countryPlaceholder' ? true : countryChoice);
        });
        dispatch({
            type: SELECTED_COUNTRY,
            payload: countryChoice
        });
        dispatch({
            type: UPDATE_MATCHES_AFTER_PICKER,
            payload: dataAfterFilter
        });
    };
};

export const selectedPickerLeauge = (leaugeChoice, allData, countryChoice) => {
    return (dispatch) => {
        if (leaugeChoice === 'leaugePlaceholder') {
            selectedPickerCountry(countryChoice, allData);
        } else {
            const dataAfterFilter = _.filter(allData, match => {
                return containsLeague(match, leaugeChoice);
            });

            dispatch({
                type: SELECTED_LEAGUE,
                payload: leaugeChoice
            });
            dispatch({
                type: UPDATE_MATCHES_AFTER_PICKER,
                payload: dataAfterFilter
            });
        }
    };
};

const containsLeague = (match, leaugeChoice) => {
    if (match.leagueName === leaugeChoice) {
        return true;
    }
    return false;
};

const containsCountry = (match, countryChoice) => {
    if (countryChoice === true) return true;
    if (match.countryName === countryChoice) {
        return true;
    }
    return false;
};

export const cleanPickers = () => {
    return {
        type: CLEAN_PICKERS,
        payload: null
    };
};

/* 
const matchesTorender = (matchesLeagues) => {
    const allMatches = [].concat.apply([], matchesLeagues.map(item => item.matches));
    return allMatches;
  };
 */
