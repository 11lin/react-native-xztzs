'use strict';

import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    Button,
    View,
    Dimensions,
    FlatList,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ItemListView from '../component/ItemList'
import HomeItem from '../component/Item'

export default class HomeRecommendView extends Component{
  constructor(props){
    super(props)
    this.state = {
        listData:[]
    }

    this.state.listData.push({
            user: {
                created_at:Date.now(),
                profile_image_url: "https://facebook.github.io/react-native/docs/assets/favicon.png",
                screen_name: "齐天大圣",
            },
            text: "#放假呆在家里的我和我妈#",
            pic_urls: [{
                thumbnail_pic: "https://wx1.sinaimg.cn/mw690/86b36fb5ly1fxy3oo78vkg207f0dce8c.gif"
            }],
            reposts_count:10, //转发
            comments_count:11, //评论
            attitudes_count:12, //点赞
        },{
            user: {
                created_at:Date.now(),
                profile_image_url: "https://facebook.github.io/react-native/docs/assets/favicon.png",
                screen_name: "齐天大圣",
            },
            text: "#放假呆在家里的我和我妈#",
            pic_urls: [{
                thumbnail_pic: "https://wx1.sinaimg.cn/mw690/994c2e2cly1fxun7hsr2gj20f50cw0u5.jpg"
            }],
            reposts_count:10, //转发
            comments_count:11, //评论
            attitudes_count:12, //点赞
        }, {
            user: {
                created_at: Date.now(),
                profile_image_url: "https://facebook.github.io/react-native/docs/assets/favicon.png",
                screen_name: "齐天大圣",
            },
            text: "#放假呆在家里的我和我妈#",
            pic_urls: [{
                thumbnail_pic: "https://wx1.sinaimg.cn/mw690/994c2e2cly1fxun7hsr2gj20f50cw0u5.jpg"
            }, {
                thumbnail_pic: "http://s1.dwstatic.com/group1/M00/40/E0/9fe0762e22eb30342223fa329a9f318d.gif"
            }],
            reposts_count: 10, //转发
            comments_count: 11, //评论
            attitudes_count: 12, //点赞
        }, {
            user: {
                created_at: Date.now(),
                profile_image_url: "https://facebook.github.io/react-native/docs/assets/favicon.png",
                screen_name: "齐天大圣",
            },
            text: "#放假呆在家里的我和我妈#",
            pic_urls: [{
                thumbnail_pic: "https://wx1.sinaimg.cn/mw690/994c2e2cly1fxun7hsr2gj20f50cw0u5.jpg"
            }, {
                thumbnail_pic: "http://s1.dwstatic.com/group1/M00/40/E0/9fe0762e22eb30342223fa329a9f318d.gif"
            }],
            reposts_count: 10, //转发
            comments_count: 11, //评论
            attitudes_count: 12, //点赞
        }
    )
  }
  renderList(item) {
      return(
        <View>
            <Text>{item.key}</Text>
            <Text>推荐view</Text>
            <Text>Lorem <Icon name="search" color="#4F8EF7" size={22} /> Ipsum</Text>     
            <Image source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}} style={{width: 50, height: 50}}/>
            <Image source={{uri: 'http://s1.dwstatic.com/group1/M00/40/E0/9fe0762e22eb30342223fa329a9f318d.gif'}} style={{width: 250, height: 383}}/>              
            <Image source={{uri: 'http://s1.dwstatic.com/group1/M00/40/E0/9fe0762e22eb30342223fa329a9f318d.gif'}} style={{width: 250, height: 383}}/>
        </View>
      );
  }
  renderListItem() {
    return {
      component: HomeItem,
      args:{
        // showRetweentItemDetail: this._showItemDetail,
        // showItemDetail:this._showItemDetail,
        maxTextLine: 5,
      },
    }
  }
  listRequest() {

  }
  render() {
      return(
        <View style={styles.root}>
        <ItemListView data={this.state.listData} item={this.renderListItem()} listRequest={this.listRequest}/>     
        </View>
      )
  }
  
}

const styles = StyleSheet.create({
  root:{
    flex:1
  },
})