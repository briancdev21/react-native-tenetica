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

import NavBarIcon from './NavBarIcon'

class TabBarBottom extends Component {
  render() {
    const navBarItem = {
      UserProfile: this.props.activeTab === 'UserProfile' ? ProfileIcon : ProfileOutlineIcon,
      Search: SearchIcon,
      Camera: AddIcon,
      Home: HomeIcon,
      Explore: ExploreIcon
    }

    return (
      <View style={styles.tabBarBottom}>
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
    paddingHorizontal: 10,
    backgroundColor: '#fafafa',
    borderTopColor: '#b2b2b2',
    borderTopWidth: 1,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    ...ifIphoneX({
      paddingBottom: 20
    }, {
      paddingBottom: 0
    })
  }
})
