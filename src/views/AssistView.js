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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default class AssistView extends Component {
  static navigationOptions = {
    tabBarLabel: '辅助',
    tabBarIcon: ({focused, tintColor}) => {
      if (focused) {
        return (
          <MaterialCommunityIcons name="assistant" size={25} color={tintColor}/>
        );
      }
      return (
          <MaterialCommunityIcons name="assistant" size={25} color={tintColor}/>
      );
    },
  };
  constructor(props){
    super(props)
  }
  render() {
      return(
          <Text>辅助</Text>
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