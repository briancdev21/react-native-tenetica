import React from 'react'
import {Alert} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

import api from 'src/api'
import {AuthForm} from 'src/components/Auth'
import {extractErrorMessage, log} from 'src/utils/fn'

export class UserRegister extends React.PureComponent {
  state = {
    isLoading: false,
    requireCode: false
  }

  render() {
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps='always'>
        <AuthForm
          formText='Sign up'
          footNote={{
            text: 'Have an account already?',
            actionText: 'Sign in',
            actionRef: 'SignIn'
          }}
          onSubmit={this.handleFormOnSubmit}
          requireCode={this.state.requireCode}
          isLoading={this.state.isLoading}
        />
      </KeyboardAwareScrollView>
    )
  }

  handleFormOnSubmit = async (
    {email, password, phone, code, isCode},
    formType
  ) => {
    const {navigation} = this.props

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
      const response = await api.create({
        route: `register`,
        data: {
          email,
          password
        }
      })

      this.setState({isLoading: false})

      if (!response.errors) {
        Alert.alert(
          'Your account has been created successfully. You can now sign in!'
        )
        navigation.navigate('SignIn')
      } else {
        // TODO: treat error
        _alertError(response)
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
