import _ from 'lodash';
import firebase from 'react-native-firebase';
import { GoogleSignin } from 'react-native-google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { Platform } from 'react-native';
import { NavigationActions } from 'react-navigation';
import {
	fetchFriendlyLeagues,
	fetchMatches,
	fetchLeaguesAvatars,
	fetchUsers,
	fetchMainLeagues,
	reduxNav
} from '../actions';
import { locali } from '../../locales/i18n';
import {
	EMAIL_CHANGED,
	PASSWORD_CHANGED,
	USERNAME_CHANGED,
	LOGGING_USER_IN,
	SIGN_UP_NAVIGATE,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAIL,
	FORGOT_PASSWORD,
	LOGOUT,
	RE_PASSWORD_CHANGED,
	LOAD_STARTED,
	LOAD_ENDED
} from './types.js';

export const emailChanged = (email) => {
	return {
		type: EMAIL_CHANGED,
		payload: email
	};
};

export const passwordChanged = (password) => {
	return {
		type: PASSWORD_CHANGED,
		payload: password
	};
};

export const rePasswordChanged = (password) => {
	return {
		type: RE_PASSWORD_CHANGED,
		payload: password
	};
};

export const userNameChanged = (username) => {
	return {
		type: USERNAME_CHANGED,
		payload: username
	};
};

export const loginUser = ({ email, password }) => {
	return (dispatch) => {
		dispatch({ type: LOGGING_USER_IN });

		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(user => dispatch(loginUserSuccess(user)))
			.catch((error) => {
				switch (error.code) {
					case 'auth/user-disabled':
						loginUserFail(dispatch, locali('login_with_email.login.error_user_disabled'));
						break;
					case 'auth/invalid-email':
						loginUserFail(dispatch, locali('login_with_email.login.error_invalid_email'));
						break;
					case 'auth/user-not-found':
						loginUserFail(dispatch, locali('login_with_email.login.error_user_not_found'));
						break;
					case 'auth/wrong-password':
						loginUserFail(dispatch, locali('login_with_email.login.error_wrong_password'));
						break;
					default:
						loginUserFail(dispatch, locali('login_with_email.login.error_default'));
						break;
				}
			});
	};
};

export const signupUser = (email, username, password, navigation) => {
	return (dispatch) => {
		dispatch({ type: LOGGING_USER_IN });
		firebase.database().ref('/usersDb')
			.on('value', snapshot => {
				if (checkUserNameExistance(snapshot, username)) {
					loginUserFail(dispatch, locali('login_with_email.signup.error_username_exists'));
				} else {
					firebase.auth().createUserWithEmailAndPassword(email, password)
						.then(user => {
							firebase.database().ref(`/usersDb/${user.uid}`)
								.set({ displayName: username });
							firebase.messaging().getToken().then(token => {
								firebase.database().ref(`/usersDb/${user.uid}`)
								.update({ notificationToken: token });
							});
							loginUserSuccess(user, navigation, dispatch);
						}
						)
						.catch((error) => {
							switch (error.code) {
								case 'auth/email-already-in-use':
									loginUserFail(dispatch, 
										locali('login_with_email.signup.error_email_already_in_use'));
									break;
								case 'auth/invalid-email':
									loginUserFail(dispatch, locali('login_with_email.signup.error_invalid_email'));
									break;
								case 'auth/operation-not-allowed':
									loginUserFail(dispatch, 
										locali('login_with_email.signup.error_operation_not_allowed'));
									break;
								case 'auth/weak-password':
									loginUserFail(dispatch, locali('login_with_email.signup.error_weak_password'));
									break;
								default:
									loginUserFail(dispatch, locali('login_with_email.signup.error_default'));
									break;
							}
						});
				}
			}
			);
	};
};

const checkUserNameExistance = (snapshot, username) => {
	if (_.find(snapshot.val(), (key) => key.displayName === username)) {
		return true;
	}
	return false;
};

export const signUpButton = ({ email }) => {
	return (dispatch) => {
		dispatch(NavigationActions.navigate({ routeName: 'SignUpWithEmail' }));
		dispatch({ type: SIGN_UP_NAVIGATE, payload: email });
	};
};

