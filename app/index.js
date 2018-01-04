/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import Content from './components/Content/Content.component';
import Footer from './components/Footer/Footer.component';
import Lower from './components/Lower/Lower.component';
import NoteList from './components/NoteList/NoteList.component';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './index.style';
import Title from './components/Title/Title.component';
import uuid from 'uuid';
import {
  AsyncStorage, KeyboardAvoidingView, Platform, View
} from 'react-native';

const notesKey = 'notes';
//
export default class App extends Component {
  state = {
    textTitle: '',
    textContent: '',
    notes: []
  };
  
  WrapperView = Platform.select({
    ios: KeyboardAvoidingView,
    android: View
  });

  onChangeTextTitle = (textTitle) => {
    this.setState({textTitle});
  }

  onChangeTextContent = (textContent) => {
    this.setState({textContent});
  }

  // onSaveButtonPress = () => {
  //   const newNotes = [...this.state.notes];
  //   const note = {
  //     key: uuid(),
  //     title: this.state.textTitle,
  //     content: this.state.textContent
  //   };
  //   newNotes.push(note);

  //   const newState = {
  //     textTitle: '',
  //     textContent: '',
  //     notes: newNotes
  //   };
  //   this.setState(newState);

  //   AsyncStorage.setItem(notesKey, JSON.stringify(newNotes));
    
  // }

  onSave = async () => {
    const newNotes = [...this.state.notes];
    const note = {
      key: uuid(),
      title: this.state.textTitle,
      content: this.state.textContent
    };
    newNotes.push(note);

    const newState = {
      textTitle: '',
      textContent: '',
      notes: newNotes
    };
    this.setState(newState);
    await AsyncStorage.setItem(notesKey, JSON.stringify(newNotes));
  }

  onShowAboutUs = () => {
    this.props.navigation.navigate('About');
  }

  onDeleteButtonPress = (item) => async () => {
    const filteredNotes = this.state.notes.filter((note) => note !== item);
    this.setState({notes: filteredNotes});
    await AsyncStorage.setItem(notesKey, JSON.stringify(filteredNotes));
  }

  onLoad = async () => {
    const value = await AsyncStorage.getItem(notesKey);
    let notes;
    if (value) {
      notes = JSON.parse(value);
    } else {
      notes = [];
    }
    this.setState({
      notes
    });
  }

  componentDidMount () {
    this.onLoad();
  }

  render () {
    return (
      <this.WrapperView
        style={[styles.container]}
        behavior='padding'>
        <Title
          text={this.state.textTitle}
          onChangeTextTitle={this.onChangeTextTitle}/>
        <Content
          style={styles.fill}
          text={this.state.textContent}
          onChangeTextContent={this.onChangeTextContent}/>
        <Footer
          textContentLength={this.state.textContent.length}
          onSaveButtonPress={this.onSaveButtonPress}
        />
        {
          this.state.notes.length > 0 ? <NoteList data={this.state.notes} onDeleteButtonPress={this.onDeleteButtonPress}/> : null
        }
        <Lower
          onShowAboutUs={this.onShowAboutUs} />
      </this.WrapperView>
    );
  }
}

App.propTypes = {
  navigation: PropTypes.func
};

App.defaultProps = {
  navigation: () => {}
};