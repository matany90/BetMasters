import { 
    LEAGUE_INVITATIONS_FETCH_SUCCESS
 } from '../actions/types.js';

const INITIAL_STATE = {
    invitations: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LEAGUE_INVITATIONS_FETCH_SUCCESS: {
            return { ...state, invitations: action.payload };
        }
        default: {
            return state;
        }
    }
};
