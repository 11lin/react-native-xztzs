'use strict';

import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    Button,
    View,
    Dimensions,
    ScrollView,
    Image
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

import { Avatar } from 'react-native-elements';

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
          <View style={styles.container}>
            <ScrollView style={{ flex: 1, marginBottom: 20 }}>
            <Text>我的</Text>
            <Image source={{uri:"https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg"}} width={100} height={100} />
            {/* <Avatar
              width={145}
              height={145}
              source={{
                uri:
                  'https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg',
              }}
              activeOpacity={0.7}
              avatarStyle={{ borderRadius: 145 / 2 }}
              overlayContainerStyle={{ backgroundColor: 'transparent' }}
            /> */}
            </ScrollView>
          </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },  
    tabBarIcon: {
        width: 24,
        height: 24,
    },
    emptyHintText: {
        fontSize: 18,
        color: '#999999'
    }
});