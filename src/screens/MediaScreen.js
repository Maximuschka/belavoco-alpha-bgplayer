import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

import AudiobookList from '../components/AudiobookList';
import AudioPlayer from '../components/AudioPlayer';
import { Card, CardSection, CardSectionAP, ButtonSmall } from '../components/common';

import Colors from '../constants/Colors';

export default class MediaScreen extends Component {
  static navigationOptions = {
    title: 'Hörbücher',
  };

  constructor(props) {
    super(props);
    this.choiceHandler.bind(this);
    this.selectionHandlerMediaScreen = this.selectionHandlerMediaScreen.bind(this);
    this.playFinishHandlerMS = this.playFinishHandlerMS.bind(this);
  }

  state = {
    audiobooks: [],
    typeChoice: 'all',
    playerActivity: false,
    selectedAudiobook: null
  };

  componentWillMount() {
    axios.get('https://www.belavo.co/api/get/all')
    .then(response => this.setState({
        audiobooks: response.data }))
    .catch(e => console.log(e));
}

  choiceHandler(someArg) {
    this.setState({ typeChoice: someArg });
  }

  selectionHandlerMediaScreen(audiobookToPlay) {
    this.setState({
      selectedAudiobook: audiobookToPlay,
      playerActivity: true
    });
  }

  playFinishHandlerMS() {
    this.setState({
      playerActivity: false
    });
  }

  renderPlayer(playFinishHandlerMS) {
    if (this.state.playerActivity === true && this.state.selectedAudiobook !== null) {

      const {
        id,
        author,
        title,
        reader,
        file_url,
        times_played,
        length
    } = this.state.selectedAudiobook;

        return (
          <Card>
            <CardSectionAP>
              <AudioPlayer
                author={author}
                title={title}
                audiobookURL={file_url}
                length={length}
                playFinishHandlerMS={playFinishHandlerMS}
              />
            </CardSectionAP>
          </Card>
        );
    }
}

  render() {
    // console.log(this.state.playerActivity);
    if (this.state.selectedAudiobook !== null) {
    }
    const choiceHandler = this.choiceHandler;
    const selectionHandlerMediaScreen = this.selectionHandlerMediaScreen;
    const playFinishHandlerMS = this.playFinishHandlerMS;
    return (
      <View style={styles.container}>
        <Card>
          <CardSection>
            <ButtonSmall
              buttonText={'Alles'}
              buttonState={'all'}
              choiceHandler={choiceHandler.bind(this)}
            />
            <ButtonSmall
              buttonText={'Prosa'}
              buttonState={'prose'}
              choiceHandler={choiceHandler.bind(this)}
            />
            <ButtonSmall
              buttonText={'Lyrik'}
              buttonState={'poetry'}
              choiceHandler={choiceHandler.bind(this)}
            />
          </CardSection>
        </Card>
        <ScrollView>
          <AudiobookList
            audioBookChoice={this.state.typeChoice}
            audiobooks={this.state.audiobooks}
            selectionHandlerMediaScreen={selectionHandlerMediaScreen}
          />
        </ScrollView>
        {this.renderPlayer(playFinishHandlerMS)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.containerColor,
  },
});
