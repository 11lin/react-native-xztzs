'use strict';

import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    Button,
    View,
    Dimensions,
    TouchableOpacity,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const myIcon = (<Icon name="rocket" size={30} color="#900" />)
export default class TitleButton extends Component{
  constructor(props){
    super(props)
  }
  
render(){
     return(
        <View>
        <TouchableOpacity style={{flex:1}} onPress={()=>alert('add')}>
        {/* <Image resizeMode='contain' style={styles.search} source={require('../images/add_channel_titlbar.png')}/> */}
        <Icon name="search" size={22} color="#900" />
        </TouchableOpacity>
        </View>
     );
   }
}