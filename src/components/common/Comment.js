// Import a library to help create a component
import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';

import apiUtils from '../../api/apiUtils';

import { LikeButtonGeneric } from '.';

import Colors from '../../constants/Colors';

// Make a component
class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.likeHandler = this.likeHandler.bind(this);
      }

    state = {
        like: false,
    }

    async likeHandler() {
        //MUSS SPÄTER UMGESTELLT WERDEN, UM LIKE FÜR DEN RICHTIGEN KOMMENTAR ZU SETZEN
        // const id = String(this.props.comment.id);
        const id = '3';

        this.setState({
            like: !this.state.like
        }, () => {
            AsyncStorage.setItem('comment_'.concat(id), JSON.stringify(this.state.like));
            });
      }

    render() {
        const {
            containerStyle,
            textStyle,
            infoStyle,
            infoContainerStyle,
            buttonContainerStyle,
            metaStyle,
        } = styles;

        const likeHandler = this.likeHandler;

        return (
            <View style={containerStyle}>
                <Text style={textStyle}>{this.props.text}</Text>
                    <View style={metaStyle}>
                        <View style={infoContainerStyle}>
                            <Text style={infoStyle}>
                                <Text>sagt </Text>
                                <Text style={{ fontWeight: 'bold' }}>{this.props.username}</Text>
                                <Text> am </Text>
                                <Text style={{ fontWeight: 'bold' }}>{this.props.date}</Text>
                            </Text>
                        </View>
                        <View style={buttonContainerStyle}>
                            <LikeButtonGeneric
                                hash={'test'}
                                // hash={hash}
                                size={20}
                                like={this.state.like}
                                likeHandler={likeHandler.bind(this)}
                                addLike={apiUtils.addLikeComment.bind(this)}
                                substractLike={apiUtils.substractLikeComment.bind(this)}
                            />
                        </View>
                    </View>
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        borderRadius: 15,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: Colors.tabIconDefault,
        margin: 5,
        marginBottom: 5,
        // backgroundColor: '#fff',
        // justifyContent: 'flex-start',
        // flexDirection: 'row',
        // borderColor: '#ddd',
        // position: 'relative',
    },
    textStyle: {
        fontSize: 14,
        margin: 5,
    },
    metaStyle: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    infoStyle: {
        fontSize: 12,
        alignSelf: 'flex-end'
    },
    infoContainerStyle: {
        width: '85%',
        marginLeft: 5,
        marginRight: 5,
    },
    buttonContainerStyle: {
        alignItems: 'flex-end',
        marginRight: 5,
    },
};


// Make the compoent available to other parts of the app
export { Comment };
