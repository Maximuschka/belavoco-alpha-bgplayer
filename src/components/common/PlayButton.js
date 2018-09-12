// Import a library to help create a compone
import React, { Component } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    DeviceEventEmitter,
    Platform
    } from 'react-native';
import { Icon } from 'react-native-elements';

import { Spinner } from '.';
import playerUtils from '../../player/playerUtils';
import Colors from '../../constants/Colors';

// Make a component
export default class PlayButton extends Component {
    state = {
        isLoading: true,
        playingState: this.props.playingState
    };

    componentWillMount() {
        this.setState({
          isLoading: false,
        });
      }

    componentDidMount() {
        this.subscription = DeviceEventEmitter.addListener(
            'RNAudioStreamerStatusChanged', this._statusChanged.bind(this));
    }

    onPress = () => {
        this.playOrPause();
    }

    playOrPause() {
        if (String(this.state.playingState) === 'PLAYING') {
            playerUtils.pauseAudioBook();
        } else if (String(this.state.playingState) === 'PAUSED' || 'STOPPED' || 'BUFFERING') {
            playerUtils.playAudioBook();
        }
    }

    _statusChanged(status) {
        this.setState({ playingState: status });

        if (status === 'FINISHED') {
            this.props.playFinishHandlerAP();
        }
    }

    renderPlayMode(iconStyle, playingState) {
        if (String(playingState) === 'PLAYING') {
          return (
            <Icon
                name={
                    Platform.OS === 'ios'
                        ? 'ios-pause'
                        : 'md-pause'
                    }
                size={45}
                style={iconStyle}
                type='ionicon'
                color='grey'
            />
          );
        } else if (String(playingState) === 'PAUSED') {
            return (
                <Icon
                    name={
                        Platform.OS === 'ios'
                            ? 'ios-play'
                            : 'md-play'
                        }
                    size={45}
                    style={iconStyle}
                    type='ionicon'
                    color='grey'
                />
            );
        } else if (String(playingState) === 'BUFFERING' || String(playingState) === 'STOPPED') {
            return (
                <Spinner />
            );
        } else if (String(playingState) === 'ERROR') {
            return (
                <Icon
                    name={
                        Platform.OS === 'ios'
                            ? 'ios-close'
                            : 'md-close'
                        }
                    size={45}
                    style={iconStyle}
                    type='ionicon'
                    color='grey'
                />
            );
        } 
    }

    render() {
        console.log(this.state.playingState);
        const { buttonStyle, iconStyle } = styles;
        const { playingState } = this.state;

        if (this.state.isLoading) {
          return <Spinner size="small" />;
        }
        return (
            <TouchableOpacity
              onPress={this.onPress}
              style={buttonStyle}
            >
              {this.renderPlayMode(iconStyle, playingState)}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        alignSelf: 'center',
        marginRight: 8,
        marginLeft: 8,
    },
    iconStyle: {
        height: 50,
        width: 50,
    },
});
