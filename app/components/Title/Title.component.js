import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './Title.style';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

class Title extends Component {
  render () {
    return (
      <View style={styles.title}>
        <View style={styles.header}>
          <View style={styles.noteLeft}>
            <Text style={styles.note}>Note Title</Text>
          </View>
          <View style={styles.noteRight}>
            <TouchableOpacity>
              <Text style={styles.bt}>EN</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.boxArea}>
          <TextInput
            style={styles.textArea}
            onChangeText = {this.props.titles}
            underlineColorAndroid = 'transparent'
            value = {this.props.textTitle}
          />
        </View>
      </View>
    );
  }
}
Title.propTypes = {
  titles: PropTypes.func.isRequired,
  textTitle: PropTypes.string.isRequired
};
export default Title;