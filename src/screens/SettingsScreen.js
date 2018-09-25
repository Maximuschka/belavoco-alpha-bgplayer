
import React, { Component } from 'react';
import { View, 
  Text, 
  StyleSheet, 
  AsyncStorage,
  Switch } from 'react-native';
import NameInput from '../components/NameInput';
import { 
  Card, 
  CardSection,
  } from '../components/common';

import playerUtils from '../player/playerUtils';
import Colors from '../constants/Colors';

export default class SettingsScreen extends Component {
  static navigationOptions = {
    title: 'Settings',
  };
  
  constructor(props) {
    super(props);
    this.handleToUpdate.bind(this);
  }

  state = { 
    loading: true,
    username: '',
    autoplay: false,
  };

  componentWillMount() {
    this.loadingAsync();
  }

  async loadingAsync() {
    const usernameGet = await AsyncStorage.getItem('name');
    const autoplayGet = await playerUtils.loadAutoplayStatus();

    this.setState({ 
      username: usernameGet,
      autoplay: autoplayGet
     });
  }

  async toggleAutoplayState(value) {
    this.setState({ autoplay: value });
    await AsyncStorage.setItem('autoplay', JSON.stringify(value));
  }

  handleToUpdate(someArg) {
    this.setState({ username: someArg });
  }

  render() {
    const { container, buttonContainer, infoContainer, titleStyle } = styles;
    const handleToUpdate = this.handleToUpdate;
    return (
      <View style={container}>
        <Card>
          <CardSection>
            <View style={infoContainer}>
              <Text style={titleStyle}>{'User name: ' + this.state.username}</Text>
            </View>
            <View style={buttonContainer}>
              <NameInput 
                buttonText={'Change'}
                handleToUpdate={handleToUpdate.bind(this)}
              />
            </View>
          </CardSection>
        </Card>
        <Card>
          <CardSection>
            <View style={infoContainer}>
              <Text style={titleStyle}>{'Autoplay: '}</Text>
            </View>
            <View style={buttonContainer}>
              <Switch 
                onValueChange={(value) => this.toggleAutoplayState(value)}
                value={this.state.autoplay}
              /> 
            </View>
          </CardSection>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    // backgroundColor: '#e6ecf7',
    backgroundColor: Colors.containerColor,
  },
  infoContainer: {
    justifyContent: 'center',
    flex: 2,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  textContainer: {
    //justifyContent: 'space-around',
    //flexDirection: 'row',
    backgroundColor: '#fff',
  },
  titleStyle: {
      fontSize: 19,
      fontWeight: '400',
  },
});
