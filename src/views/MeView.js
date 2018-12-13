'use strict';

import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    Button,
    View,
    Dimensions,
    Image
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'


export default class MeView extends Component {
  static navigationOptions = {
    tabBarLabel: '我的',
    tabBarIcon: ({focused, tintColor}) => {
      if (focused) {
        return (
          <Ionicons name="ios-contact" size={25} color={tintColor}/>
        );
      }
      return (
        <Ionicons name="ios-contact" size={25} color={tintColor} />
      );
    },
  };
  constructor(props){
    super(props)
  }
  render() {
      return(
          <Text>我的</Text>
      )
  }
}

const styles = StyleSheet.create({
    tabBarIcon: {
        width: 24,
        height: 24,
    },
    emptyHintText: {
        fontSize: 18,
        color: '#999999'
    }
});