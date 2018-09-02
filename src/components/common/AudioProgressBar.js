// Import a library to help create a component
import React from 'react';
import { View } from 'react-native';

import Colors from '../../constants/Colors';

// Make a component
class AudioProgressBar extends React.Component {

    containerStyle = function () {
        return {
            height: this.props.progress,
            width: 20,
            backgroundColor: Colors.tabIconSelected,
            marginLeft: 8,
        };
      }

    render() {
        return (
            <View style={this.containerStyle()} />
        );
    }
}

// Make the compoent available to other parts of the app
export { AudioProgressBar };
