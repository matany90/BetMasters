import firebase from 'react-native-firebase';
import { NavigationActions } from 'react-navigation';
import { arraify } from '../utils';
import {
    OPEN_ACCOUNT_SUCCESS
} from './types.js';

export const openAccount = (accountId, displayName) => {
    return (dispatch) => {
        firebase.database().ref(`/forms/${accountId}`)
            .orderByChild('timestamps')
            .once('value', snapshot => {
                const avatarPromises = firebase.storage().ref(`/users/${accountId}`)
                    .child('profile_picture.jpg')
                    .getDownloadURL()
                    .then(avatarURL => ({ avatarURL }));

                Promise.all(avatarPromises)
                    .then(avatar => {
                        const val = { forms: arraify(snapshot.val()), displayName, avatar };
                        dispatch({ type: OPEN_ACCOUNT_SUCCESS, payload: val });
                        dispatch(NavigationActions.navigate({ routeName: 'Account' }));
                    });
            });
    };
};
