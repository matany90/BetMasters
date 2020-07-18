import firebase from 'react-native-firebase';

import { arraify, fetchData } from '../utils';
import { MAIN_LEAGUES_LOADED } from './types';

export const fetchMainLeagues = () =>
    dispatch =>
        fetchData(firebase.database().ref('/mainLeagues'),
            leaguesSnapshot => dispatch({
                type: MAIN_LEAGUES_LOADED,
                payload: arraify(leaguesSnapshot.val()) || []
            }));
