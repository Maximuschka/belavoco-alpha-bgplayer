
import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import NameInput from '../components/NameInput';
import { Card, CardSection } from '../components/common';

import Colors from '../constants/Colors';

export default class SettingsScreen extends Component {
  static navigationOptions = {
    title: 'Settings',
  };
  
  constructor(props) {
    super(props);
    this.handleToUpdate.bind(this);
  }

  state = { username: '' };

  async componentWillMount() {
    const usernameGet = await AsyncStorage.getItem('name');
    this.setState({ username: usernameGet });
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
