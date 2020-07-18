import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Button } from './common/Button';
import { locali } from '../../locales/i18n';
import { AppComponent } from './common';

const styles = StyleSheet.create({
    invitationText: {
        fontSize: 15,
        textAlign: 'left'
    },
    itemContainer: {
        padding: 5
    }
});

export default ({ invitation, onPressAccept, onPressDecline }) =>
    (<AppComponent flexDirection="row" style={styles.itemContainer}>
        <View flex={3}>
            <Text style={styles.invitationText}> 
            {locali('friendly_leagues.league_invitations.invitationContent', {
                inviter: invitation.inviterEmail,
                leagueName: invitation.friendlyLeagueName
            })} 
            </Text>
        </View>
        <View flexDirection="row" flex={1}>
            <Button onPress={() => onPressAccept(invitation.uid, invitation.leagueUid)}>
                <FontAwesomeIcon name="check" />
            </Button>
            <Button onPress={() => onPressDecline(invitation.uid)}>
                <FontAwesomeIcon name="ban" />
            </Button>
        </View>
    </AppComponent>);

