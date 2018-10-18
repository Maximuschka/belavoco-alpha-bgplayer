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
        } = styles;

        const likeHandler = this.likeHandler;

        return (
            <View style={containerStyle}>
                <Text style={textStyle}>{this.props.text}</Text>
                    <View style={infoContainerStyle}>
                        <LikeButtonGeneric
                            hash={'test'}
                            // hash={hash}
                            size={20}
                            like={this.state.like}
                            likeHandler={likeHandler.bind(this)}
                            addLike={apiUtils.addLikeComment.bind(this)}
                            substractLike={apiUtils.substractLikeComment.bind(this)}
                        />
                        <Text style={infoStyle}>
                            sagt {this.props.username} am {this.props.date}
                        </Text>
                    </View>
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: Colors.tabIconDefault,
        margin: 5,
        marginBottom: 10,
        // backgroundColor: '#fff',
        // justifyContent: 'flex-start',
        // flexDirection: 'row',
        // borderColor: '#ddd',
        // position: 'relative',
    },
    textStyle: {
        fontSize: 15,
        margin: 5,
        // alignSelf: 'flex-end'
    },
    infoContainerStyle: {
        flexDirection: 'row',
        marginBottom: 5,
        // padding: 5,
    },
    infoStyle: {
        fontSize: 12,
        // marginRight: 5,
        // marginBottom: 5,
        alignSelf: 'flex-end'
    },
};


// Make the compoent available to other parts of the app
export { Comment };
