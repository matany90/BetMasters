import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginView from './LoginView';
import { loginFacebookUser, loginGoogleUser, reduxNav } from '../actions';

class Login extends Component {
    render() {
        return (
        <LoginView
            loginFacebookUser={this.props.loginFacebookUser}
            loginGoogleUser={this.props.loginGoogleUser}
            loginMailUser={() => this.props.reduxNav('LoginWithEmail')}
        />);
    }
}

export default connect(null, { loginFacebookUser, loginGoogleUser, reduxNav })(Login);
