import _ from 'lodash';
import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import moment from 'moment';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import { RkButton } from 'react-native-ui-kitten';
import { RTLCustomSlider } from './common';
import { submitForm } from '../actions';
import SingleFormView from './SingleFormView';
import { BACKGROUND_COLOR, SECONDARY_COLOR } from '../constants';

class ReviewForm extends Component {
    constructor(props) {
        super(props);
        this.state = { sliderValue: '0' };
    }

    render() {
        const league = this.props.screenProps.league;
        const userLeagueData = league.participants
            .find(participant => participant.uid === firebase.auth().currentUser.uid);

        let fullForm = {};
        if (this.props.form.bets.length > 0) {
        const totalOdd =
                this.props.form.bets.map(item => item.odd).reduce((prev, next) => prev * next);
        const coins = this.state.sliderValue;
        const totalCoins = totalOdd * this.state.sliderValue;
        const now = moment();
        const date = now.format('YYYY-MM-DD');
        const time = now.format('HH:mm');
            fullForm = {
                coins,
                date,
                time,
                totalOdd,
                totalCoins,
                won: -1,
                bets: this.props.form.bets
            };
        }
        return (
            
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <SingleFormView form={fullForm} />
                </View>
                <View style={styles.sliderContainer}>
                    <View style={styles.sliderSection}>
                        <RTLCustomSlider
                            minimumValue={0}
                            maximumValue={userLeagueData.coins}
                            step={5}
                            onValueChange={sliderValue => this.setState({ sliderValue })}
                            thumbImage={require('../images/Currency2Small.png')}
                            thumbStyle={{ width: 40, height: 40, borderWidth: 0 }}
                            thumbImageStyle={{ flex: 1, height: undefined, width: undefined }}
                            minimumTrackTintColor='#13a9d6'
                            thumbTintColor='#0c6692'
                        />
                    </View>
                    <View style={styles.sliderLabel}>
                        <TextInput
                            style={styles.sliderLabelText}
                            value={`${this.state.sliderValue}`}
                        />
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <RkButton
                        rkType='xlarge'
                        onPress={() => this.props.submitForm(
                            this.props.newForm,
                            `${this.state.sliderValue}`,
                            league,
                            this.props.navigation)}
                            disabled={!this.state.sliderValue > 0}
                            style={!this.state.sliderValue > 0 ? styles.buttonDisabled : styles.button}
                    >
                        שלח טופס
                    </RkButton>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
        padding: 20
    },
    formContainer: {
        flex: 5,
    },
    sliderContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',

    },
    sliderLabel: {
        justifyContent: 'center',
        flex: 1
    },
    sliderSection: {
        flex: 6
    },
    sliderLabelText: {
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: 16,
        color: 'red'
    },
    button: {
        backgroundColor: SECONDARY_COLOR
    },
    buttonDisabled: {
        backgroundColor: '#B7BABC'
      }
});

const fetchMatch = (matchUid, matches) => {
    const allMatches = _.flatMap(matches.matchesLeagues, league => league.matches);

    return allMatches.find(match => match.uid === matchUid);
};

const mapStateToProps = ({ forms, matches }) => {
    const { newForm } = forms;
   
    const form = [];

    form.bets = newForm.map(bet => ({
        ...bet,
        match: fetchMatch(bet.matchUid, matches)
    }));

    return {
        form, newForm, forms
    };
};

export default connect(mapStateToProps, { submitForm })(ReviewForm);
