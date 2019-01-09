import {createSwitchNavigator, createAppContainer} from 'react-navigation'

import BasicAppContainer from 'src/containers/BasicApp'
import {AuthLoading} from 'src/containers/Auth/AuthLoading'

import AuthStack from './navigation-stacks/AuthStack'

const Navigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    App: BasicAppContainer,
    Auth: AuthStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
)

export default createAppContainer(Navigator)
