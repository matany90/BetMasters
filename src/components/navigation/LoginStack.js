import { createStackNavigator } from 'react-navigation';

import { locali } from '../../../locales/i18n';
import Intro from '../Intro';
import Login from '../Login';
import LoginWithEmail from '../LoginWithEmail';
import SignUpWithEmail from '../SignUpWithEmail';
import ForgotPassword from '../ForgotPassword';

import { PRIMARY_COLOR } from '../../constants';

const LoginStack = createStackNavigator({
    Intro: { screen: Intro },
    Login: { screen: Login,
        navigationOptions: {
            header: null
        }
    },
    LoginWithEmail: {
        screen: LoginWithEmail,
        navigationOptions: { title: locali('navigation.titles.login_with_email') }
    },
    ForgotPassword: {
        screen: ForgotPassword,
        navigationOptions: { title: locali('navigation.titles.forgot_password') }
    },
    SignUpWithEmail: {
        screen: SignUpWithEmail,
        navigationOptions: { title: locali('navigation.titles.sign_up_with_email') }
    }
}, {
        initialRouteName: 'Intro',
        headerMode: 'float',
        navigationOptions: {
            headerStyle: { backgroundColor: PRIMARY_COLOR },
            headerTintColor: 'black'
        }
    });

export default LoginStack;
