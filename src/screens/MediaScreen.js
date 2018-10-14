import React, { Component } from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  RefreshControl, 
  TouchableOpacity } from 'react-native';

import axios from 'axios';

import AudiobookList from '../components/AudiobookList';
import AudioPlayer from '../components/AudioPlayer';
// import NameModalStartUp from '../components/NameModalStartUp';

import { 
  Card, 
  CardSection, 
  CardSectionAP, 
  ButtonSmall,
  Spinner } from '../components/common';

import Colors from '../constants/Colors';

export default class MediaScreen extends Component {
  static navigationOptions = {
    title: 'Hörbücher',
  };

  constructor(props) {
    super(props);
    this.choiceHandler.bind(this);
    this.minimizePlayerHandler.bind(this);
    this.selectionHandlerMediaScreen = this.selectionHandlerMediaScreen.bind(this);
    this.playFinishHandlerMS = this.playFinishHandlerMS.bind(this);
  }

  state = {
    loading: true,
    audiobooks: [],
    typeChoice: 'all',
    playerActivity: false,
    playerFullScreen: false,
    selectedAudiobook: null,
    transmitToChildren: true,
    refreshing: false,
  };

  componentWillMount() {
    axios.get('https://www.belavo.co/api/get/all')
    .then(response => this.setState({
        audiobooks: response.data,
        loading: false
       }))
    .catch(e => console.log(e));
}

  _onRefresh = () => {
    this.setState({ refreshing: true },
    this.refreshData()
    );
    this.setState({ refreshing: false });
  }

  refreshData() {
    axios.get('https://www.belavo.co/api/get/all')
    .then(response => this.setState({
        audiobooks: response.data,
        loading: false
       }))
    .catch(e => console.log(e));
  }

  togglePlayerSize() {
    this.setState({ playerFullScreen: !this.state.playerFullScreen });
  }

  choiceHandler(someArg) {
    this.setState({ typeChoice: someArg });
  }

  minimizePlayerHandler() {
    this.togglePlayerSize();
  }

  selectionHandlerMediaScreen(audiobookToPlay) {
    this.setState({
      selectedAudiobook: audiobookToPlay,
      playerActivity: true
    });
  }

  playFinishHandlerMS(audiobook) {
    if (audiobook === null) {
      this.setState({
        playerActivity: false,
        selectedAudiobook: audiobook,
      });
    } else {
      this.setState({
        selectedAudiobook: audiobook,
      });
    }
  }

  onPlayerPress = () => {
    this.togglePlayerSize();
  }

  renderScreen() {
    const choiceHandler = this.choiceHandler;
    const minimizePlayerHandler = this.minimizePlayerHandler;
    const selectionHandlerMediaScreen = this.selectionHandlerMediaScreen;
    const playFinishHandlerMS = this.playFinishHandlerMS;
    if (this.state.playerFullScreen) {
      return (
        <Card>
          <CardSectionAP>
            <AudioPlayer
              audiobook={this.state.selectedAudiobook}
              audiobooks={this.state.audiobooks}
              progress={0}
              minimizePlayerHandler={minimizePlayerHandler.bind(this)}
              playFinishHandlerMS={playFinishHandlerMS}
              fullscreen={this.state.playerFullScreen}
            />
        </CardSectionAP>
      </Card>
      );
    }
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

          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
          >
            {this.renderAudioBookList(selectionHandlerMediaScreen)}
          </ScrollView>
          {this.renderPlayer(playFinishHandlerMS, minimizePlayerHandler)}
          {/* <NameModalStartUp /> */}
        </View>
      );
  }

  renderAudioBookList(selectionHandlerMediaScreen) {
    if (this.state.loading) {
        return <Spinner />;
    }
      return (
        <AudiobookList
          audioBookChoice={this.state.typeChoice}
          audiobooks={this.state.audiobooks}
          selectionHandlerMediaScreen={selectionHandlerMediaScreen}
        />
      );
}

  renderPlayer(playFinishHandlerMS, minimizePlayerHandler) {
    if (this.state.playerActivity === true && this.state.selectedAudiobook !== null) {
      return (
        <Card>
          <TouchableOpacity onPress={this.onPlayerPress}>
            <CardSectionAP>
              <AudioPlayer
                audiobook={this.state.selectedAudiobook}
                audiobooks={this.state.audiobooks}
                progress={0}
                minimizePlayerHandler={minimizePlayerHandler.bind(this)}
                playFinishHandlerMS={playFinishHandlerMS}
                fullscreen={this.state.playerFullScreen}
              />
            </CardSectionAP>
          </TouchableOpacity>
      </Card>
    );
  }
}

  render() {
    console.log('MS: ' + this.state.playerFullScreen);
    // const choiceHandler = this.choiceHandler;
    // const selectionHandlerMediaScreen = this.selectionHandlerMediaScreen;
    // const playFinishHandlerMS = this.playFinishHandlerMS;
    return (
      <View style={styles.container}>
        {this.renderScreen()}
        {/* <Card>
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

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          {this.renderAudioBookList(selectionHandlerMediaScreen)}
        </ScrollView>
        {this.renderPlayer(playFinishHandlerMS)} */}
        {/* <NameModalStartUp /> */}
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
