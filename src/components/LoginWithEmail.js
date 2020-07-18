import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { RkTextInput, RkButton } from 'react-native-ui-kitten';
import ZocialIcon from 'react-native-vector-icons/Zocial';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { Card, CardSection, Spinner, AppComponent } from './common';
import { emailChanged, passwordChanged, loginUser, signUpButton, forgotPassword } from '../actions';
import { locali } from '../../locales/i18n';
import { SECONDARY_COLOR, BACKGROUND_COLOR } from '../constants';

class LoginWithEmail extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title')
    };
  };

  onLoginButtonPress() {
    const { email, password, navigation } = this.props;

    this.props.loginUser({ email, password, navigation });
  }

  onSignupButtonPress() {
    const { email, navigation } = this.props;

    this.props.signUpButton({ email, navigation });
  }

  onForgotPasswordButtonPress() {
    const { email, navigation } = this.props;

    this.props.forgotPassword({ email, navigation });
  }

  //TODO: Delete after developing app - this is a shortcut to logging in to user EtayRock.
  loginToEtayRock() {
    const email = 'test@test.com';
    const password = '123456';
    const { navigation } = this.props;

    this.props.loginUser({ email, password, navigation });
  }

  renderButtons() {
    return (
      <View style={{ height: 120 }}>
        <View style={styles.buttonsContainer}>
          <View style={styles.LoginButtonContainer}>
            <RkButton
              style={{ justifyContent: 'center', backgroundColor: SECONDARY_COLOR }}
              onPress={this.onLoginButtonPress.bind(this)}
            >
              {locali('login_with_email.form.button_login')}
            </RkButton>
          </View>
          <View style={styles.SignUpButtonContainer}>
            <RkButton
              style={{ justifyContent: 'center', backgroundColor: SECONDARY_COLOR }}
              onPress={this.onSignupButtonPress.bind(this)}
            >
              {locali('login_with_email.form.button_signup')}
            </RkButton>
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <RkButton
            onPress={this.onForgotPasswordButtonPress.bind(this)}
            style={{ justifyContent: 'center', backgroundColor: SECONDARY_COLOR }}
          >
            {locali('login_with_email.form.button_forgot_password')}
          </RkButton>
        </View>
        <Text
          onPress={this.loginToEtayRock.bind(this)}
        >
          Login to EtayRock
            </Text>
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
            placeholder={locali('login_with_email.form.text_field_email_placeholder')}
            onChangeText={email => this.props.emailChanged(email)}
            value={this.props.email}
          />
          <RkTextInput
            secureTextEntry
            label={<EntypoIcon style={styles.textInputIcon} name='lock' />}
            placeholder={locali('login_with_email.form.text_field_password_placeholder')}
            onChangeText={password => this.props.passwordChanged(password)}
            value={this.props.password}
          />
          {this.renderError()}

          <CardSection>
            {this.renderButtons()}
          </CardSection>
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
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  errorTextStyle: {
    fontSize: 20,
    textAlign: 'center',
    color: 'red'
  },
  LoginButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  SignUpButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }
};

const mapStateToProps = state => {
  const {
    email,
    password,
    user,
    error
  } = state.auth;

  return {
    email,
    password,
    user,
    error
  };
};

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  loginUser,
  signUpButton,
  forgotPassword
})(LoginWithEmail);
