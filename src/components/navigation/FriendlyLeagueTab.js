import React, { Component } from 'react';
import {
    createStackNavigator,
    createBottomTabNavigator
} from 'react-navigation';
import { connect } from 'react-redux';

import FontawesomeIcon from 'react-native-vector-icons/FontAwesome';

import { locali } from '../../../locales/i18n';

import Forms from '../Forms';
import SingleForm from '../SingleForm';
import NewForm from '../NewForm';
import ReviewForm from '../ReviewForm';
import ScoreBoard from '../ScoreBoard';
import Chat from '../Chat';

import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../constants';
import { closeFriendlyLeague } from '../../actions';

const FormsViewStack = createStackNavigator({
    Forms: { screen: Forms },
    Form: { screen: SingleForm }
}, {
    initialRouteName: 'Forms',
    navigationOptions: {
        header: null
    }
}
);

const FillFormStack = createStackNavigator({
    NewForm: {
        screen: NewForm
    },
    ReviewForm: { screen: ReviewForm }
}, {
        // Default config for all screens
        initialRouteName: 'NewForm',
        navigationOptions: {
            header: null
        }
    }
);

const FriendlyLeagueTabNavigator = createBottomTabNavigator({
    ScoreBoard: {
        screen: ScoreBoard,
        navigationOptions: {
            title: locali('navigation.titles.friendly_leagues.leaderboard')
        }
    },
    FormsViewStack: {
        screen: FormsViewStack,
        navigationOptions: {
            title: locali('navigation.titles.friendly_leagues.my_forms')
        } 
    },
    FillFormStack: {
        screen: FillFormStack,
        navigationOptions: {
            title: locali('navigation.titles.friendly_leagues.fill_form')
        }
    },
    Chat: {
        screen: Chat,
        navigationOptions: {
            title: locali('navigation.titles.friendly_leagues.chat')
        }
    }
}, {
        // Default config for all screens
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor, inactiveTintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'FormsViewStack') {
                    iconName = 'wpforms';
                } else if (routeName === 'FillFormStack') {
                    iconName = 'plus-circle';
                } else if (routeName === 'ScoreBoard') {
                    iconName = 'table';
                } else if (routeName === 'Chat') {
                    iconName = 'wechat';
                }
               
                return (
                    <FontawesomeIcon
                        name={iconName}
                        size={30}
                        color={focused ? tintColor : inactiveTintColor}
                    />
                );
            }
        }),

        // Default config for all screens
        initialRouteName: 'ScoreBoard',
        tabBarOptions: {
            activeTintColor: SECONDARY_COLOR,
            inactiveTintColor: '#000',
            labelStyle: {
                fontSize: 14,
                fontWeight: 'bold'
            },
            tabStyle: {
                backgroundColor: PRIMARY_COLOR
            },
            style: {
                height: 65
            }
        },
    }
);

class FriendlyLeagueTab extends Component {
    static router = FriendlyLeagueTabNavigator.router;
    
    componentWillUnmount() {
        this.props.closeFriendlyLeague();
    }

    render() {
      return (
        <FriendlyLeagueTabNavigator 
        navigation={this.props.navigation}
        screenProps={{ league: this.props.navigation.state.params.league }}
        />
      );
    }
}

export default connect(null, { closeFriendlyLeague })(FriendlyLeagueTab);
