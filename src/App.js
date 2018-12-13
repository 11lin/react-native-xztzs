import React, {Component} from 'react';
import {
  Platform,
  StyleSheetImage,
  View,
  Button,
  Text
} from 'react-native';
// import NavBar from './src/NavBar';
// import TabsNavView from './src/TabsNavView';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  StackNavigator,
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from 'react-navigation';
import HomeView from './views/HomeView';
import MainChatView from './views/MainChatView';
import AssistView from './views/AssistView';
import MeView from './views/MeView';
import ChattingView from './views/ChattingView';


// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

// const tabNavigatorScreen = TabNavigator({
//   Home: {screen: HomeView},
//   MainChat: {screen: MainChatView},
//   Assist: {screen: AssistView},
//   Me: {screen: MeView}
// }, {
//   tabBarOptions: {
//     activeTintColor: '#45C018',
//     inactiveTintColor: '#999999',
//     showIcon: true,
//     labelStyle: {
//       fontSize: 12,
//       marginTop: 0,
//       marginBottom: 0,
//     },
//     style: {
//       marginBottom: -2,
//       backgroundColor: '#FCFCFC',
//     },
//     tabStyle: {}
//   },
//   tabBarPosition: 'bottom',
// });
// const AppNavigator = StackNavigator({
//   Home:{screen:tabNavigatorScreen}
// })

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}
class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.push('Details')}
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Details: DetailsScreen,
});

// const SettingsStack = createStackNavigator({
//   Settings: SettingsScreen,
//   Profile: ProfileScreen,
// });

// const TabNavigator = createBottomTabNavigator(
//   {
//     Home: HomeStack,
//     Settings: SettingsStack,
//   }
// );



const TabNavigator = createBottomTabNavigator({
  Home: HomeView,
  MainChat: MainChatView,
  Assist: AssistView,
  Me: MeView
});

const AppNavigator = createStackNavigator({
  Home: TabNavigator,
  Chatting: ChattingView,
},{
  initialRouteName: "Home",
  headerMode: 'none', // 此参数设置不渲染顶部的导航条
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer /> ;
  }
}
