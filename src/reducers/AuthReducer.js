import { 
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    USERNAME_CHANGED,
    LOGGING_USER_IN,
    SIGN_UP_NAVIGATE,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    FORGOT_PASSWORD,
    PASSWORD_RECOVERY,
    LOGOUT,
    RE_PASSWORD_CHANGED,
    LOAD_STARTED,
    LOAD_ENDED,
 } from '../actions/types.js';

const INITIAL_STATE = {
	email: '',
    password: '',
    rePassword: '',
    username: '',
	user: null,
	error: '',
    appIsLoading: false,
    loadingMessage: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMAIL_CHANGED: {
            return { ...state, email: action.payload };
        }
        case PASSWORD_CHANGED: {
            return { ...state, password: action.payload };
        }
        case USERNAME_CHANGED: {
            return { ...state, username: action.payload };
        }
        case LOGGING_USER_IN: {
            return { ...state,
                error: '' 
            };
        }
        case LOGOUT: {
            return { ...INITIAL_STATE };
        }
        case SIGN_UP_NAVIGATE: {
            return { ...state, ...INITIAL_STATE, email: action.payload };
        }
        case LOGIN_USER_SUCCESS: {
            return { ...state, ...INITIAL_STATE, user: action.payload };
        }
        case LOGIN_USER_FAIL:
            return { ...state,
                error: action.payload,
                password: '',
                rePassword: '',
        };
        case RE_PASSWORD_CHANGED: {
            return { ...state, rePassword: action.payload };
        }
        case FORGOT_PASSWORD:
            return { ...state, ...INITIAL_STATE, email: action.payload };
        case PASSWORD_RECOVERY:
            return state; //TODO - send instructions to recover password on email
        case LOAD_STARTED: 
            return { ...state, appIsLoading: true, loadingMessage: action.payload };
        case LOAD_ENDED: 
            return { ...state, appIsLoading: false };
        default: {
            return state;
        }
    }
};
