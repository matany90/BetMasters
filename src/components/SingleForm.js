import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import SingleFormView from './SingleFormView';

class SingleForm extends Component {
    render() {
        return (
            <SingleFormView form={this.props.form} />
        );
    }
}

const fetchMatch = (matchUid, matches) => {
    const allMatches = _.flatMap(matches.matchesLeagues, league => league.matches);
    
    return allMatches.find(match => match.uid === matchUid);
};

const mapStateToProps = ({ forms, matches }) => {
    const form = forms
                .currentForms.find(element => element.uid === forms.selectedFormId);

    form.bets = form.bets.map(bet => ({
        ...bet,
        match: fetchMatch(bet.matchUid, matches)
    }));

    return {
        form
    };
};

export default connect(mapStateToProps)(SingleForm);
