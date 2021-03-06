import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity
} from "react-native";
type Props = {
  propTypes: {
      goToPage: PropTypes.func,
      activeTab: PropTypes.number,
      tabs: PropTypes.array,
      backgroundColor: PropTypes.string,
      activeTextColor: PropTypes.string,
      inactiveTextColor: PropTypes.string,
      textStyle: Text.propTypes.style,
      tabStyle: PropTypes.style,
      renderTab: PropTypes.func,
      underlineStyle: PropTypes.style,
  }
}
export default class TabViewbar extends Component {
  static propTypes = {
    goToPage: PropTypes.func,
    activeTab: PropTypes.number,
    tabs: PropTypes.array,
    backgroundColor: PropTypes.string,
    activeTextColor: PropTypes.string,
    inactiveTextColor: PropTypes.string,
    textStyle: Text.propTypes.style,
    tabStyle: PropTypes.style,
    renderTab: PropTypes.func,
    underlineStyle: PropTypes.style,
  }
  constructor(props) {
    super(props)
  }

  getDefaultProps() {
    return {
      activeTextColor: '#0398ff',
      inactiveTextColor: '#666',
      backgroundColor: "#fff",
    };
  }

  renderTabOption(name, page) {
  }

  renderTab(name, page, isTabActive, onPressHandler) {
    const { activeTextColor, inactiveTextColor, textStyle, } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';

    return <TouchableOpacity
      style={{flex: 1, }}
      key={name}
      accessible={true}
      accessibilityLabel={name}
      accessibilityTraits='button'
      onPress={() => onPressHandler(page)}
    >
      <View style={[styles.tab, this.props.tabStyle, ]}>
        <Text style={[{color: textColor, fontWeight, fontSize: 13 }, textStyle, ]}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>;
  }

  render() {
    const containerWidth = this.props.containerWidth;
    const numberOfTabs = this.props.tabs.length;
    const tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      bottom: 6,
      justifyContent: "center",
      alignItems: "center"
    };

    const left = this.props.scrollValue.interpolate({
      inputRange: [0, 1, ], outputRange: [0,  containerWidth / numberOfTabs, ],
    });
    return (
      <View style={[styles.tabs, {backgroundColor: this.props.backgroundColor, }, this.props.style, ]}>
        {this.props.tabs.map((name, page) => {
          const isTabActive = this.props.activeTab === page;
          const renderTab = this.props.renderTab || this.renderTab;
          return this.renderTab(name, page, isTabActive, this.props.goToPage);
        })}
        <Animated.View style={[tabUnderlineStyle, { left, }, this.props.underlineStyle, ]} >
          <View style={{height: 2, width: 35, backgroundColor: '#0398ff',}}></View>
        </Animated.View>
      </View>
    );
  }  
}
// const DefaultTabBar = React.createClass({
//   propTypes: {
//     goToPage: PropTypes.func,
//     activeTab: PropTypes.number,
//     tabs: PropTypes.array,
//     backgroundColor: PropTypes.string,
//     activeTextColor: PropTypes.string,
//     inactiveTextColor: PropTypes.string,
//     textStyle: Text.propTypes.style,
//     tabStyle: PropTypes.style,
//     renderTab: PropTypes.func,
//     underlineStyle: PropTypes.style,
//   },

//   getDefaultProps() {
//     return {
//       activeTextColor: '#0398ff',
//       inactiveTextColor: '#666',
//       backgroundColor: "#fff",
//     };
//   },

//   renderTabOption(name, page) {
//   },

//   renderTab(name, page, isTabActive, onPressHandler) {
//     const { activeTextColor, inactiveTextColor, textStyle, } = this.props;
//     const textColor = isTabActive ? activeTextColor : inactiveTextColor;
//     const fontWeight = isTabActive ? 'bold' : 'normal';

//     return <TouchableOpacity
//       style={{flex: 1, }}
//       key={name}
//       accessible={true}
//       accessibilityLabel={name}
//       accessibilityTraits='button'
//       onPress={() => onPressHandler(page)}
//     >
//       <View style={[styles.tab, this.props.tabStyle, ]}>
//         <Text style={[{color: textColor, fontWeight, fontSize: 13 }, textStyle, ]}>
//           {name}
//         </Text>
//       </View>
//     </TouchableOpacity>;
//   },

//   render() {
//     const containerWidth = this.props.containerWidth;
//     const numberOfTabs = this.props.tabs.length;
//     const tabUnderlineStyle = {
//       position: 'absolute',
//       width: containerWidth / numberOfTabs,
//       bottom: 6,
//       justifyContent: "center",
//       alignItems: "center"
//     };

//     const left = this.props.scrollValue.interpolate({
//       inputRange: [0, 1, ], outputRange: [0,  containerWidth / numberOfTabs, ],
//     });
//     return (
//       <View style={[styles.tabs, {backgroundColor: this.props.backgroundColor, }, this.props.style, ]}>
//         {this.props.tabs.map((name, page) => {
//           const isTabActive = this.props.activeTab === page;
//           const renderTab = this.props.renderTab || this.renderTab;
//           return renderTab(name, page, isTabActive, this.props.goToPage);
//         })}
//         <Animated.View style={[tabUnderlineStyle, { left, }, this.props.underlineStyle, ]} >
//           <View style={{height: 2, width: 35, backgroundColor: '#0398ff',}}></View>
//         </Animated.View>
//       </View>
//     );
//   },
// });

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabs: {
    height: 36,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
});

// module.exports = DefaultTabBar;
