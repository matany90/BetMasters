import React, { Component } from 'react';
import { View, I18nManager } from 'react-native';
import _ from 'lodash';
import { RkTheme, RkTextInput, RkText, RkButton } from 'react-native-ui-kitten';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { Card } from './common';
import { locali } from '../../locales/i18n';
import { friendEmailChanged, inviteFriendToFriendlyLeague, deleteFriendlyLeague } from '../actions';

class FriendlyLeagueSettings extends Component {

      onInviteFriendButtonPress() {
        const { friendEmail, friendlyLeaguesListFetch, selectedFriendlyLeagueId, navigation } = this.props;
        const leagueUid = selectedFriendlyLeagueId;
        const friendlyLeagues = friendlyLeaguesListFetch;
        const { friendlyLeagueName, participants } = friendlyLeagues.find(league => league.uid === leagueUid);
        this.props
            .inviteFriendToFriendlyLeague(friendEmail, leagueUid, friendlyLeagueName, participants, navigation);
      }
      
    render() {
        RkTheme.setType('RkText', 'customHeader', {
            fontSize: 26,
            textAlign: 'center'
           });
    const leagueName = this.props.navigation.getParam('leagueName', '');
    const leagueUid = this.props.navigation.getParam('leagueUid', '');
        return (
            <View>
                <Card>
                    <RkText rkType='customHeader'>{locali('friendly_leagues.friendly_league.settings.invite_friend_header')}</RkText>
                    <RkTextInput
                        label={<FontAwesomeIcon style={styles.textInputIcon} name='user-plus' />}
                        placeholder={locali('friendly_leagues.friendly_league.settings.invite_text_input_placeholder')}
                        onChangeText={friendEmail => this.props.friendEmailChanged(friendEmail)}
                        value={this.props.friendEmail}
                    />
                    <View style={{ height: 60, justifyContent: 'center' }}>
                        <RkButton
                            style={{ justifyContent: 'center', alignSelf: 'center' }}
                            onPress={this.onInviteFriendButtonPress.bind(this)}  
                        >
                            {locali('friendly_leagues.friendly_league.settings.invite_button')}
                        </RkButton>
                    </View>
                </Card>
                <Card>
                    <RkText rkType='customHeader'>{locali('friendly_leagues.friendly_league.settings.delete_league_header') + leagueName}</RkText>
                    <View style={{ height: 60, justifyContent: 'center' }}>
                        <RkButton
                            style={{ justifyContent: 'center', alignSelf: 'center' }}
                            /* onPress={() => this.props.deleteFriendlyLeague(leagueUid)}  */ 
                        >
                            {locali('friendly_leagues.friendly_league.settings.delete_league_button')}
                        </RkButton>
                    </View>
                </Card>
            
            </View>
        );
    }
}

const styles = {
    textInputIcon: {
      fontSize: 20,
      color: '#0000003a',
      marginLeft: 15
    }
};

const mapStateToProps = ({ friendlyLeagues: { friendEmail, friendlyLeaguesListFetch, selectedFriendlyLeagueId } }) => 
    ({ friendEmail, friendlyLeaguesListFetch, selectedFriendlyLeagueId });

export default connect(mapStateToProps,
    { friendEmailChanged, inviteFriendToFriendlyLeague, deleteFriendlyLeague })(FriendlyLeagueSettings);
