import React from 'react'
import {connect} from 'react-redux'
import {Alert} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import login from 'src/store/actions/login'
import {AuthForm} from 'src/components/Auth'
import {auth} from 'src/utils/auth'
import {extractErrorMessage, log} from 'src/utils/fn'

@connect(
  null,
  {login}
)
export class UserLogin extends React.PureComponent {
  state = {
    isLoading: false,
    requireCode: false
  }

  render() {
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='always'>
        <AuthForm
          formText='Sign in'
          footNote={{
            text: "Don't have an account?",
            actionText: 'Sign up',
            actionRef: 'SignUp'
          }}
          onSubmit={this.handleFormOnSubmit}
          requireCode={this.state.requireCode}
          isLoading={this.state.isLoading}
        />
      </KeyboardAwareScrollView>
    )
  }

  testAction() {
    Alert.alert('Whoops!', 'Action Triggered')
  }

  handleFormOnSubmit = async (
    {email, password, phone, code, isCode},
    formType
  ) => {
    const {login, navigation} = this.props

    if (formType === AuthForm.FORM_TYPE.SMS) {
      if (isCode) {
        // todo: send received code to server
        return
      }

      this.setState({requireCode: true})
      // todo: send phone number to server
      return
    }

    if (!email || !password) {
      return
    }

    try {
      this.setState({isLoading: true})
      const result = await login({email, password})

      this.setState({isLoading: false})

      if (result && result.response && result.response.token) {
        await auth.setToken(result.response.token)
        navigation.navigate('App')
      } else {
        // todo treat errors
        if (result.error.errors) {
          Alert.alert('Whoops!', result.error.errors.email[0])
        } else if (result.error.exception) {
          Alert.alert(
            'Whoops!',
            "Email doesn't exist. Please create an account"
          )
        } else {
          Alert.alert('Whoops!', 'Password is incorrect. Please try again')
        }
        // _alertError(result)
      }
    } catch (e) {
      _alertError(e)
      this.setState({isLoading: false})
    }
  }
}

// //
function _alertError(errorObject = {}) {
  Alert.alert('Whoops!', extractErrorMessage(errorObject))
  log.error('SERVER ERROR', errorObject)
}
