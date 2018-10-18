// Import a library to help create a component
import React from 'react';
import { View, Text } from 'react-native';

import Colors from '../../constants/Colors';

// Make a component
const Comment = (props) => {

    const {
        containerStyle,
        textStyle,
        infoStyle,
    } = styles;

    return (
        <View style={containerStyle}>
            <Text style={textStyle}>{props.text}</Text>
            <Text style={infoStyle}>sagt {props.username} am {props.date}</Text>
        </View>
    );
};

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
    },
    infoStyle: {
        fontSize: 12,
        marginRight: 5,
        marginBottom: 5,
        alignSelf: 'flex-end'
    },
    // userStyle: {
    //     fontSize: 12,
    //     marginRight: 5,
    // },
};


// Make the compoent available to other parts of the app
export { Comment };
