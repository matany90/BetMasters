import { 
    OPEN_ACCOUNT_SUCCESS
 } from '../actions/types.js';

const INITIAL_STATE = {
    selectedAccountData: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case OPEN_ACCOUNT_SUCCESS: {
            return { ...state, selectedAccountData: action.payload };
        }
        default: {
            return state;
        }
    }
};
