/**
 * @format
 * @flow
 */

import React, {Component} from 'react'
import {Animated, View, StyleSheet, Platform} from 'react-native'
import PropTypes from 'prop-types'
// import {HeaderBackButton, SafeAreaView} from 'react-navigation'

import Text from 'src/components/Text'
import AnimatedBackground from 'src/components/Profile/AnimatedBackground'
import ScrollableTabBar from './ScrollableTabBar'
import ScrollableTabView from './ScrollableTabView'

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pageTop: {
    flex: 1
  },
  pageBottom: {
    flex: 1
  },
  welcome: {
    paddingTop: 40,
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: 5
  },
  tabBarStyle: {
    marginRight: 20
  }
})

const routes = [
  {
    key: 'profile',
    title: 'Profile'
  },
  {
    key: 'stats',
    title: 'Stats'
  },
  {
    key: 'info',
    title: 'Info'
  },
  {
    key: 'nostra',
    title: 'Nostra'
  },
  {
    key: 'more-info',
    title: 'More info'
  }
]
export default class ProfileTabView extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.routes) {
      return {
        ...prevState,
        routes: nextProps.routes
      }
    }

    return null
  }

  static propTypes = {
    withBackButton: PropTypes.bool
  }
  static defaultProps = {
    withBackButton: false
  }
  constructor(props) {
    super(props)

    this.state = {
      tabIndex: 0,
      routes: [],
      index: 0,
      scrollValue: new Animated.Value(0)
    }

    this.scrollableTabView = React.createRef()
    this.renderScene = this.renderScene.bind(this)
  }
  render() {
    const {backgroundImage} = this.props

    return (
      <View style={{flex: 1}}>
        <ScrollableTabView
          ref={this.scrollableTabView}
          initialPage={0}
          renderTabBar={() => <ScrollableTabBar style={styles.tabBarStyle} />}
          withBackButton={this.props.withBackButton}
          renderAnimatedBackground={() => (
            <AnimatedBackground backgroundImage={backgroundImage} />
          )}
        >
          {routes.map(route => (
            <View tabLabel={route.title} key={route.key}>
              {this.renderScene(route)}
            </View>
          ))}
        </ScrollableTabView>
      </View>
    )
  }

  renderScene({key, title}) {
    return (
      <View style={styles.page}>
        <View style={styles.pageTop} />
        <View style={styles.pageBottom}>
          <Text style={styles.welcome}>Screen {title}</Text>
          <Text style={styles.instructions}>To get started, edit App.js</Text>
          <Text style={styles.instructions}>
            {Platform.select({
              ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
              android:
                'Double tap R on your keyboard to reload,\n' +
                'Shake or press menu button for dev menu'
            })}
          </Text>
        </View>
      </View>
    )
  }
}
