'use strict';

import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    Button,
    View,
    Dimensions,
    Image,
    WebView,
    ProgressViewIOS,
    ActivityIndicator
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default class HomeBBSView extends Component {
  constructor(props){
    super(props)

    this.state = {
        loadingProgress: 0,
    }
  }
  componentDidMount() {
      this.time = setInterval(()=>{
          this.setState({loadingProgress:this.state.loadingProgress + 0.05})
      },100);
  }
  render() {
      return(
          <WebView source={{uri:"https://zt.bbs.ztgame.com/forum.php?mod=forumdisplay&fid=2"}} 
          onLoadProgress={e => console.log(e.nativeEvent.progress)}
          renderLoading={this.ActivityIndicatorLoadingView}
          startInLoadingState={true}
          />
      )
  }

    ActivityIndicatorLoadingView() {
        //making a view to show to while loading the webpage
        return (
            <ActivityIndicator
                color="#009688"
                size="large"
                style={styles.ActivityIndicatorStyle}
            />
        );
    }
}


const styles = StyleSheet.create({
    container: {
        marginTop: -20,
        backgroundColor: 'transparent',
    },
    progressView: {
        marginTop: 20,
    },
    tabBarIcon: {
        width: 24,
        height: 24,
    },
    emptyHintText: {
        fontSize: 18,
        color: '#999999'
    },
    ActivityIndicatorStyle: {
        flex: 1,
        justifyContent: 'center',
    },    
});