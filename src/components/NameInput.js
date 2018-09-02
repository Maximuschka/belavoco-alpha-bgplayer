import React, { Component } from 'react';
import { 
    Modal, 
    Text, 
    TouchableHighlight, 
    View, 
    TextInput, 
    StyleSheet, 
    AsyncStorage } from 'react-native';
// import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

class NameInput extends Component {
  state = {
    modalVisible: false,
    name: ''
  };

  componentWillMount() {
    this.setInitialModalVisible();
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  async setInitialModalVisible() {
    try {
        const value = await AsyncStorage.getItem('name');
        if (value !== null) {
          this.setState({ modalVisible: false, name: value });
        }
      } catch (error) {
        // Error retrieving data
      }
  }

  // _pushNotification () {
  //   registerForPushNotificationsAsync();
  // }

  render() {
    const { inputBox, buttonStyle, textStyle } = styles;
    const handleToUpdate = this.props.handleToUpdate;

    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}
        >
          <View style={{ marginTop: 22 }}>
            <View>
              <TextInput
                style={inputBox}
                placeholder='Your name'
                label='Username'
                value={this.state.name}
                onChangeText={text => {
                    AsyncStorage.setItem('name', text); 
                    this.setState({ name: text });
                    }
                }
              />

              <TouchableHighlight
                style={buttonStyle}
                onPress={() => {
                  if (this.state.name) {
                    // this._pushNotification();
                    this.setModalVisible(!this.state.modalVisible);
                  handleToUpdate(this.state.name);
                  }
                }}
              >
                <Text style={textStyle}>Set name</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          style={buttonStyle}
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text style={textStyle}>{this.props.buttonText}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}


const styles = StyleSheet.create({
    inputBox: {
        padding: 20,
        fontSize: 20,
        alignSelf: 'center',
        color: '#f4424e'
    },
    buttonStyle: {
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#007aff',
        marginLeft: 5,
        marginRight: 5,
    },
    textStyle: {
        alignSelf: 'center',
        color: '#007aff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    }
  });

export default NameInput;
