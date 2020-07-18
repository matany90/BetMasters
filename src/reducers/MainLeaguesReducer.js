import { 
    MAIN_LEAGUES_LOADED
 } from '../actions/types.js';

const INITIAL_STATE = {
	leagues: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MAIN_LEAGUES_LOADED: {
            return { ...state, leagues: action.payload };
        }
        default: {
            return state;
        }
    }
};
