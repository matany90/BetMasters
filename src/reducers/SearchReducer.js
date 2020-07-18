import {
    ON_TEXT_CHANGE,
    DATA_AFTER_SEARCH_FRIENDLY,
    CLEAN_SEARCH,
    DATA_AFTER_SEARCH_TEAM
} from '../actions/types.js';

const INITIAL_STATE = {
    textToSearch: '',
    dataToShowfriendlyLeague: [],
    dataToShowTeams: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ON_TEXT_CHANGE:
            return { ...state, textToSearch: action.payload };
        case DATA_AFTER_SEARCH_FRIENDLY:
            return { ...state, dataToShowfriendlyLeague: action.payload };
            case DATA_AFTER_SEARCH_TEAM:
            return { ...state, dataToShowTeams: action.payload };    
            case CLEAN_SEARCH:
            return { ...state, textToSearch: action.payload.text, dataToShowTeams: action.payload.data, dataToShowfriendlyLeague: action.payload.data };
        default:
            return state;
    }
};
