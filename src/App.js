import React, {PureComponent} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {ThemeProvider} from 'styled-components'
import {Provider} from 'react-redux'
import fetch from 'cross-fetch'
import Config from 'react-native-config'
import SplashScreen from 'react-native-splash-screen'

import {AppLoading} from 'src/components/AppLoading'
import configureStore from 'src/store/configure'
import NavigationService from 'src/utils/NavigationService'
import Navigator from 'src/router/Navigator'
import {theme} from 'src/theme'
import api from 'src/api'

const store = configureStore()

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

class App extends PureComponent {
  /* componentDidMount() {
    NavigationService.navigate('Home')
  } */

  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Navigator
            ref={navigatorRef =>
              NavigationService.setTopLevelNavigator(navigatorRef)
            }
          />
        </ThemeProvider>
      </Provider>
    )
  }
}

class AppWrapper extends PureComponent {
  state = {loading: true, error: false}

  async componentDidMount() {
    try {
      const response = await fetch(Config.MANIFEST_SERVER)

      const {servers} = await response.json()
      api.setUrl(servers[0].url)

      this.setState({loading: false})
    } catch (error) {
      this.setState({error: true, loading: false})
    }

    SplashScreen.hide()
  }

  render() {
    if (this.state.error) {
      return (
        <View style={styles.center}>
          <Text>Error loading server configuration</Text>
        </View>
      )
    }

    return this.state.loading ? <AppLoading /> : <App />
  }
}

export default AppWrapper
