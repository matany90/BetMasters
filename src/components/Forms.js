import React, { Component } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { fetchCurrentForms, openForm } from '../actions';
import FormThumbnail from './FormThumbnail';
import { BACKGROUND_COLOR } from '../constants';

class Forms extends Component {

  componentWillMount() {
    this.props.fetchCurrentForms();
  }

  render() {
    const league = this.props.screenProps.league;
    const selectedLeagueForms = this.props.currentForms.filter(form => form.leagueUid === league.uid);

    return (
      <View style={{ flex: 1, backgroundColor: BACKGROUND_COLOR }}>
        <FlatList
          data={selectedLeagueForms}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => this.props.openForm(this.props.navigation, item.uid)}
            >
              <FormThumbnail form={item} />
            </TouchableOpacity>
          )
          }
          keyExtractor={form => form.uid.toString()}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ forms }) => {
  const { currentForms } = forms;

  return { currentForms };
};

export default connect(mapStateToProps, { fetchCurrentForms, openForm })(Forms);
