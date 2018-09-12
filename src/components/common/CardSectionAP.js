// Import a library to help create a component
import React from 'react';
import { View } from 'react-native';

import Colors from '../../constants/Colors';

// Make a component
const CardSectionAP = (props) => {
    return (
        <View style={styles.containerStyle}>
            {props.children}
        </View>
    );
};

const styles = {
    containerStyle: {
        // borderWidth: 1,
        // borderColor: 'black',
        padding: 5,
        height: 80, 
        backgroundColor: '#92e8a9',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        position: 'relative',
    },
};


// Make the compoent available to other parts of the app
export { CardSectionAP };
