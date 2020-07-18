import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { fetchLeaguesInvitations, acceptInvitation, declineInvitation } from '../actions';
import InvitationsList from './InvitationsList';
import { BACKGROUND_COLOR } from '../constants';

class LeagueInvitations extends Component {
    componentDidMount() {
        this.props.fetchLeaguesInvitations();
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: BACKGROUND_COLOR }}>
            <InvitationsList 
                invitations={this.props.invitations} 
                onPressAccept={this.props.acceptInvitation} 
                onPressDecline={this.props.declineInvitation} 
            />
            </View>
            );
    }
}

const mapStateToProps = ({ invitationsData }) => ({
    invitations: invitationsData.invitations
});

export default connect(mapStateToProps, 
    { fetchLeaguesInvitations, acceptInvitation, declineInvitation })(LeagueInvitations);
