import React, {Component} from 'react'
import {StyleSheet, View} from 'react-native'
import {StackActions} from 'react-navigation'

import ProfileIcon from 'src/components/BottomTabBar/icons/profile.png'
import HomeIcon from 'src/components/BottomTabBar/icons/home.png'
import AddIcon from 'src/components/BottomTabBar/icons/add.png'
import ExploreIcon from 'src/components/BottomTabBar/icons/explore.png'
import SearchIcon from 'src/components/BottomTabBar/icons/search.png'
import ProfileOutlineIcon from 'src/components/BottomTabBar/icons/profile_outline.png'
import {ifIphoneX} from '../../utils/isIphoneX'
import LinearGradient from 'react-native-linear-gradient'

import NavBarIcon from './NavBarIcon'

class TabBarBottom extends Component {
  render() {
    const navBarItem = {
      Home: HomeIcon,
      Search: SearchIcon,
      Camera: AddIcon,
      UserProfile: this.props.activeTab === 'UserProfile' ? ProfileIcon : ProfileOutlineIcon,
      Explore: ExploreIcon
    }

    return (
      <View style={styles.tabBarBottom}>
        <LinearGradient colors={['#F4F4F4', '#E7E7E7', '#BABAB8']} style={styles.linearGradient} />
        {this.getNavIcons(navBarItem)}
      </View>
    )
  }

  getNavIcons = (navBarItem) => {
    const navIcons = Object.keys(navBarItem).map((nav, index) => {
      return this.getIconComponent(nav, navBarItem[nav], () => this.navigateTo(nav))
    })
    return navIcons
  }

  _handleTabPress = (key, index) => {
    const {jumpTo, navigation} = this.props
    const currentIndex = navigation.state.index

    if (currentIndex === index) {
      let childRoute = navigation.state.routes[index]
      if (childRoute.hasOwnProperty('index') && childRoute.index > 0) {
        navigation.dispatch(StackActions.popToTop({key: childRoute.key}))
      }
    } else {
      jumpTo(key)
    }
  }

  navigateTo = routeName => {
    const {navigation} = this.props
    if (routeName === 'Explore') {
      this.props.goToExplore()
    } else if (routeName === 'UserProfile') {
      this.props.goToUserProfile()
    } else if (routeName === 'Home') {
      this.props.goToHome()
    } else {
      navigation.navigate(routeName)
    }
  }

  getIconComponent = (key, icon, onPress) => {
    const focused = key === this.props.activeTab

    const props = {
      key,
      icon,
      onPress,
      active: focused
    }
    return <NavBarIcon {...props} />
  }
}

export default TabBarBottom

const styles = StyleSheet.create({
  tabBarBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',

    backgroundColor: '#fafafa',
    borderTopColor: '#b2b2b2',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    ...ifIphoneX({
      paddingBottom: 20
    }, {
      paddingBottom: 0
    })
  },
  linearGradient: {
    flex: 1,
    height: 2,
    width: '100%',
    top: 0,
    position: 'absolute'
  }
})
