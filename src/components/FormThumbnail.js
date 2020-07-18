import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { AppComponent } from './common';
import { locali } from '../../locales/i18n';

class FormThumbnail extends Component {

    render() {
        const { date, time, totalCoins, won, coins } = this.props.form;
        return (
            <AppComponent>
                <View style={styles.container}>
                    <View style={styles.dateContainer}>
                        <Text style={styles.title}>
                        {
                            locali('forms.display_form.thumbnail_display.date_title') +
                            //new Date(timestamp * 1000).toLocaleString()
                            date + ' ' + time
                        }
                    </Text>
                    </View>
                    <View style={styles.pressToOpenContainer}>
                        <View style={{ marginHorizontal: 5 }}>
                            <Text style={styles.title}>
                                {locali('forms.display_form.thumbnail_display.press_here')}
                    </Text>
                        </View>
                        <View style={{ marginHorizontal: 5 }}>
                            <Icon
                                name='hand-pointer-o'
                                type='font-awesome'
                            />
                        </View>
                    </View>
                    <View style={styles.betsContainer}>
                        <View style={styles.betCoinsContainer}>
                            <View>
                                <Text style={styles.title}>
                                    {locali('forms.display_form.thumbnail_display.bet_amount')}
                              </Text>
                            </View>
                            <View style={{ alignSelf: 'center', flexDirection: 'row'/* , borderWidth: 1, borderColor: 'black' */ }}>
                                <View style={{ marginHorizontal: 5, justifyContent: 'center', alignSelf: 'center' }}>
                                    <Text style={styles.title}>
                                        {coins}
                                    </Text>
                                </View>
                                <View style={{ marginHorizontal: 5, alignSelf: 'center' }}>
                                    <Image
                                        source={require('../images/Currency2Small.png')}
                                        style={{ height: 35, width: 35 }}
                                        resizeMode="contain"
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.checkWonContainer}>
                            <Icon
                            size={40}
                                name={
                                    won === 1 ? 'check' :
                                    won === 0 ? 'cross' :
                                    'timer'}
                                type={
                                    won === 1 ? 'entypo' :
                                    won === 0 ? 'entypo' :
                                    'materialIcons'}
                                color={
                                    won === 1 ? 'green' :
                                    won === 0 ? 'red' :
                                    'grey'}
                            />
                        </View>
                        <View style={styles.betExpectedCoinsContainer}>
                            <View>
                                <Text style={styles.title}>
                                {locali('forms.display_form.thumbnail_display.winning_coins')}  
                              </Text>
                            </View>
                            <View style={{ alignSelf: 'center', flexDirection: 'row'/* , borderWidth: 1, borderColor: 'black' */ }}>
                                <View style={{ marginHorizontal: 5, justifyContent: 'center', alignSelf: 'center' }}>
                                    <Text style={styles.title}>
                                        {totalCoins.toFixed(2)}
                                    </Text>
                                </View>
                                <View style={{ marginHorizontal: 5, alignSelf: 'center' }}>
                                    <Image
                                        source={require('../images/Currency2Small.png')}
                                        style={{ height: 35, width: 35 }}
                                        resizeMode="contain"
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </AppComponent>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    dateContainer: {
        alignSelf: 'center',
        marginVertical: 5
    },
    title: {
        textAlign: 'center',
        fontSize: 18
    },
    pressToOpenContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10
    },
    betsContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    betCoinsContainer: {
        flex: 3,
    },
    checkWonContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    betExpectedCoinsContainer: {
        flex: 3,
    }
});

export default FormThumbnail;
