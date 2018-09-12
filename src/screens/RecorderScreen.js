import React, { Component } from 'react';
import { 
    View, 
    ScrollView, 
    StyleSheet,
    Linking
    } from 'react-native';
import { Button, AlertField } from '../components/common';
import NameModalStartUp from '../components/NameModalStartUp';

import Colors from '../constants/Colors';

export default class RecorderScreen extends Component {
  static navigationOptions = {
    title: 'Aufnahme',
  };
  
  render() {
    const url = 'http://www.belavo.co/';
    return (
        <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Button 
            buttonText={'Aufnahme'} 
            onPress={() => Linking.openURL(url)} 
          />
        </ScrollView>
        <NameModalStartUp />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 15,
      backgroundColor: Colors.containerColor
    },
  });
