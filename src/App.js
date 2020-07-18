import React, { Component } from 'react';
import { Platform, BackHandler } from 'react-native';
import { NavigationActions } from 'react-navigation';
import firebase from 'react-native-firebase';
import { Provider, } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from './reducers';
import { AppNavigator, middleware } from './components/navigation/AppNavigation';

firebase.initializeApp({
    apiKey: 'AIzaSyCcakTGid7qSMtgUi91_T0yFjlXAzAAAVI',
    authDomain: 'bet-masters.firebaseapp.com',
    databaseURL: 'https://bet-masters.firebaseio.com',
    projectId: 'bet-masters',
    storageBucket: 'gs://bet-masters.appspot.com',
    messagingSenderId: '951196383769'
});

const store = createStore(reducers, applyMiddleware(ReduxThunk, middleware, logger));

export default class App extends Component {

    componentDidMount() {
        this.handleNotifications();
        this.handleAndroidBackButton();
    }

    componentWillUnmount() {
        this.notificationDisplayedListener();
        this.notificationListener();
    }

    onBackButton() {
            store.dispatch(NavigationActions.back());
            return true;  // will not exit, just go back
    }

    handleAndroidBackButton() {
        if (Platform.OS !== 'android') return;

        BackHandler.addEventListener('hardwareBackPress', this.onBackButton);
    }


    handleNotifications() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                const enabled = firebase.messaging().hasPermission();
                if (enabled) {
                    console.log('has permissions');

                    this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
                        // Process your notification as required
                        // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
                        console.log('displayed', notification);
                    });
                    this.notificationListener = firebase.notifications().onNotification((notification) => {
                        // Process your notification as required
                        //I think this is called when receiving an notification while app is opened
                        console.log('received', notification);
                    });
                } else {
                    firebase.messaging().requestPermission()
                        .then((result) => {
                            console.log('accepted permisions + ', result);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            }
        });
    }

    render() {
        return (
            <Provider store={store}>
                <AppNavigator />
            </Provider>
        );
    }
}
