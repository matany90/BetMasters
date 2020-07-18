import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { RkTextInput, RkButton } from 'react-native-ui-kitten';
import ZocialIcon from 'react-native-vector-icons/Zocial';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { locali } from '../../locales/i18n';
import { emailChanged, userNameChanged, passwordChanged, signupUser, rePasswordChanged } from '../actions';
import { CardSection, Spinner, AppComponent } from './common';
import { SECONDARY_COLOR, BACKGROUND_COLOR } from '../constants';

class SignUpWithEmail extends Component {
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

  renderButtons() {
    const { rePassword, email, password, username, navigation, displayNames } = this.props;

    return (
      <View style={{ height: 60, justifyContent: 'center' }}>
        <RkButton
          style={rePassword === password && password !== '' ? styles.signupMatch : styles.signupDisable}
          onPress={() => {
            rePassword === password && password !== '' ?
            this.props.signupUser(email, username, password, navigation, displayNames)
            : console.log('error');
          }
        }
        >
          {locali('login_with_email.signup.button_sign_up')}
        </RkButton>
      </View>
    );
  }
  render() {
    const { rePassword, email, password, username } = this.props;
    return (
      <View style={styles.container}>
        <AppComponent>
          <RkTextInput
            label={<ZocialIcon style={styles.textInputIcon} name='email' />}
            placeholder={locali('login_with_email.form.text_field_email_placeholder')}
            onChangeText={text => this.props.emailChanged(text)}
            value={email}
          />
          <RkTextInput
            label={<ZocialIcon style={styles.textInputIcon} name='email' />}
            placeholder={locali('login_with_email.signup.text_field_username_placeholder')}
            onChangeText={text => this.props.userNameChanged(text)}
            value={username}
          />
          <RkTextInput
            secureTextEntry
            label={password !== rePassword || password === '' ?
              <EntypoIcon style={styles.textInputIcon} name='lock' />
              : <EntypoIcon style={styles.textInputIcon} name='check' />
            }
            placeholder={locali('login_with_email.form.text_field_password_placeholder')}
            onChangeText={text => this.props.passwordChanged(text)}
            value={password}
          />
          <RkTextInput
            secureTextEntry
            label={rePassword === '' ?
              <EntypoIcon style={styles.textInputIcon} name='lock' />
              : password !== rePassword ?
              <EntypoIcon style={styles.textInputIcon} name='cross' />
              : <EntypoIcon style={styles.textInputIcon} name='check' />
            }
            placeholder={locali('login_with_email.form.text_field_rePassword_placeholder')}
            onChangeText={text => this.props.rePasswordChanged(text)}
            value={rePassword}
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
    alignItems: 'center'
  },
  errorTextStyle: {
    fontSize: 20,
    textAlign: 'center',
    color: 'red'
  },
  LoginButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  SignUpButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  signupMatch: { 
    justifyContent: 'center', alignSelf: 'center', backgroundColor: SECONDARY_COLOR 
  },
  signupDisable: {
    justifyContent: 'center', alignSelf: 'center', backgroundColor: 'grey' 
  }
};

const mapStateToProps = state => {
  const { email, username, password, rePassword, error } = state.auth;
  const { displayNames } = state.friendlyLeagues;

  return { email, username, password, rePassword, error, displayNames };
};

export default connect(mapStateToProps,
  { signupUser, emailChanged, userNameChanged, passwordChanged, rePasswordChanged })(SignUpWithEmail);
