import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { RkButton } from 'react-native-ui-kitten';
import { updateNewForm } from '../actions';
import { locali } from '../../locales/i18n';
import { AppComponent } from './common';

import { SECONDARY_COLOR, COMPONENT_COLOR } from '../constants';

class MatchContainer extends Component {
    render() {
        const {
            hometeamName,
            awayteamName,
            date,
            time,
            hometeamOdd,
            awayteamOdd,
            drawOdd,
            uid
        } = this.props.match;
        let buttonSelected;
        if (this.props.newForm.length > 0) {
            if (this.props.newForm.find((element) => element.matchUid === uid)) {
                buttonSelected = this.props.newForm.find((element) =>
                    element.matchUid === uid).bet.toString();
            }
        }
        return (
            <AppComponent
                style={styles.container}
                renderToHardwareTextureAndroid
                shouldRasterizeIOS
            >
                <ImageBackground
                    source={require('../images/AppBG3.jpg')}
                    style={{ flex: 1, width: undefined, height: undefined }}
                    resizeMode='cover'
                >
                    <View style={styles.teamsContainer}>
                        <View style={styles.teamsSection}>
                            <View style={styles.teamLogoSection}>
                                <Image
                                    style={{ flex: 1, height: undefined, width: undefined }}
                                    source={require('../images/Real_Madrid.png')}
                                    resizeMode="contain"
                                />
                            </View>
                            <View style={styles.teamLabelSection}>
                                <Text style={styles.titleStyle}>
                                    {hometeamName}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.middleSection}>
                            <View style={styles.timeContainer}>
                                <Text style={[styles.titleStyle, { textAlign: 'center' }]}>
                                    {
                                        date + ' ' + time
                                        //timestamp
                                        /* new Date(timestamp * 1000).toLocaleString() */
                                    }
                                </Text>
                            </View>
                            <View style={styles.oddsContainer}>
                                <View style={styles.oddsSection}>

                                    <RkButton
                                        style={buttonSelected === '1' ? styles.oddButtonSelected : styles.oddButton}
                                        rkType='circle outline'
                                        onPress={() => this.props.updateNewForm(this.props.newForm, uid, '1', hometeamOdd)}
                                    >
                                        <Text style={styles.oddButtonLable}>{hometeamOdd.toFixed(2)}</Text>
                                    </RkButton>
                                </View>
                                <View style={[styles.oddsSection, { flex: 2 }]}>
                                    <RkButton
                                        style={buttonSelected === 'x' ? styles.oddButtonSelected : styles.oddButton}
                                        rkType='circle outline'
                                        onPress={() => this.props.updateNewForm(this.props.newForm, uid, 'x', drawOdd)}
                                    >
                                        <Text style={styles.oddButtonLable}>{drawOdd.toFixed(2)}</Text>
                                    </RkButton>
                                </View>
                                <View style={styles.oddsSection}>
                                    <RkButton
                                        style={buttonSelected === '2' ? styles.oddButtonSelected : styles.oddButton}
                                        rkType='circle outline'
                                        onPress={() => this.props.updateNewForm(this.props.newForm, uid, '2', awayteamOdd)}
                                    >
                                        <Text style={styles.oddButtonLable}>{awayteamOdd.toFixed(2)}</Text>
                                    </RkButton>
                                </View>
                            </View>
                        </View>
                        <View style={styles.teamsSection}>
                            <View style={styles.teamLogoSection}>
                                <Image
                                    style={{ flex: 1, height: undefined, width: undefined }}
                                    source={require('../images/Real_Madrid.png')}
                                    resizeMode="contain"
                                />
                            </View>
                            <View style={styles.teamLabelSection}>
                                <Text style={styles.titleStyle}>
                                    {awayteamName}
                                </Text>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </AppComponent>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        height: 100,
        marginHorizontal: 0,
        padding: 0,
        borderRadius: 0,
        marginBottom: 1,
    },
    timeContainer: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    teamsContainer: {
        flexDirection: 'row',
        flex: 3,
    },
    teamsSection: {
        flexDirection: 'column',
        flex: 3,
        marginVertical: 5,
    },
    teamLogoSection: {
        flex: 1,
        justifyContent: 'center',
    },
    teamLabelSection: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 5,
        color: COMPONENT_COLOR
    },
    middleSection: {
        flex: 5,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    oddsContainer: {
        flex: 2,
        flexDirection: 'row',
    },
    oddsSection: {
        flex: 5,
        paddingHorizontal: 5,
        justifyContent: 'center'
    },
    oddButton: {
        paddingHorizontal: 0,
        marginHorizontal: 0,
        width: 40,
        height: 40,
        backgroundColor: SECONDARY_COLOR,
        alignSelf: 'center',
        borderWidth: 0,
    },
    oddButtonSelected: {
        paddingHorizontal: 0,
        marginHorizontal: 0,
        width: 40,
        height: 40,
        backgroundColor: '#FFAF40',
        alignSelf: 'center',
        borderWidth: 0,
    },
    oddButtonLable: {
        color: COMPONENT_COLOR,
        fontWeight: 'bold',
    },
    titleStyle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COMPONENT_COLOR,
        textAlign: 'center',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
    }
});

const mapStateToProps = state => {
    const { newForm } = state.forms;

    return { newForm };
};

export default connect(mapStateToProps, { updateNewForm })(MatchContainer);