export const forgotPassword = ({ email }) => {
	return (dispatch) => {
		dispatch({ type: FORGOT_PASSWORD, payload: email });
		dispatch(NavigationActions.navigate({ routeName: 'ForgotPassword' }));
	};
};

export const passwordRecovery = () => {
	return (dispatch) => {
		dispatch(NavigationActions.back());
	};
};

const configureGoogleSignIn = () => {
	const configPlatform = {
		...Platform.select({
			ios: {},
			android: {},
		}),
	};

	GoogleSignin.configure({
		...configPlatform,
		webClientId: '951196383769-llhl0472tfa179fi5emhl3iikgikip4o.apps.googleusercontent.com',
		offlineAccess: false,
	});
};

const updateUserInDB = ({ uid, email, displayName, photoURL }) => 
	firebase.messaging().getToken()
	.then(token => 
			firebase.database().ref(`/usersDb/${uid}`)
			.update({ email, displayName, photoURL, notificationToken: token }));


const signInSocialUser = authCredential =>
	firebase.auth().signInAndRetrieveDataWithCredential(authCredential)
		.then(userCredential => userCredential.user);

const silentlySignInMailUser = () => {
	const currentUser = firebase.auth().currentUser;

	return (currentUser && Promise.resolve(currentUser)) || Promise.reject();
};

const silentlySignInGoogleUser = () =>
	GoogleSignin.signInSilently()
		.then(user =>
			signInSocialUser(firebase.auth.GoogleAuthProvider.credential(user.idToken)));

const silentlySignInFacebookUser = () =>
	AccessToken.getCurrentAccessToken()
		.then(token =>
			(!token && Promise.reject()) ||
			signInSocialUser(firebase.auth.FacebookAuthProvider.credential(token.accessToken)));

export const credentialsSetup = () =>
	dispatch => {
		dispatch(reduxNav('Login'));
		dispatch({ type: LOAD_STARTED, payload: locali('app_load.logging_in') });
		configureGoogleSignIn();

		const signInPromise = silentlySignInMailUser()
			.catch(silentlySignInGoogleUser)
			.catch(silentlySignInFacebookUser)
			.catch(() => dispatch({ type: LOAD_ENDED }));
		
		signInPromise
			.then(user => dispatch(loginUserSuccess(user)));
	};

const fetchApplicationData = dispatch =>
	Promise.all([
	dispatch(fetchFriendlyLeagues()),
	dispatch(fetchMainLeagues()),
	dispatch(fetchMatches()),
	dispatch(fetchLeaguesAvatars()),
	dispatch(fetchUsers()),
]);

const loginUserSuccess = user =>
	dispatch => {
		updateUserInDB(user)
			.then(() => {
				dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
				dispatch({ type: LOAD_STARTED, payload: locali('app_load.loading_data') });
				fetchApplicationData(dispatch)
					.then(() => dispatch(reduxNav('DrawerStack')))
					.finally(() => dispatch({ type: LOAD_ENDED }));
			})
			.catch(() => dispatch({ type: LOAD_ENDED }));
	};

export const loginFacebookUser = () =>
	dispatch => {
		LoginManager.logInWithReadPermissions(['public_profile', 'email'])
			.then(result => (result.isCancelled && Promise.reject()) ||
							AccessToken.getCurrentAccessToken())
			.then(token =>
				signInSocialUser(firebase.auth.FacebookAuthProvider.credential(token.accessToken)))
			.then(user => dispatch(loginUserSuccess(user)));
	};

export const loginGoogleUser = () =>
	dispatch => {
		GoogleSignin.hasPlayServices()
			.then(() =>
				GoogleSignin.signIn()
					.then(user =>
						signInSocialUser(firebase.auth.GoogleAuthProvider.credential(user.idToken))))
			.then(user => dispatch(loginUserSuccess(user)));
	};

export const logout = () => {
	return dispatch => {
		Promise.all([GoogleSignin.signOut(), LoginManager.logOut(), firebase.auth().signOut()])
			.then(() => {
				dispatch(reduxNav('LoginStack'));
				dispatch({
					type: LOGOUT
				});
			});
	};
};

const loginUserFail = (dispatch, error) => {
	dispatch({ type: LOGIN_USER_FAIL, payload: error });
};
