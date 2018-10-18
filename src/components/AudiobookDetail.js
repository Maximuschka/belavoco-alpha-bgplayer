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
    LikeButton,
    LikeButtonGeneric } from './common';

import playerUtils from '../player/playerUtils';
import apiUtils from '../api/apiUtils';
import utils from '../utils/utils';

// Make a component
class AudiobookDetail extends React.Component {
    constructor(props) {
        super(props);
        this.likeHandler = this.likeHandler.bind(this);
      }

    state = {
        isLoading: true,
        selectedAudiobook: null,
        like: false,
    }

    async componentWillMount() {
        await this.loadLikeState();
        this.setState({
            isLoading: false
        });
    }

    async likeHandler() {
        const id = String(this.props.audiobook.id);

        this.setState({
            like: !this.state.like
        }, () => {
            AsyncStorage.setItem('audiobook_'.concat(id), JSON.stringify(this.state.like));
            });
      }

    startPlayPress = () => {
        //playerUtils.startAudioBook('http://www.schillmania.com/projects/soundmanager2/demo/_mp3/rain.mp3');
        playerUtils.startAudioBook(this.props.audiobook.file_url);
        this.props.selectionHandlerList(this.props.audiobook);
      }

    async loadLikeState() {
        const id = String(this.props.audiobook.id);
        let likeState = await AsyncStorage.getItem('audiobook_'.concat(id));

        if (likeState === null) {
          likeState = false;
        }

        this.setState({
            like: likeState
        });
    }

    render() {
        const {
            id,
            author,
            title,
            reader,
            file_url,
            hash,
            times_liked,
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

        const likeHandler = this.likeHandler;
        const addLike = this.addLike;
        const substractLike = this.substractLike;

        return (
            <TouchableOpacity onPress={this.startPlayPress}>
            <Card>
                <CardSection>
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
                                    text={times_liked}
                                />
                            </View>
                        </View>
                    </View>
                    <LikeButtonGeneric
                        hash={hash}
                        size={45}
                        like={this.state.like}
                        // colorLike='grey'
                        likeHandler={likeHandler.bind(this)}
                        addLike={apiUtils.addLike.bind(this)}
                        substractLike={apiUtils.substractLike.bind(this)}
                    />
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
