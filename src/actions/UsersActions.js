import firebase from 'react-native-firebase';
import { USERS_LOADED } from './types';
import { fetchData, arraify } from '../utils';

export const fetchUsers = () => 
    dispatch => 
        fetchData(firebase.database().ref('usersDb'), 
        usersSnapshot => dispatch({
            type: USERS_LOADED,
            payload: arraify(usersSnapshot.val())
        }));
