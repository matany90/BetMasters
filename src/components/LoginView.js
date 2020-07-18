import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    ImageBackground,
    StatusBar,
} from 'react-native';
import { RkButton, RkTheme } from 'react-native-ui-kitten';
import FontAwsomeIcon from 'react-native-vector-icons/FontAwesome';
import ZocialIcon from 'react-native-vector-icons/Zocial';
import { locali } from '../../locales/i18n';
import { PRIMARY_COLOR } from '../constants';
import LoadingSpinner from './LoadingSpinner';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    backgroundImage: {
        width: '100%', height: '100%'
    },
    secondContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

RkTheme.setType('RkButton', 'facebookLogin', {
    container: {
        backgroundColor: '#3b5998',
        marginBottom: 10
    },
    content: {
        flex: 1
    }
});

RkTheme.setType('RkButton', 'googleLogin', {
    container: {
        backgroundColor: '#df4a32',
        marginBottom: 10
    },
    content: {
        flex: 1,
        color: 'white'
    }
});

RkTheme.setType('RkButton', 'emailLogin', {
    container: {
        marginBottom: 10
    },
    content: {
        flex: 1
    }
});

export default ({ loginFacebookUser, loginGoogleUser, loginMailUser }) =>
    (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={PRIMARY_COLOR}
                barStyle="light-content"
            />
            <ImageBackground
                source={require('../images/AppBG.jpg')}
                style={styles.backgroundImage}
            >

                <Image
                    source={require('../images/AppLogoNoBG.png')}
                    style={{
                        alignSelf: 'center',
                        width: 400,
                        height: 150,
                        resizeMode: 'contain'
                    }}
                />
                <LoadingSpinner />
                <View style={{ padding: 20 }}>
                    <RkButton
                        rkType="xlarge facebookLogin"
                        onPress={() => loginFacebookUser()}
                    >
                        <FontAwsomeIcon name="facebook" color="white" size={30} />
                        {locali('login.login_with_facebook_button_title')}
                    </RkButton>

                    <RkButton
                        rkType="xlarge googleLogin"
                        onPress={() => loginGoogleUser()}
                    >
                        <ZocialIcon name="googleplus" color="white" size={30} />
                        {locali('login.login_with_google_button_title')}
                    </RkButton>

                    <RkButton
                        rkType="xlarge primary emailLogin"
                        onPress={() => loginMailUser()}
                    >
                        <ZocialIcon name="email" color="white" size={30} />
                        {locali('login.login_with_email_button_title')}
                    </RkButton>
                </View>
            </ImageBackground>
        </View>);
