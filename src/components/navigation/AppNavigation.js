import { connect } from 'react-redux';
import { createSwitchNavigator } from 'react-navigation';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

import { Animated, Easing } from 'react-native';

import LoginStack from './LoginStack';
import Drawer from './DrawerStack';

export const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
);

// https://github.com/react-community/react-navigation/issues/1254
const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
});

export const RootNavigator = createSwitchNavigator({
  LoginStack: { screen: LoginStack },
  DrawerStack: { screen: Drawer }
}, {
    headerMode: 'none',
    initialRouteName: 'LoginStack',
    transitionConfig: noTransitionConfig
  });

  const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');

  const mapStateToProps = state => ({
    state: state.nav,
});

export const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

