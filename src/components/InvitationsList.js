import React from 'react';
import { FlatList, Text } from 'react-native';
import InvitationListItem from './InvitationListItem';
import { locali } from '../../locales/i18n';

export default ({ invitations, onPressAccept, onPressDecline }) =>
    (<FlatList
    data={invitations}
    keyExtractor={invitation => invitation.uid}
    renderItem={({ item }) => (
    <InvitationListItem 
    invitation={item} onPressAccept={onPressAccept} onPressDecline={onPressDecline} 
    />)} 
    ListEmptyComponent={<Text>{locali('friendly_leagues.league_invitations.no_invitations')}</Text>}
    />);
