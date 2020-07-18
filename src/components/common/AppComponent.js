import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { COMPONENT_BACKGROUND_COLOR } from '../../constants';

export class AppComponent extends Component {
    render() {
        const { style, children, ...rest } = this.props;
        return (
            <View
                style={[styles.container, style]}
                {...rest}
            >
                {children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COMPONENT_BACKGROUND_COLOR,
        margin: 10,
        padding: 5,
        borderRadius: 10,
        
        //IOS Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,

        //Android Shadow
        elevation: 4
    }
});
