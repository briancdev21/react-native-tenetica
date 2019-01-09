import React from 'react'
import {Easing, Animated} from 'react-native'

import {
  createStackNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation'
import BottomTabBar from 'src/components/BottomTabBar'
import defaultStackNavigatorConfig from 'src/router/config'

import HomeStack from './HomeStack'
import ExploreStack from './ExploreStack'
import UserProfileStack from './UserProfileStack'
import SearchStack from './SearchStack'
import CameraStack from './CameraStack'
import fade from '../../utils/fade-transition'

const BasicNavigationStack = createMaterialTopTabNavigator(
  {
    Home: HomeStack,
    UserProfile: UserProfileStack,
    Explore: ExploreStack
  },
  {
    ...defaultStackNavigatorConfig,
    animationEnabled: true,
    swipeEnabled: true,
    tabBarComponent: props => <BottomTabBar {...props} />,
    tabBarPosition: 'bottom',
    initialRouteName: 'Home'
  }
)

const RootStack = createStackNavigator(
  {
    Main: BasicNavigationStack,
    Search: SearchStack,
    Camera: CameraStack
  },
  {
    mode: 'modal',
    headerMode: 'none',
    initialRouteName: 'Main',
    transitionConfig: () => ({
      containerStyle: {
        backgroundColor: '#FFF'
      },
      transitionSpec: {
        duration: 550,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
        useNativeDriver: true
      },
      screenInterpolator: (sceneProps) => {
        const {position, layout, scene} = sceneProps

        const {routeName} = scene.route
        if (['Search'].includes(routeName)) return fade(sceneProps)

        const thisSceneIndex = scene.index
        const height = layout.initHeight

        const translateY = position.interpolate({
          inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
          outputRange: [height, 0, 0]
        })
        return {transform: [{translateY}]}
      }
    })
  }
)

export default RootStack
