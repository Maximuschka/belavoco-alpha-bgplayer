import React, { Component } from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  RefreshControl, 
  AsyncStorage } from 'react-native';

import axios from 'axios';

import AudiobookList from '../components/AudiobookList';
import AudioPlayer from '../components/AudioPlayer';

import { 
  Card, 
  CardSection, 
  CardSectionAP, 
  ButtonSmall,
  Spinner,
  EmailPromptProv } from '../components/common';

import settings from '../../settings';
import Colors from '../constants/Colors';
import apiUtils from '../api/apiUtils';
import utils from '../utils/utils';

const API_ENDPOINT_ALL = settings.getBackendHost().concat('/api/get/all');

export default class MediaScreen extends Component {
  static navigationOptions = {
    title: 'Hörbücher',
  };

  constructor(props) {
    super(props);
    this.choiceHandler.bind(this);
    this.initialUserhashHandler.bind(this);
    this.selectionHandlerMediaScreen = this.selectionHandlerMediaScreen.bind(this);
    this.playFinishHandlerMS = this.playFinishHandlerMS.bind(this);
  }

  state = {
    loading: true,
    audiobooks: [],
    typeChoice: 'all',
    playerActivity: false,
    selectedAudiobook: null,
    transmitToChildren: true,
    refreshing: false,
    userhash: 'XXXX',
  };

  componentWillMount() {
  this.loadingAsyncAndRefresh();
    }

  // TODO: userdata as state instead of only hash
  async loadingAsyncAndRefresh() {
    const userhashGet = await utils.getUserParameter('hash');
    
    this.setState({ userhash: userhashGet }, () => { 
          this.refreshData();
        });
  }

  _onRefresh = () => {
    this.setState({ refreshing: true },
    this.refreshData()
    );
    this.setState({ refreshing: false });
  }

  refreshData() {
    axios.get(API_ENDPOINT_ALL, { 
      headers: apiUtils.getRequestHeader(this.state.userhash)
    })
    .then(response => this.setState({
        audiobooks: response.data,
        loading: false
       }))
    .catch(e => console.log(e));
  }

  choiceHandler(someArg) {
    this.setState({ typeChoice: someArg });
  }

  initialUserhashHandler(someArg) {
    this.setState(
      { userhash: someArg }, () => { 
        this.refreshData();
    });
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

  renderPlayer(playFinishHandlerMS) {
    if (this.state.playerActivity === true && this.state.selectedAudiobook !== null) {
      return (
        <Card>
          <CardSectionAP>
            <AudioPlayer
              audiobook={this.state.selectedAudiobook}
              audiobooks={this.state.audiobooks}
              progress={0}
              playFinishHandlerMS={playFinishHandlerMS}
            />
        </CardSectionAP>
      </Card>
    );
  }
}

  render() {
    // console.log(this.state);
    const choiceHandler = this.choiceHandler;
    const initialUserhashHandler = this.initialUserhashHandler;
    const selectionHandlerMediaScreen = this.selectionHandlerMediaScreen;
    const playFinishHandlerMS = this.playFinishHandlerMS;
    return (
      <View style={styles.container}>
      {/* TODO: only load EmailPromptProv when email empty using userdata state */}
        <EmailPromptProv 
          initialUserhashHandler={initialUserhashHandler.bind(this)}
        />
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
