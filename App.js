import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';

export default class App extends Component {
  render() {
    return (
      <AppNavigator />
    );
  }
}
