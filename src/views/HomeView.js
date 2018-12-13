'use strict';

import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    Button,
    View,
    Dimensions,
    PixelRatio,
    Image
} from 'react-native';

import TabViewBar from '../component/TabViewBar'
import TitleButton from '../component/TitleButton'
import ScrollableTabView, { DefaultTabBar,ScrollableTabBar} from 'react-native-scrollable-tab-view'
import StorageUtil from '../utils/StorageUtil'
import Toast from '@remobile/react-native-toast';

import Ionicons from 'react-native-vector-icons/Ionicons'


import HomeRecommendView from './HomeRecommendView';

let {width, height} = Dimensions.get('window')

export default class HomeView extends Component {
  static navigationOptions = {
    tabBarLabel: '首页',
    tabBarIcon: ({focused, horizontal, tintColor}) => {
      if (focused) {
        return (
            <Ionicons name="ios-home" size={25} color={tintColor}/>
        );
      }
      return (
            <Ionicons name="ios-home" size={25} color={tintColor}/>
      );
    },
  };    
  constructor(props){
    super(props)
    StorageUtil.set('username', {'username': "要你命3000"});
    Toast.showShortCenter('要你命3000 登录成功');
  }
  render2() {
      return(
        <View style={{
          backgroundColor: "#f3f3f3",
          height: height,
          width:width,
        //   marginTop
        }}>
            <HomeRecommendView/>        
        </View>          
      )
  }
  render() {
    let MAIN_HEIGHT = height;

      return(
        <View style={{
          backgroundColor: "#f3f3f3",
          height: MAIN_HEIGHT,
          width:width,
        //   marginTop
        }}>
            {/* <GoodsList ref="goodsList" minus={this.minusItem.bind(this)} lens={this.state.lens} goods={this.state.goods} onAdd={this.onAdd.bind(this)} headHeight={marginTop} tabLabel="商品"/>
            <Comments headHeight={marginTop} tabLabel="评价(4.1分)"/> */}
          <ScrollableTabView
            ref={(tabView) => {
                this.tabView = tabView;
            }}
            scrollWithoutAnimation={true}
            bounces={true}
            contentProps={{bounces:true}}
            renderTabBar={() => <ScrollableTabBar/>}>
            <HomeRecommendView tabLabel="推荐"/>
            <Button tabLabel='关注' onPress={() => this.tabView.goToPage(0)} title='GO to Tab 1'/>
            <Text tabLabel='资讯'>Tab 2</Text>
            <Text tabLabel='攻略'>Tab 3</Text>
            <Text tabLabel='公会'>Tab 3</Text>
            <Text tabLabel='女神'>Tab 3</Text>
          </ScrollableTabView>
          <TitleButton style={{height:49,position:'absolute',top:0,right:0}}/>
        </View>
      )
  }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    listItemContainer: {
        flexDirection: 'row',
        width: width,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    listItemTextContainer: {
        flexDirection: 'column',
        flex: 1,
        paddingLeft: 15,
    },
    listItemSubContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    listItemTitle: {
        color: '#333333',
        fontSize: 16,
        flex: 1,
    },
    listItemTime: {
        color: '#999999',
        fontSize: 12,
    },
    listItemSubtitle: {
        color: '#999999',
        fontSize: 14,
        marginTop: 3,
        flex: 1,
    },
    redDot: {
        borderRadius: 90,
        width: 18,
        height: 18,
        backgroundColor: '#FF0000',
        justifyContent: 'center',
        alignItems: 'center'
    },
    redDotText: {
        color: '#FFFFFF',
        fontSize: 14,
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