import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Badge } from './common/Badge';
import { fetchLeaguesInvitations } from '../actions';

class LeaguesInvitationBadge extends Component {
    componentDidMount() {
        this.props.fetchLeaguesInvitations();
    }

    render() {
        return (
            <Badge 
                iconName="ios-notifications" 
                badgeCount={this.props.badgeCount} 
                onPress={() => this.props.onPress()} 
            />
        );
    }
}


const mapStateToProps = ({ invitationsData }) => ({
      badgeCount: invitationsData.invitations.length
});

export default connect(mapStateToProps, { fetchLeaguesInvitations })(LeaguesInvitationBadge);
