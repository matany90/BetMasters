import {
    createStackNavigator
} from 'react-navigation';

//import friendlyLeagues screens
import FriendlyLeagues from '../FriendlyLeagues';
import NewFriendlyLeague from '../NewFriendlyLeague';
import FriendlyLeagueTab from './FriendlyLeagueTab';
import FriendlyLeagueSettings from '../FriendlyLeagueSettings';

import { locali } from '../../../locales/i18n';

const FriendlyLeaguesStack = createStackNavigator({
    FriendlyLeagues: {
        screen: FriendlyLeagues,
        navigationOptions: {
            title: locali('navigation.titles.friendly_leagues.main')
        }
    },
    NewFriendlyLeague: {
        screen: NewFriendlyLeague,
        navigationOptions: {
            title: locali('navigation.titles.friendly_leagues.new_friendly_league')
        }
    },
    FriendlyLeagueTab: { 
        screen: FriendlyLeagueTab,
     },
    FriendlyLeagueSettings: { screen: FriendlyLeagueSettings }
}, {
        // Default config for all screens
        initialRouteName: 'FriendlyLeagues',
        headerMode: 'none'
    }
);

export default FriendlyLeaguesStack;
