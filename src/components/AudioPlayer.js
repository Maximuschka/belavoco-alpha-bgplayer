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
      }

      state = {
        audiobook: this.props.audiobook,
        playlist: this.props.audiobooks,
        progress: this.props.progress,
        position: 0,
        loadingProgress: false,
    };

    componentDidMount() {
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
                // playlist: nextProps.audiobooks, #dont activate. It will flaw playlist
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

    async playFinishHandlerAP() {
        const autoplayState = await playerUtils.loadAutoplayStatus();
        if (autoplayState === false) {
            this.props.playFinishHandlerMS(null);
        } else if (autoplayState === true && this.state.playlist.length > 0) {
            const index = this.state.playlist.indexOf(this.state.audiobook);
            const randomAudiobook = audiobookUtils.getRandomAudiobook(this.state.playlist, index);
            this.setState({ 
                audiobook: randomAudiobook[0],
                playlist: randomAudiobook[1]
            });
            this.props.playFinishHandlerMS(randomAudiobook[0]);
            playerUtils.startAudioBook(randomAudiobook[0].file_url);
        } else if (autoplayState === true && this.state.playlist.length === 0) {
            this.setState({ audiobook: null });
        }
    }

    renderPlayerContent() {
        const playFinishHandlerAP = this.playFinishHandlerAP;
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

        if (this.state.audiobook !== null) {
            return (
                <View style={containerStyle}>
                    <View style={infoContainerStyle}>
                        <View style={buttonContainer}>
                            <PlayButton
                                playingState={'PLAYING'}
                                playFinishHandlerAP={playFinishHandlerAP}
                            />
                        </View>
                        <View style={infoContainer}>
                            <Text style={authorStyle}>{this.state.audiobook.author}</Text>
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
                                length={this.state.audiobook.length}
                            />
                        </View>
                    </View>
                </View>
            );
        } else if (this.state.audiobook === null) {
            return (
                <View style={containerStyle}>
                    <View style={infoContainerStyle}>
                        <View style={buttonContainer}>
                            <PlayButton
                                playingState={'PLAYING'}
                                playFinishHandlerAP={playFinishHandlerAP}
                            />
                        </View>
                        <View style={infoContainer}>
                            <Text style={titleStyle}>Nothing to Play</Text>
                        </View>
                    </View>
                </View>
            );
        }
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                {this.renderPlayerContent()}
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
