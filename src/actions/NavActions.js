import { NavigationActions } from 'react-navigation';

export const reduxNav = (routeName, params) =>
    dispatch => dispatch(NavigationActions.navigate({ routeName, params }));

export const reduxNavPop = () =>
    dispatch => dispatch(NavigationActions.back());

export const reduxNavSetParams = (key, params) =>
    dispatch => dispatch(NavigationActions.setParams({ params, key }));
