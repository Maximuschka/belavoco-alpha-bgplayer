// Import a library to help create a component
import React from 'react';

import { View, Text } from 'react-native';
import * as Progress from 'react-native-progress';

// import PlayButton from './common/PlayButton';

import {
    PlayButton,
    ProgressDisplay,
    IconButton, 
    CommentSection,
    Comment
    } from './common';

import playerUtils from '../player/playerUtils';
import audiobookUtils from '../audiobook/audiobookUtils';

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
        fullscreen: this.props.fullscreen,
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
                fullscreen: nextProps.fullscreen,
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
        //TODO: make following code in a function randomPlay().
        //TODO: AND, make a fucntion sequentialPlay() --> playing audiobook after audiobook
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

    minimizePlayer() {
        this.props.minimizePlayerHandler();
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
            upButton,
        } = styles;

        if (this.state.fullscreen) {
            return (
                <View style={containerStyle}>
                    <View style={stylesLargeAP.movedPlayerStyle}>
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
                            <IconButton 
                                onPress={this.minimizePlayer.bind(this)}
                                name='arrow-round-down'
                                size={20}
                                type='ionicon'
                                color='grey'
                            />
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
                    {this.renderComments()}
                </View>
            );
        } else if (this.state.fullscreen === false) {
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
                        <IconButton 
                            onPress={this.minimizePlayer.bind(this)}
                            name='arrow-round-up'
                            size={20}
                            type='ionicon'
                            color='grey'
                        />
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
        }
    }

    renderComments() {
        const text = 'Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text';
        const user1 = 'Max';
        const user2 = 'Leo';
        const date = '01.01.2019';
        return (
            <CommentSection>
                <Comment 
                    text={text}
                    username={user1}
                    date={date}
                />
                <Comment 
                    text={text}
                    username={user2}
                    date={date}
                />
                <Comment 
                    text={text}
                    username={user1}
                    date={date}
                />
                <Comment 
                    text={text}
                    username={user2}
                    date={date}
                />
                <Comment 
                    text={text}
                    username={user1}
                    date={date}
                />
                <Comment 
                    text={text}
                    username={user2}
                    date={date}
                />
                <Comment 
                    text={text}
                    username={user1}
                    date={date}
                />
                <Comment 
                    text={text}
                    username={user2}
                    date={date}
                />
            </CommentSection>
        );
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
    upButton: {
        alignItems: 'flex-end',
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
const stylesLargeAP = {
    containerStyle: {
        flexDirection: 'row',
        flex: 1,
    },
    movedPlayerStyle: {
        // paddingTop: 5,
        height: 80, 
    },
    downButton: {
        // flex: 1,
        alignItems: 'flex-end',
        // justifyContent: 'flex-end',
    },
};
