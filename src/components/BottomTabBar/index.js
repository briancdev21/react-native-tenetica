import React, {Component} from 'react'
import {StyleSheet} from 'react-native'
import {StackActions, SafeAreaView} from 'react-navigation'
// import styled from 'styled-components'

import ProfileIcon from 'src/components/BottomTabBar/icons/profile_outline.png'
import ProfileFilledIcon from 'src/components/BottomTabBar/icons/profile_filled.png'
import HomeIcon from 'src/components/BottomTabBar/icons/home_outline.png'
import HomeFilledIcon from 'src/components/BottomTabBar/icons/home_filled.png'
import AddIcon from 'src/components/BottomTabBar/icons/add_outline.png'
// import AddFilledIcon from 'src/components/BottomTabBar/icons/add_filled.png'
import ExploreIcon from 'src/components/BottomTabBar/icons/location_outline.png'
import ExploreFilledIcon from 'src/components/BottomTabBar/icons/location_filled.png'
import SearchIcon from 'src/components/BottomTabBar/icons/search_outline.png'
// import SearchFilledIcon from 'src/components/BottomTabBar/icons/search_filled.png'

import NavBarIcon from './NavBarIcon'

const navbarIconsArray = [
  HomeIcon,
  ProfileIcon,
  ExploreIcon
  // ProfileOutlineIcon
]

const navbarIconsFilledArray = [
  HomeFilledIcon,
  ProfileFilledIcon,
  ExploreFilledIcon
  // ProfileOutlineIcon
]

const styles = StyleSheet.create({
  tabBarBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#fafafa',
    borderTopColor: '#b2b2b2',
    borderTopWidth: 1
  }
})

class TabBarBottom extends Component {
  render() {
    return (
      <SafeAreaView style={styles.tabBarBottom}>
        {this.getNavIcons()}
      </SafeAreaView>
    )
  }

  getIcon = (route, index) => {
    const {navigation} = this.props
    const focused = index === navigation.state.index
    // let newIndex = index
    // if (index === 0 && !focused) newIndex = 3
    const props = {
      key: route.key,
      icon: focused ? navbarIconsFilledArray[index] : navbarIconsArray[index],
      active: focused,
      onPress: () => this._handleTabPress(route.key, index)
    }

    return <NavBarIcon {...props} />
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
    navigation.navigate(routeName)
  }

  getIconComponent = (key, icon, onPress) => (
    <NavBarIcon key={key} icon={icon} onPress={onPress} />
  )

  getNavIcons = () => {
    const {
      navigation: {
        state: {routes}
      }
    } = this.props
    const navIcons = routes.map(this.getIcon)
    navIcons.splice(
      1,
      0,
      this.getIconComponent('add', AddIcon, () => this.navigateTo('Camera'))
    )
    navIcons.splice(
      1,
      0,
      this.getIconComponent('search', SearchIcon, () =>
        this.navigateTo('Search')
      )
    )

    return navIcons
  }
}

export default TabBarBottom
