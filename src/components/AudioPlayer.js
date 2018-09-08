// Import a library to help create a component
import React from 'react';
import { View, Text } from 'react-native';
import PlayButton from './common/PlayButton';
import playerUtils from '../player/playerUtils';

import Colors from '../constants/Colors';

// Make a component

export default class AudioPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.playFinishHandlerAP = this.playFinishHandlerAP.bind(this);
      }

      playFinishHandlerAP() {
        this.props.playFinishHandlerMS();
      }

    render() {
        const playFinishHandlerAP = this.playFinishHandlerAP;

        const {
            containerStyle,
            buttonContainer,
            infoContainer,
            authorStyle,
            titleStyle,
        } = styles;

      return (
        <View style={containerStyle}>
            <View styke={buttonContainer}>
                <PlayButton
                    playingState={'PLAYING'}
                    playFinishHandlerAP={playFinishHandlerAP}
                />
            </View>
            <View style={infoContainer}>
                <Text style={authorStyle}>{this.props.author}</Text>
                <Text style={titleStyle}>{this.props.title}</Text>
            </View>
        </View>
      );
    }
  }

const styles = {
    containerStyle: {
        // borderBottomWidth: 1,
        // height: 30,
        padding: 5,
        // backgroundColor: '#ffe6ff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative',
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        // width: 50,
        // flex: 1,
    },
    infoContainer: {
        justifyContent: 'space-around',
        flexDirection: 'column',
        marginLeft: 8,
        marginLeft: 8,
        // flex: 4
    },
    authorStyle: {
        fontSize: 15,
        // marginLeft: 8,
    },
    titleStyle: {
        fontSize: 17,
        // marginLeft: 8,
        // flex: 1,
    },
};
