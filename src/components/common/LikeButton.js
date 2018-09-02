// Import a library to help create a component
import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';


// Make a component
class LikeButton extends React.Component {
    state = { 
        like: this.props.like,
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
          this.setState({
            like: nextProps.like
          });
        }
      }

    renderLikeState(iconStyle) {
        if (String(this.state.like) === 'true') {
            return (
                <Icon
                    name='ios-heart'
                    size={45}
                    type='ionicon'
                    style={iconStyle}
                    color='grey'
                />
            );
        }
        return (
            <Icon
                name='ios-heart-empty'
                size={45}
                type='ionicon'
                style={iconStyle}
                color='grey'
            />
        );
    }

    render() {
        const { 
            containerStyle,
            iconStyle,
        } = styles;
        return (
            <View style={containerStyle}>
                {this.renderLikeState(iconStyle)}
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginRight: 15,
    },
    // iconStyle: {
    //     alignSelf: 'center',
    // },
};

// Make the compoent available to other parts of the app
export { LikeButton };
