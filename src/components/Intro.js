import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ImageBackground } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { connect } from 'react-redux';
import { credentialsSetup } from '../actions';
import { locali } from '../../locales/i18n';


const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: 320, height: 320, resizeMode: 'contain'
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 13,
  },
  title: {
    fontSize: 22,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
  },

});

const slides = [
  {
    key: 'page1',
    title: locali('intro.page1.title'),
    text: locali('intro.page1.content'),
    image: require('../images/AppLogoNoBG.png'),
    imageStyle: styles.image,
    colors: ['#63E2FF', '#B066FE'],
  }
];

class App extends Component {
  static navigationOptions = {
    header: null,
  };

  _renderItem = props => (
      <ImageBackground
        style={{ width: '100%', height: '100%', alignItems: 'center' }}
        source={require('../images/SoccerFieldDarker.jpg')}
        resizeMode='cover'
      >
        <Image
          style={props.imageStyle}
          source={props.image}
        />
        <View>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.text}>{props.text}</Text>
        </View>
      </ImageBackground>
  );

  render() {
    return (
      <AppIntroSlider
        slides={slides}
        renderItem={this._renderItem}
        onDone={() => this.props.credentialsSetup()}
        onSkip={() => this.props.credentialsSetup()}
        skipLabel={locali('intro.button_skip')}
        nextLabel={locali('intro.button_next')}
        doneLabel={locali('intro.button_done')}
        bottomButton
        showSkipButton
      />
    );
  }
}

export default connect(null, { credentialsSetup })(App);
