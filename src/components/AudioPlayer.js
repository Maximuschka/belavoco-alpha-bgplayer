// Import a library to help create a component
import React from 'react';
// import moment from 'moment';

import { View, Text } from 'react-native';
import * as Progress from 'react-native-progress';

import PlayButton from './common/PlayButton';

import playerUtils from '../player/playerUtils';

import Colors from '../constants/Colors';

// Make a component

let interval;
let duration;

export default class AudioPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.playFinishHandlerAP = this.playFinishHandlerAP.bind(this);
      }

      state = {
        progress: null,
        position: null,
    };

    componentDidMount() {
        interval = setInterval(() => {
            this.setState({ 
                progress: playerUtils.getProgress()[0],
                position: playerUtils.getProgress()[1] 
            });
            console.log(playerUtils.getProgress());
        }, 1000);
      }
    
      componentWillUnmount() {
        clearInterval(interval);
      }

      playFinishHandlerAP() {
        this.props.playFinishHandlerMS();
      }


    render() {
        console.log('Progress State: ' + this.state.progress);
        const playFinishHandlerAP = this.playFinishHandlerAP;

        const {
            containerStyle,
            bottomContainerStyle,
            buttonContainer,
            infoContainer,
            authorStyle,
            titleStyle,
        } = styles;

      return (
        <View style={containerStyle}>
            <View style={bottomContainerStyle}>
                <View style={buttonContainer}>
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
            <Progress.Bar 
                progress={this.state.progress} 
                width={null}
                color='grey'
                animated={false}
            />
        </View>
      );
    }
  }

const styles = {
    containerStyle: {
        flex: 1,
    },
    bottomContainerStyle: {
        // borderBottomWidth: 1,
        // height: 30,
        padding: 5,
        // backgroundColor: '#ffe6ff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative',
        flex: 1,
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        flex: 1,
    },
    infoContainer: {
        justifyContent: 'space-around',
        flexDirection: 'column',
        marginLeft: 8,
        flex: 4
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
