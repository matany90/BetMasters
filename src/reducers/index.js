import { combineReducers } from 'redux';
import { createNavigationReducer } from 'react-navigation-redux-helpers';
import { RootNavigator } from '../components/navigation/AppNavigation';
import AuthReducer from './AuthReducer';
import FriendlyLeaguesReducer from './FriendlyLeaguesReducer';
import MainLeaguesReducer from './MainLeaguesReducer';
import LeaguesInvitationReducer from './LeaguesInvitationReducer';
import FormsReducer from './FormsReducer';
import MatchesReducer from './MatchesReducer';
import UsersReducer from './UsersReducer';
import SearchReducer from './SearchReducer';
import HelpersReducer from './HelpersReducer';

const navReducer = createNavigationReducer(RootNavigator);

export default combineReducers({
    nav: navReducer,
    auth: AuthReducer,
    friendlyLeagues: FriendlyLeaguesReducer,
    mainLeagues: MainLeaguesReducer,
    invitationsData: LeaguesInvitationReducer,
    forms: FormsReducer,
    matches: MatchesReducer,
    usersData: UsersReducer,
    search: SearchReducer,
    helpers: HelpersReducer
});
