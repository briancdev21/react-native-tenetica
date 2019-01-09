import {createStackNavigator} from 'react-navigation'

import {UserLogin} from '../../containers/Auth/Login'
import {UserRegister} from '../../containers/Auth/Register'

import defaultStackNavigatorConfig from '../config'

const AuthStack = createStackNavigator(
  {
    SignIn: UserLogin,
    SignUp: UserRegister
  },
  {
    ...defaultStackNavigatorConfig
  }
)

export default AuthStack
