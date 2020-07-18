import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { RkTextInput, RkButton } from 'react-native-ui-kitten';
import { connect } from 'react-redux';
import ZocialIcon from 'react-native-vector-icons/Zocial';
import { CardSection, Spinner, AppComponent } from './common';
import { locali } from '../../locales/i18n';
import { passwordRecovery } from '../actions';
import { BACKGROUND_COLOR } from '../constants';

class ForgotPassword extends Component {

    onPasswordRecoveryButtonPress() {
        const { email, navigation } = this.props;

        this.props.passwordRecovery({ email, navigation });
    }

    renderButtons() {
        return (
            <View style={{ height: 60, justifyContent: 'center' }}>
                <RkButton
                    style={{ justifyContent: 'center', alignSelf: 'center' }}
                    onPress={this.onPasswordRecoveryButtonPress.bind(this)}
                >
                    {locali('login_with_email.forgot_password.button_forgot_password')}
                </RkButton>
            </View>
        );
    }
    renderError() {
        if (this.props.error) {
            return (
                <CardSection>
                    <View>
                        <Text style={styles.errorTextStyle}>
                            {this.props.error}
                        </Text>
                    </View>
                </CardSection>
            );
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <AppComponent>
                    <RkTextInput
                        label={<ZocialIcon style={styles.textInputIcon} name='email' />}
                        placeholder={
                            locali('login_with_email.forgot_password.text_field_email_placeholder')
                        }
                        onChangeText={email => this.props.emailChanged(email)}
                        value={this.props.email}
                    />
                    {this.renderError()}

                    {this.renderButtons()}
                </AppComponent>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR
    },
    textInputIcon: {
        fontSize: 20,
        color: '#0000003a',
        marginLeft: 15
    },
    errorTextStyle: {
        fontSize: 20,
        textAlign: 'center',
        color: 'red'
    }
};

const mapStateToProps = state => {
    const { email, error } = state.auth;

    return { email, error };
};

export default connect(mapStateToProps, { passwordRecovery })(ForgotPassword);
