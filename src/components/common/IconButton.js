// Import a library to help create a component
import React from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import { Icon } from 'react-native-elements';


// Make a component
const IconButton = (props) => {
    return (
            
        <TouchableOpacity onPress={props.onPress}>
        {/* <TouchableOpacity onPress={() => this.onPress}> */}
            <Icon
                name={
                    Platform.OS === 'ios'
                        ? 'ios-' + props.name 
                        : 'md-' + props.name 
                    }
                size={props.size}
                type={props.type}
                // style={iconStyle}
                color={props.color}
            />        
        </TouchableOpacity>
    );
};

// const styles = {
//     containerStyle: {
//     },
// };


// Make the compoent available to other parts of the app
export { IconButton };
