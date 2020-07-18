import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FormThumbnail from './FormThumbnail';
import { BACKGROUND_COLOR } from '../constants';

class Account extends Component {
  static navigationOptions = {
    drawerLabel: 'My Account',
    drawerIcon: () => (
      <FontAwesomeIcon style={styles.drawerItemIcon} name='user' />
    )
  }

  render() {
    const selectedAccountData = this.props.selectedAccountData;
    let formsWon = 0;
    let formsLost = 0;
    let formsPending = 0;
    if (selectedAccountData.length > 0) {
    formsWon = selectedAccountData.forms.reduce((accumulator, form) => {
      if (form.won === 1) return accumulator++;
    });
    formsLost = selectedAccountData.forms.reduce((accumulator, form) => {
      if (form.won === 0) return accumulator++;
    });
    formsPending = selectedAccountData.forms.reduce((accumulator, form) => {
      if (form.won === -1) return accumulator++;
    });
  }
    console.log(`selectedAccountData ${selectedAccountData}`);
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.headerContainer}
          source={require('../images/SoccerFieldDarker.jpg')}
          resizeMode='cover'
        >
          <View style={styles.headerSection}>
            <Image
              style={styles.accountAvatar}
              source={require('../images/DefaultThumbnail.png')}
            />
          </View>
          <View style={[styles.headerSection, { height: 20 }]}>
            <Text style={styles.titleText}>{selectedAccountData.displayName}</Text>
          </View>
          <View style={[styles.headerSection, { height: 70 }]}>
            <Text style={styles.titleText}>{`טפסים נכונים: ${formsWon} | טפסים שגויים: ${formsLost} | טפסים בתהליך: ${formsPending}`}</Text>
          </View>
        </ImageBackground>
        <View style={styles.formThumbnailsContainer}>
          <Text style={styles.formsTitleText}>טפסים קודמים</Text>
          <FlatList
            data={selectedAccountData.forms}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: 'center',
  },
  headerContainer: {
    width: '100%',
    height: 250
  },
  headerSection: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  accountAvatar: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    borderWidth: 4,
    borderColor: '#fff'
  },
  titleText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff'
  },
  formThumbnailsContainer: {
    flex: 1,
    width: '100%'
  },
  formsTitleText: {
    fontSize: 26,
    textAlign: 'center'
  },
  drawerItemIcon: {
    fontSize: 25
  }
});

const mapStateToProps = state => {
  const { selectedAccountData } = state.helpers;

  return { selectedAccountData };
};

export default connect(mapStateToProps)(Account);
