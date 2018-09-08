// Import a library to help create a component
import React from 'react';
import moment from 'moment';
import {
    Text,
    View,
    TouchableOpacity,
    AsyncStorage } from 'react-native';
import {
    Card,
    CardSection,
    InfoIcon,
    AudioProgressBar,
    LikeButton } from './common';

import playerUtils from '../player/playerUtils';

// Make a component
class AudiobookDetail extends React.Component {
    state = {
        isLoading: true,
        selectedAudiobook: null,
        audioProgress: null,
        like: false,
    }

    async componentWillMount() {
        await this.loadLikeState();
        this.setState({
            isLoading: false
        });
    }

    startPlayPress = () => {
        //playerUtils.startAudioBook('http://www.schillmania.com/projects/soundmanager2/demo/_mp3/rain.mp3');
        playerUtils.startAudioBook(this.props.audiobook.file_url);
        this.props.selectionHandlerList(this.props.audiobook);
      }

    likePress = () => {
        const id = String(this.props.audiobook.id);
        this.setState({
            like: !this.state.like
        }, () => {
            AsyncStorage.setItem(id, JSON.stringify(this.state.like));
            });
        }

    async loadLikeState() {
        const id = String(this.props.audiobook.id);
        const likeState = await AsyncStorage.getItem(id);
        this.setState({
            like: likeState
        });
    }

    // audioBookProgressHandler(someArg) {
    //     this.setState({ audioProgress: someArg });
    //   }

    // renderProgressBar() {
    //     if (this.state.audioProgress === null) {
    //         return null;
    //     }
    //     return <AudioProgressBar progress={this.state.audioProgress} />;
    // }

    render() {
        const {
            id,
            author,
            title,
            reader,
            file_url,
            times_played,
            length
        } = this.props.audiobook;

        const {
            textContainerColumn,
            textContainerRow,
            authorStyle,
            readerStyle,
            infoContainer,
            titleStyle,
            likeButtonContainer,
        } = styles;

        // const audioBookProgressHandler = this.audioBookProgressHandler;
        // const duration = length * 1000;

        return (
            <TouchableOpacity onPress={this.startPlayPress}>
            <Card>
                <CardSection>
                    {/* {this.renderProgressBar()} */}
                    <View style={infoContainer}>
                        <View>
                            <Text style={authorStyle}>{author}</Text>
                            <Text numberOfLines={1} style={titleStyle}>{title}</Text>
                        </View>
                        <View style={textContainerColumn}>
                            <Text numberOfLines={1} style={readerStyle}>Es liest {reader}</Text>
                            <View style={textContainerRow}>

                                <InfoIcon
                                    type="evilicon"
                                    name="clock"
                                    text={moment().startOf('day')
                                    .seconds(length)
                                    .format('mm:ss')}
                                    extraMargin='3'
                                />

                                <InfoIcon
                                    type="materialicon"
                                    name="replay"
                                    text={times_played}
                                />

                                <InfoIcon
                                    type="evilicon"
                                    name="like"
                                    text='0'
                                />
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity onPress={this.likePress} style={likeButtonContainer}>
                        <LikeButton
                            like={this.state.like}
                        />
                    </TouchableOpacity>
                    {/* {this.renderProgressBar()} */}
                </CardSection>
            </Card>
            </TouchableOpacity>
        );
    }
}

const styles = {
    infoContainer: {
        justifyContent: 'space-around',
        flexDirection: 'column',
        flex: 4
    },
    playedContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainerColumn: {
        flexDirection: 'column',
        justifyContent: 'space-around',

    },
    textContainerRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 8,
        marginTop: 6,
    },
    authorStyle: {
        fontSize: 15,
        marginLeft: 8,
    },
    titleStyle: {
        fontSize: 17,
        marginLeft: 8,
        flex: 1,
    },
    readerStyle: {
        fontSize: 12,
        marginLeft: 8,
        flex: 1,
    },
    playedStyle: {
        fontSize: 30,
        alignSelf: 'center',
        marginLeft: 5,
        marginRight: 5
    },
    likeButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        // width: 50,
        // flex: 1,
    },
};

// Make the compoent available to other parts of the app
export default AudiobookDetail;
