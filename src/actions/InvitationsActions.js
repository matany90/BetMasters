import firebase from 'react-native-firebase';
import { NavigationActions } from 'react-navigation';
import { LEAGUE_INVITATIONS_FETCH_SUCCESS, LEAGUE_INVITATION_ACCEPTED, 
        LEAGUE_INVITATION_REJECTED } from './types';
import { arraify } from '../utils';

export const readLeaguesInvitations = () =>
    dispatch => dispatch(NavigationActions.navigate({ routeName: 'LeaguesInvitations' }));

export const fetchLeaguesInvitations = () =>
    dispatch => {
        firebase.database().ref('/invitations')
        .orderByChild('friendEmail')
        .equalTo(firebase.auth().currentUser.email)
            .on('value', invitationsSnapshot =>
                dispatch({
                    type: LEAGUE_INVITATIONS_FETCH_SUCCESS,
                    payload: arraify(invitationsSnapshot.val()) || []
                }));
    };

const removeInvitation = (invitationUid, db) =>
    db.ref('/invitations')
        .child(invitationUid)
        .remove();


export const acceptInvitation = (invitationUid, leagueUid) => 
    dispatch => {
        const { uid } = firebase.auth().currentUser;
        const db = firebase.database();
        
        removeInvitation(invitationUid, db)
            .then(() => {
                db.ref('friendlyLeagues').child(leagueUid).child('participants')
                .child(uid)
                .set({
					coins: 1000,
					formsWon: 0,
                    formsLost: 0
				})
                .then(() => dispatch({
                    type: LEAGUE_INVITATION_ACCEPTED
                }));
            });     
    };

export const declineInvitation = invitationUid => 
    dispatch => {
        const db = firebase.database();

        removeInvitation(invitationUid, db)
            .then(() => dispatch({
                type: LEAGUE_INVITATION_REJECTED
            }));
    };
