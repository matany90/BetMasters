import { 
    FETCH_MATCHES,
    SELECTED_COUNTRY,
    SELECTED_LEAGUE,
    UPDATE_MATCHES_AFTER_PICKER,
    CLEAN_PICKERS
 } from '../actions/types.js';

const INITIAL_STATE = {
    matchesLeagues: [],
    pickerMatches: [],
    pickerSelectedCountry: '', 
    pickerSelectedLeauge: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case FETCH_MATCHES:
        return { ...state, matchesLeagues: action.payload, pickerSelectedCountry: null, pickerSelectedLeauge: null };
    case SELECTED_COUNTRY:
      return { ...state, pickerSelectedCountry: action.payload, pickerSelectedLeauge: '' };  
    case SELECTED_LEAGUE:
        return { ...state, pickerSelectedLeauge: action.payload };
        case UPDATE_MATCHES_AFTER_PICKER:
        return { ...state, pickerMatches: action.payload };
        case CLEAN_PICKERS:
        return { ...state, pickerSelectedCountry: null, pickerSelectedLeauge: null };
    default:
        return state;    
}
};
