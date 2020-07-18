import { 
    MATCHES_LIST_FETCH,
    NEW_FORM_UPDATE_PUSH,
    NEW_FORM_UPDATE_SLICE,
    NEW_FORM_UPDATE_CHANGE_BET,
    SUBMIT_FORM_SUCCESS,
    FETCH_CURRENT_FORMS,
    OPEN_FORM,
    SUBMIT_FORM
 } from '../actions/types.js';


const INITIAL_STATE = {
    matchesList: [],
    newForm: [],
    currentForms: [],
    selectedFormId: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MATCHES_LIST_FETCH: {
            return { ...state, matchesList: action.payload };
        }

        case NEW_FORM_UPDATE_PUSH: {
            return { ...state, newForm: [...state.newForm, action.payload] };
        }

        case NEW_FORM_UPDATE_SLICE: {
            return { ...state,
                newForm: [
                    ...state.newForm.slice(0, action.payload),
                    ...state.newForm.slice(action.payload + 1)
                ] };
        }

        case NEW_FORM_UPDATE_CHANGE_BET: {
            return { ...state,
                newForm: state.newForm.map(
                (content, i) =>
                    (i === action.payload.isExistsWithDifferentBet ?
                    { ...content, bet: action.payload.bet, odd: action.payload.odd }
                : content)
            ) };
        }

        case SUBMIT_FORM: {
            return { ...state };
        }

        case SUBMIT_FORM_SUCCESS: {
            return { ...state, newForm: [] };
        }
        
        case FETCH_CURRENT_FORMS: {
            return { ...state, currentForms: action.payload || [] };
        }
        case OPEN_FORM: 
        return { ...state, selectedFormId: action.payload };
        
        default: {
            return state;
        }

    }
};
