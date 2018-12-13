import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

import ChatTabView from '../src/tabs/ChatTabView';
import HomeView from '../src/views/HomeView';
// import ChatTabView from '../src/tabs/MyChat';
// import Article from '../src/Article';
// import Order from '../src/Order';
// import Owner from '../src/Owner';

const SCHEDULE_ICONS = {
  day1: {
    default: require("../img/tab-icon/1/default.png"),
    active: require("../img/tab-icon/1/active.png")
  },
  day2: {
    default: require("../img/tab-icon/2/default.png"),
    active: require("../img/tab-icon/2/active.png")
  }
};

const dataSource = [
                    {icon:require('../img/tab-icon/1/default.png'),selectedIcon:require('../img/tab-icon/1/active.png'),tabPage:'Home',tabName:'首页',view:HomeView},
                    {icon:require('../img/tab-icon/1/default.png'),selectedIcon:require('../img/tab-icon/1/active.png'),tabPage:'Article',tabName:'聊天'},
                    {icon:require('../img/tab-icon/1/default.png'),selectedIcon:require('../img/tab-icon/1/active.png'),tabPage:'Order',tabName:'辅助'},
                    {icon:require('../img/tab-icon/my-f8/default.png'),selectedIcon:require('../img/tab-icon/my-f8/active.png'),tabPage:'Owner',tabName:'我的'}
                 ]
var navigation = null;
type Props = {};
export default class App extends Component<Props> {
  constructor(props){
    super(props);
    navigation = this.props.navigation;
    this.state = {
      selectedTab:'Home'
    }
  }

  render() {
    let tabViews = dataSource.map((item,i) => {
      return (
          <TabNavigator.Item 
            title={item.tabName}
            selected={this.state.selectedTab===item.tabPage}
            titleStyle={{color:'black'}}
            selectedTitleStyle={{color:'#7A16BD'}}
            renderIcon={()=><Image style={styles.tabIcon} source={item.icon}/>}
            renderSelectedIcon = {() => <Image style={styles.tabIcon} source={item.selectedIcon}/>}
            tabStyle={{alignSelf:'center'}}
            onPress = {() => {this.setState({selectedTab:item.tabPage})}}
            key={i}
            badgeText={i+1}
            >
            {this.showView(item)}
        </TabNavigator.Item>
      );
    })
    return (
      <View style={styles.container}>
        <TabNavigator
          hidesTabTouch={true}
          >
            {tabViews}
        </TabNavigator>
      </View>
    );
  }

  showView(item) {
    if (item.view) {
      return (
        < item.view / >
      );
    }else{
      return (
        <View>
            <Text>{item.tabPage}</Text>
        </View>
      );
    }
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  tabIcon:{
    width:23,
    height:23,
  }
});