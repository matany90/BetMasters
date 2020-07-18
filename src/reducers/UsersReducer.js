import { 
    USERS_LOADED
 } from '../actions/types.js';

const INITIAL_STATE = {
	users: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USERS_LOADED: {
            return { ...state, users: action.payload };
        }
        default: {
            return state;
        }
    }
};
