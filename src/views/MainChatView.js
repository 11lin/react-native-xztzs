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
    StatusBar,
    FlatList,
    TouchableHighlight,
    Image
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import HelperColors from '../common/HelperColors'
import UpgradeDialog from './UpgradeDialog'
import CountEmitter from '../event/CountEmitter'
import ConversationUtil from '../utils/ConversationUtil';
import TimeUtil from '../utils/TimeUtil';
import UserInfoUtil from '../utils/UserInfoUtil';
import Utils from '../utils/Utils';


const {width} = Dimensions.get('window');

export default class MainChatView extends Component {
  static navigationOptions = {
    tabBarLabel: '聊天',
    tabBarIcon: ({focused, tintColor}) => {
      if (focused) {
        return (
          <FontAwesome name="wechat" size={25} color={tintColor}/>
        );
      }
      return (
          <FontAwesome name="wechat" size={25} color={tintColor}/>
      );
    },
  };
  constructor(props){
    super(props)
    this.state = {
      username: "要你命3000",
      checkedUpgrade: true,
      recentConversation: [],
      content:"版本1.1"
    };

    // this.state.recentConversation.push({

    // })
      this.loadConversations(this.state.username);
  }
  loadConversations(username) {
    ConversationUtil.getConversations(username, (result) => {
      let count = result.length;
      if (count == 0) {
        // 没有会话，创建两个会话
        this.generateAutoConversation('tulingrobot');
        return;
      }
      let index = 0;
      for (let i = 0; i < count; i++) {
        let conversation = result[i];
        let chatWithUsername = conversation.conversationId.replace(username, '');
        UserInfoUtil.getUserInfo(chatWithUsername, (userInfo) => {
          index++;
          if (userInfo != null) {
            conversation['avatar'] = userInfo.avatar;
            conversation['nick'] = userInfo.nick;
          }
          if (index == count) {
            this.setState({recentConversation: result});
            ConversationUtil.showConversations();
          }
        });
      }
    });
  }  

    // 生成自动回复的对话
  generateAutoConversation(chatUsername) {
    let id = Date.now()
    let message = '你好，我是RNWeChat作者，欢迎使用RNWeChat，有任何问题都可以与我交流！';
    if (chatUsername == 'tulingrobot') {
      message = '我是图灵机器人，开心或者不开心，都可以找我聊天~';
    }

    ConversationUtil.addMessage({
      'conversationId': ConversationUtil.generateConversationId(chatUsername, this.state.username),
      'id': id,
      'from': chatUsername,
      'to': this.state.username,
      'time': TimeUtil.currentTime(),
      'data': message,
      'msgType': 'txt'
    }, ()=>{
      if (chatUsername == 'tulingrobot' && this.state.username != 'yubo666') {
        this.generateAutoConversation('yubo666');
      } else {
        this.loadConversations(this.state.username);
      }
    });
  }
  componentDidMount() {
      let newVersionCode = 1.101;
      let newVersionName = "1.1.1";
      let newVersionDesc = "新征途助手1.1.1面世";
      let downUrl = "";
      let content = "版本号：" + newVersionCode + "\n\n版本名称：" + newVersionName + "\n\n更新说明：" + newVersionDesc;
      this.setState({upgradeContent: content}, () => {
        // 显示更新dialog
        this.refs.upgradeDialog.showModal();
      });

    CountEmitter.addListener('notifyConversationListRefresh', () => {
      // 重新加载会话
      this.loadConversations(this.state.username);
    });      
  }
  componentWillUnmount() {
    this.unregisterListeners();
  }
  unregisterListeners() {
    CountEmitter.removeListener('notifyConversationListRefresh', () => {});
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor='#393A3E'
          barStyle="light-content"
        />
        <View style={styles.divider}></View>
        <View style={styles.content}>
          {
            this.state.recentConversation.length == 0 ? (
              <Text style={styles.emptyHintText}>暂无会话消息</Text>
            ) : (
              <FlatList
                data={this.state.recentConversation}
                renderItem={this.renderItem}
                keyExtractor={this._keyExtractor}
              />
            )
          }
        </View>
        <View style={styles.divider}></View>
        <View style={{backgroundColor: 'transparent', position: 'absolute', left: 0, top: 0, width: width}}>
          <UpgradeDialog ref="upgradeDialog" content={this.state.upgradeContent}/>
        </View>
      </View>
    );
  }
  renderItem = (data) => {
    let lastTime = data.item.lastTime;
    let lastMsg = data.item.messages[data.item.messages.length - 1];
    let contactId = lastMsg.from;
    if (contactId == this.state.username) {
      contactId = lastMsg.to;
    }
    let nick = data.item.nick;
    if (Utils.isEmpty(nick)) {
      nick = contactId;
    }
    let lastMsgContent = '';
    if (lastMsg.msgType == 'txt') {
      lastMsgContent = lastMsg.data;
    } else if (lastMsg.msgType == 'img') {
      lastMsgContent = '[图片]';
    }
    let avatar = require('../../img/wechat/ic_list_icon.png');
    if (data.item.avatar != null) {
      avatar = {uri: data.item.avatar};
    }
    return (
      <View>
        <TouchableHighlight underlayColor={HelperColors.touchableHighlightColor}
                            onPress={() => {
                              this.props.navigation.navigate('Chatting', {
                                'contactId': contactId,
                                'name': nick,
                                'avatar': avatar
                              })
                            }}>
          <View style={styles.listItemContainer}>
            <Image source={avatar} style={{width: 50, height: 50}}/>
            <View style={styles.listItemTextContainer}>
              <View style={styles.listItemSubContainer}>
                <Text numberOfLines={1} style={styles.listItemTitle}>{nick}</Text>
                <Text numberOfLines={1} style={styles.listItemTime}>{TimeUtil.formatChatTime(lastTime)}</Text>
              </View>
              <View style={styles.listItemSubContainer}>
                <Text numberOfLines={1} style={styles.listItemSubtitle}>{lastMsgContent}</Text>
                {
                  data.item.unreadCount > 0 ? (
                    <View style={styles.redDot}>
                      <Text style={styles.redDotText}>{data.item.unreadCount}</Text>
                    </View>
                  ) : ( null )
                }
              </View>
            </View>
          </View>
        </TouchableHighlight>
        <View style={styles.divider}/>
      </View>
    );
  }  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    width: width,
    height: 1 / PixelRatio.get(),
    backgroundColor: HelperColors.dividerColor
  },
  content: {
    flex: 1,
    width: width,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: HelperColors.pageBackgroundColor
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