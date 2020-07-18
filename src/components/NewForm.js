import _ from 'lodash';
import React, { Component } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import moment from 'moment';
import { Picker } from 'native-base';
import SearchBar from 'react-native-searchbar';
import { Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { RkButton } from 'react-native-ui-kitten';
import { selectedPickerCountry, selectedPickerLeauge, reduxNav, handleSearch, cleanSearch, cleanPickers } from '../actions';
import MatchContainer from './MatchContainer';
import { Spinner } from './common';
import { locali } from '../../locales/i18n';
import { BACKGROUND_COLOR, SECONDARY_COLOR } from '../constants';

class NewForm extends Component {
  static navigationOptions = {
    header: null,
  };
  componentWillMount() {
    this.props.cleanSearch();
  }

  onValueChangeCountry(value) {
    const { allMatches } = this.props;
    this.props.cleanSearch();
    this.props.selectedPickerCountry(value, allMatches);
  }
  onValueChangeLeauge(value) {
    const { allMatches, pickerSelectedCountry } = this.props;
    this.props.selectedPickerLeauge(value, allMatches, pickerSelectedCountry);
  }

  pickerItemLeague() {
    const { pickerSelectedCountry } = this.props;
    if (pickerSelectedCountry === 'England') {
      return <Picker.Item label={locali('countries.england.leagues.championship')} value="Championship" />;
    }
    return <Picker.Item label={locali('countries.france.leagues.ligue2')} value="Ligue 2" />;
  }


  handleCountryPicker() {
    return (
      <Picker
        mode="dropdown"
        style={{ width: undefined }}
        placeholder='Select a country...'
        itemTextStyle={{ fontSize: 18, color: 'white' }}
        selectedValue={this.props.pickerSelectedCountry}
        onValueChange={this.onValueChangeCountry.bind(this)}
      >
        <Picker.Item label={locali('countries.countryPicker')} value='countryPlaceholder' />
        <Picker.Item label={locali('countries.england.countryName')} value="England" />
        <Picker.Item label={locali('countries.france.countryName')} value="France" />
      </Picker>
    );
  }

  handleLeaguePicker() {
    const { pickerSelectedCountry, pickerSelectedLeauge } = this.props;
    return (
      <Picker
        mode="dropdown"
        style={{ width: undefined }}
        placeholder="Select a leauge..."
        enabled={(!pickerSelectedCountry || pickerSelectedCountry === 'countryPlaceholder') ? false : true}
        selectedValue={pickerSelectedLeauge}
        onValueChange={this.onValueChangeLeauge.bind(this)}
      >
        <Picker.Item label={locali('countries.leaguePicker')} value="leaugePlaceholder" />
        {this.pickerItemLeague()}
      </Picker>
    );
  }

  handlePickers() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          {this.handleCountryPicker()}
          {this.handleLeaguePicker()}
          <View style={{ marginRight: 3, marginEnd: 5 }}>
            <Avatar
              medium
              rounded
              overlayContainerStyle={{ backgroundColor: '#C1E15E' }}
              icon={{ name: 'search', type: 'font-awesome' }}
              onPress={() => {
                this.props.cleanSearch();
                this.props.cleanPickers();
                this.searchBar.show();
              }}
              activeOpacity={0.7}
            />
          </View>
        </View>
      </View>
    );
  }

  render() {
    //console.log(`this.props.matchesLeaguesFiltered ${this.props.matchesLeaguesFiltered}`);
    const { pickerMatches, dataToShowTeams, textToSearch, pickerSelectedLeauge, pickerSelectedCountry } = this.props;
    if (this.props.allMatches.length > 0) {
      const formFilled = this.props.newForm.length > 0;
      return (
        <View style={{ flex: 1, backgroundColor: BACKGROUND_COLOR }}>
          {this.handlePickers()}
          <SearchBar
            ref={(ref) => this.searchBar = ref}
            /* onBack={() => this.props.cleanPickers()} */
            handleChangeText={text => {
              this.props.handleSearch(text, this.props.allMatches, 'teamNames');
            }}
          />
          <View style={styles.container}>
            <View style={styles.MatchesContainer}>
              <FlatList
                data={
                  textToSearch ? dataToShowTeams :
                    !pickerSelectedCountry || pickerSelectedCountry === 'countryPlaceholder' ?
                      this.props.allMatches :
                      pickerSelectedCountry && pickerSelectedCountry !== 'countryPlaceholder' ?
                        pickerMatches : null
                }
                renderItem={({ item }) => {
                  return <MatchContainer match={item} />;
                }
                }
                keyExtractor={match => match.uid}
              />
            </View>
            <View style={styles.ButtonContainer}>
              <RkButton
                rkType='xlarge'
                onPress={() => this.props.reduxNav('ReviewForm')}
                disabled={!formFilled}
                style={!formFilled ? styles.buttonDisabled : styles.button}
              >
                {locali('forms.matches.review_form_button')}
              </RkButton>
            </View>
          </View>
        </View>
      );
    } return (
      <View style={{ height: 500 }}>
        <Spinner size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 9,
    backgroundColor: BACKGROUND_COLOR,
    paddingVertical: 2
  },
  MatchesContainer: {
    flex: 12,
    marginBottom: 10
  },
  ButtonContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: SECONDARY_COLOR
  },
  buttonDisabled: {
    backgroundColor: '#B7BABC'
  }
});


const mapStateToProps = state => {
  const { newForm } = state.forms;
  const { matchesLeagues, pickerSelectedCountry, pickerMatches, pickerSelectedLeauge } = state.matches;
  const { textToSearch, dataToShowTeams } = state.search;

  //match.date > moment().format('YYYY-MM-DD')
  //const matchesLeaguesFiltered = matchesLeagues.map();
  let allMatches = _.flatMap(matchesLeagues, league => league.matches);
  allMatches = _.orderBy(allMatches, match => match.countryName, 'asc');
  allMatches = _.filter(allMatches, match => {
    return moment(match.date + ' ' + match.time).format('X') > moment().add({ minutes: 30 }).format('X')
      && moment(match.date + ' ' + match.time).format('X') < moment().add({ week: 2 }).format('X');
  });

  return { allMatches, matchesLeagues, newForm, pickerSelectedCountry, pickerMatches, pickerSelectedLeauge, textToSearch, dataToShowTeams };
};

export default connect(mapStateToProps, { cleanPickers, cleanSearch, handleSearch, reduxNav, selectedPickerCountry, selectedPickerLeauge })(NewForm);
