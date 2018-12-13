"use strict";

import React from "react";
import { connect } from "react-redux";

import StyleSheet from "../common/HelperStyleSheet";
import HelperColors from "../common/HelperColors";
import HelperFonts from "../common/HelperFonts";

import {
  PixelRatio,
  Platform,
  View,
  Text,
  Image,
  StatusBar
} from "react-native";

import TabNavigator from "react-native-tab-navigator";

/* constants
============================================================================= */

const SCHEDULE_ICONS = {
  day1: {
    default: require("../../img/tab-icon/1/default.png"),
    active: require("../../img/tab-icon/1/active.png")
  },
  day2: {
    default: require("../../img/tab-icon/2/default.png"),
    active: require("../../img/tab-icon/2/active.png")
  }
};

const BADGE_SIZE = 14,
  BADGE_PADDING_H = 3,
  UPDATE_LOOP_MINUTES = 1,
  UPDATE_LOOP_DURATION = UPDATE_LOOP_MINUTES * 60 * 1000; // convert ms;

let scheduleIcon = SCHEDULE_ICONS.day1.default; // day 1 and fallback
let scheduleIconSelected = SCHEDULE_ICONS.day1.active; // day 1 and fallback

/* =============================================================================
< TabsNavView / >
--------------------------------------------------------------------------------
Props:
  coming soon

============================================================================= */
class TabsNavView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      now: props.presetDate
        ? currentTimeOnConferenceDay(props.presetDate)
        : new Date().getTime(),
      selectedTab:"Home",
    };
  }

  render() {
    return (
      <TabNavigator tabBarStyle={styles.tabBar}>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'home'}
          title="Home"
          renderIcon={_ => this.renderTabIcon(scheduleIcon)}
          renderSelectedIcon={_ => this.renderTabIcon(scheduleIconSelected)}
          badgeText="1"
          onPress={() => this.setState({ selectedTab: 'home' })}>
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'profile'}
          title="profile"
          renderIcon={_ => this.renderTabIcon(scheduleIcon)}
          renderSelectedIcon={_ => this.renderTabIcon(scheduleIconSelected)}
          badgeText="22"
          onPress={() => this.setState({ selectedTab: 'profile' })}>
        </TabNavigator.Item>
      </TabNavigator>
    );
  }

  renderTabIcon(src) {
    return (
      <View style={styles.iconWrapper}>
        <Image style={styles.tabIcon} source={src} />
      </View>
    );
  }
}

class TabBadge extends React.Component {
  render() {
    if (!this.props.value) {
      return null;
    }
    const len = String(this.props.value).length;
    let sizing;
    if (len > 1) {
      sizing = styles.badgeFlexible;
    } else {
      sizing = styles.badgeFixed;
    }

    return (
      <View style={[styles.badge, sizing]}>
        <Text style={styles.badgeText}>{this.props.value}</Text>
      </View>
    );
  }
}

/* StyleSheet
============================================================================= */

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 1 / PixelRatio.get(),
    borderTopColor: HelperColors.magnesium,
    backgroundColor: HelperColors.lightBackground,
  },
  tabTitle: {
    backgroundColor: "transparent",
    // fontFamily: OC3Fonts.regular,
    fontSize: 10,
    color: HelperColors.colorWithAlpha("sapphire", 0.65)
  },
  tabTitleActive: {
    color: HelperColors.sapphire
  },
  badge: {
    position: "absolute",
    right: -5,
    top: 2,
    backgroundColor: HelperColors.pink,
    // borderWidth:1,
    // borderColor: HelperColors.pink,
    borderRadius: BADGE_SIZE / 2,
    height: BADGE_SIZE,
    alignItems: "center",
    justifyContent: "center"
  },
  badgeFixed: {
    width: BADGE_SIZE
  },
  badgeFlexible: {
    paddingHorizontal: BADGE_PADDING_H
  },
  badgeText: {
    backgroundColor: "transparent",
    fontSize: 9,
    fontFamily: HelperFonts.fontWithWeight(HelperFonts.basis, "helveticaBold"),
    color: HelperColors.white,

    ios: {
      lineHeight: 10
    }
  },

  // icons ===================

  iconWrapper: {
    width: 28,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    bottom: -3
    // backgroundColor:'rgba(0,0,0,1)',
    // ios: { bottom: -3 },
    // android: { bottom: -4 },
  },

  tabIcon: {
    // backgroundColor:'rgba(255,255,0,1)',
  }
});

// /* Selectors
// ============================================================================= */

// function select(store) {
//   return {
//     tab: store.navigation.tab,
//     day: store.navigation.day,
//     presetDate: store.testEventDates,
//     notificationsBadge: unseenNotificationsCount(store)
//   };
// }

// function actions(dispatch) {
//   return {
//     onTabSelect: tab => dispatch(switchTab(tab))
//   };
// }

// /* Export
// ============================================================================= */
// module.exports = connect(select, actions)(TabsNavView);

module.exports = TabsNavView
