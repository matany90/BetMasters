import {
    FRIENDLY_LEAGUE_NAME_CHANGED,
    FRIEND_EMAIL_CHANGED,
    NEW_FRIENDLY_LEAGUE_SUCCESS,
    INVITE_FRIEND_SUCCESS,
    FRIENDLY_LEAGUES_FETCH_SUCCESS,
    FETCH_CHAT,
    MESSAGE_CHANGED,
    SEND_MESSAGE,
    UPLOAD_FRIENDLY_LEAGUE_PHOTO,
    FETCH_FRIENDLY_LEAGUES_AVATARS_SUCCESS,
    INVITE_FRIEND_FAILED,
} from '../actions/types.js';

const INITIAL_STATE = {
    friendlyLeagueName: '',
    friendEmail: '',
    friendlyLeaguesListFetch: [],
    message: '',
    chat: [],
    isTyping: null,
    friendlyLeaguePhoto: null,
    friendlyLeaguesAvatars: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FRIENDLY_LEAGUE_NAME_CHANGED: {
            return { ...state, friendlyLeagueName: action.payload };
        }
        case FRIEND_EMAIL_CHANGED: {
            return { ...state, friendEmail: action.payload };
        }
        case NEW_FRIENDLY_LEAGUE_SUCCESS: {
            return { ...state, friendlyLeagueName: '' };
        }
        case INVITE_FRIEND_SUCCESS: {
            return { ...state, friendEmail: '' };
        }
        case INVITE_FRIEND_FAILED: {
            return { ...state };
        }
        case FRIENDLY_LEAGUES_FETCH_SUCCESS: {
            return { ...state, friendlyLeaguesListFetch: action.payload };
        }
        case FETCH_CHAT: {
            return { ...state, chat: action.payload || [] };
        }
        case MESSAGE_CHANGED: {
            return { ...state, message: action.payload };
        }
        case SEND_MESSAGE: {
            return { ...state, chat: action.payload };
            /* return { ...state, chat: [...action.payload, ...state.chat] }; */
        }
        case UPLOAD_FRIENDLY_LEAGUE_PHOTO: {
            return { ...state, friendlyLeaguePhoto: action.payload };
        }
        case FETCH_FRIENDLY_LEAGUES_AVATARS_SUCCESS: {
            return { ...state, friendlyLeaguesAvatars: action.payload };
        }
        default: {
            return state;
        }
    }
};

