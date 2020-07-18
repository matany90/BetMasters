import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { RkTextInput, RkButton } from 'react-native-ui-kitten';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { AppComponent } from './common';
import { friendlyLeagueNameChanged, createNewFriendlyLeague } from '../actions';
import { locali } from '../../locales/i18n';
import { BACKGROUND_COLOR, SECONDARY_COLOR } from '../constants';

class NewFriendlyLeague extends Component {

  onNewFriendlyLeagueButtonPress() {
    const { friendlyLeagueName, navigation } = this.props;

    this.props.createNewFriendlyLeague(friendlyLeagueName, navigation);
  }


  render() {
    return (
      <View style={styles.container}>
        <AppComponent>
          <RkTextInput
            label={<FontAwesomeIcon style={styles.textInputIcon} name='trophy' />}
            placeholder={locali('friendly_leagues.new_friendly_leagues.name_placeholder')}
            onChangeText={leagueName => this.props.friendlyLeagueNameChanged(leagueName)}
            value={this.props.friendlyLeagueName}
          />
          <RkButton
            style={this.props.friendlyLeagueName === '' ? styles.buttonDisabled : styles.button}
            disabled={this.props.friendlyLeagueName === ''}
            onPress={this.onNewFriendlyLeagueButtonPress.bind(this)}
          >
            {locali('friendly_leagues.new_friendly_leagues.button_create')}
          </RkButton>
        </AppComponent>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: SECONDARY_COLOR
  },
  buttonDisabled: {
    alignSelf: 'center',
    backgroundColor: '#B7BABC'
  },
  drawerItemIcon: {
    fontSize: 25,
    color: '#000'
  },
  textInputIcon: {
    fontSize: 20,
    color: SECONDARY_COLOR,
    marginLeft: 15
  }
});

const mapStateToProps = state => {
  const {
    friendlyLeagueName
  } = state.friendlyLeagues;

  return {
    friendlyLeagueName
  };
};

export default connect(mapStateToProps, {
  friendlyLeagueNameChanged,
  createNewFriendlyLeague
})(NewFriendlyLeague);
