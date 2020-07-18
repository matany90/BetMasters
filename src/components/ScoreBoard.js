import React, { Component } from 'react';
import { View, Image, ImageBackground } from 'react-native';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import PhotoUpload from 'react-native-photo-upload';
import { LeaderboardContainer, Header } from './common';
import { BACKGROUND_COLOR } from '../constants';
import { uploadLeagueAvatar } from '../actions';

const defaultPhoto = '../images/DefaultThumbnail.png';
class ScoreBoard extends Component {
  render() {
    const league = this.props.screenProps.league;
    const participants = league.participants
      .map(participant => 
        ({ ...participant,
           ...this.props.users.find(user => user.uid === participant.uid) }));

    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../images/CoverFriendlyLeague.jpg')}
          style={{ width: '100%' }}
        >

          <View style={styles.headerContainer}>
            <MaterialIconsIcon
              name='settings' color="#000" size={30}
              onPress={() =>
                this.props.navigation.navigate('FriendlyLeagueSettings', {
                  leagueName: league.friendlyLeagueName,
                  leagueUid: league.uid
                })}
            />
            <View style={styles.headerSection}>
              <View style={styles.headerThumbnailContainer}>
                <PhotoUpload
                  onPhotoSelect={avatar => {
                    if (avatar) {
                      this.props.uploadLeagueAvatar(avatar, league.uid);
                    }
                  }}
                  format='PNG'
                >
                  <Image
                    style={styles.headerThumbnail}
                    source={league.leaguePhoto !== defaultPhoto ? 
                    { uri: (league.leaguePhoto) } :
                    require(defaultPhoto)}
                    resizeMode='cover'
                  />
                </PhotoUpload>
              </View>
            </View>
          </View>
        </ImageBackground>
        <Header style={{ marginTop: 60 }}>טבלת הליגה</Header>
        <LeaderboardContainer
          data={participants}
          sortBy='coins'
          labelBy='displayName'
          labelStyle={{ justifyContent: 'flex-start', textAlign: 'left', paddingRight: 10 }}
          icon='photoURL'
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,

  },
  headerContainer: {
    paddingVertical: 15,
    alignItems: 'center',
    height: 170,
  },
  headerText: {
    fontSize: 26,
    textAlign: 'center',
    color: '#fff',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  headerSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top: 120,
    position: 'absolute',
  },
  headerRank: {
    flex: 1,
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  headerThumbnailContainer: {
    flex: 1,
    alignItems: 'center'

  },
  headerThumbnail: {
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
    borderWidth: 5,
    borderColor: '#FFF'
  },
  headerCoinsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerCoinsText: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
    marginRight: 5,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    fontWeight: 'bold',
  }
};

const mapStateToProps = ({ usersData }) => ({ users: usersData.users });

export default connect(mapStateToProps, { uploadLeagueAvatar })(ScoreBoard);
