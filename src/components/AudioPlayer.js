// Import a library to help create a component
import React from 'react';

import { View, Text } from 'react-native';
import * as Progress from 'react-native-progress';

// import PlayButton from './common/PlayButton';

import {
    PlayButton,
    ProgressDisplay } from './common';

import playerUtils from '../player/playerUtils';
import audiobookUtils from '../utils/audiobookUtils';

import Colors from '../constants/Colors';

// Make a component

let interval;

export default class AudioPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.playFinishHandlerAP = this.playFinishHandlerAP.bind(this);
        this.audiobookInfoHandler = this.audiobookInfoHandler.bind(this);
      }

      state = {
        audiobook: this.props.audiobook,
        audiobooks: this.props.audiobooks,
        progress: this.props.progress,
        position: 0,
        loadingProgress: false,
        autoplay: false,
    };

    componentDidMount() {
        this.loadingAutoplayState();
        interval = setInterval(() => {
            if (this.state.loadingProgress === false) {
                this.setState({
                    progress: playerUtils.getProgress()[0],
                    position: playerUtils.getProgress()[1],
                });
            }
        }, 500);
      }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.setState({
                audiobook: nextProps.audiobook,
                audiobooks: nextProps.audiobooks,
                progress: nextProps.progress,
                loadingProgress: true
            });
            setTimeout(() => {
                this.setState({
                    loadingProgress: false
                });
           }, 1500);
        }
    }

    componentWillUnmount() {
        clearInterval(interval);
    }

    async loadingAutoplayState() {
        const autoplayGet = await playerUtils.loadAutoplayStatus();
        if (autoplayGet === 'true') {
          this.setState({ autoplay: true });
        } else {
          this.setState({ autoplay: false });
        }
    }

    playFinishHandlerAP() {
        if (this.state.autoplay === false) {
            this.props.playFinishHandlerMS();
        } else if (this.state.autoplay === true) {
            const randomAudiobook = audiobookUtils.getRandomAudiobook(this.state.audiobooks);
            this.setState({ audiobook: randomAudiobook });
            playerUtils.startAudioBook(randomAudiobook.file_url);
        }
    }

    audiobookInfoHandler(randomAudiobook) {
        this.setState({
            audiobook: randomAudiobook,
        });
    }

    render() {
        console.log('Autoplay: ' + this.state.autoplay);
        console.log('Audiobook: ' + this.state.audiobook.title);
        const playFinishHandlerAP = this.playFinishHandlerAP;
        const audiobookInfoHandler = this.audiobookInfoHandler;

        const {
            containerStyle,
            infoContainerStyle,
            progressContainerStyle,
            progressBarStyle,
            progressDisplayStyle,
            buttonContainer,
            infoContainer,
            authorStyle,
            titleStyle,
        } = styles;

      return (
        <View style={containerStyle}>
            <View style={infoContainerStyle}>
                <View style={buttonContainer}>
                    <PlayButton
                        playingState={'PLAYING'}
                        playFinishHandlerAP={playFinishHandlerAP}
                        audiobookInfoHandler={audiobookInfoHandler}
                    />
                </View>
                <View style={infoContainer}>
                    {/* <Text style={authorStyle}>{this.props.author}</Text> */}
                    <Text style={authorStyle}>{this.state.audiobook.author}</Text>
                    {/* <Text style={titleStyle}>{this.props.title}</Text> */}
                    <Text style={titleStyle}>{this.state.audiobook.title}</Text>
                </View>
            </View>
            <View style={progressContainerStyle}>
                <View style={progressBarStyle}>
                    <Progress.Bar
                        progress={this.state.progress}
                        width={null}
                        color='grey'
                        animated={false}
                    />
                </View>
                <View style={progressDisplayStyle}>
                    <ProgressDisplay
                        position={this.state.position}
                        // length={this.props.length}
                        length={this.state.audiobook.length}
                    />
                </View>
            </View>
        </View>
      );
    }
  }

const styles = {
    containerStyle: {
        flex: 1,
    },
    infoContainerStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative',
        flex: 3,
    },
    progressContainerStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
    },
    progressBarStyle: {
        flex: 3,
    },
    progressDisplayStyle: {
        //minWidth: 35,
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
