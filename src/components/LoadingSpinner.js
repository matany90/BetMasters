import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FullScreenSpinner } from './common/FullScreenSpinner';

class LoadingSpinner extends Component {
    render() {
        return (
            <FullScreenSpinner
                    visible={this.props.appIsLoading}
                    source={require('../images/Spinner2.gif')}
                    style={{
                        alignSelf: 'center',
                        width: 200,
                        height: 200,
                        resizeMode: 'contain'
                    }}
            >
                {this.props.loadingMessage}
            </FullScreenSpinner>
        );
    }
}

export default connect(({ auth }) => ({ 
    appIsLoading: auth.appIsLoading,
    loadingMessage: auth.loadingMessage
 }), null)(LoadingSpinner);
