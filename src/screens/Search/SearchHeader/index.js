import React from 'react'
import {BlurView} from 'react-native-blur'
import {
  Platform,
  View,
  SafeAreaView
} from 'react-native'
import {connect} from 'react-redux'
import {withNavigation, NavigationActions} from 'react-navigation'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {businessSearchValueSelector, businessSearchLoadingStatusSelector} from '../selectors'

import BackButton from 'src/components/Buttons/BackButton'
import TextInput from 'src/components/inputs/TextInput'

import {
  updateSearchValue
} from '../actions'
import {theme} from 'src/theme'

const isIos = Platform.OS === 'ios'

const mapStateToProps = state => ({
  searchValue: businessSearchValueSelector(state),
  searching: businessSearchLoadingStatusSelector(state)
})

const mapDispatchToProps = {
  updateSearchValue
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class SearchHeader extends React.Component {
  static propTypes = {
    updateSearchValue: PropTypes.func.isRequired,
    withBack: PropTypes.bool,
    withBlur: PropTypes.bool,
    inversed: PropTypes.bool,
    isFocused: PropTypes.bool,
    searchValue: PropTypes.string,
    onBackPress: PropTypes.func,
    containerStyle: PropTypes.any,
    onFocus: PropTypes.func,
    blurOnFocus: PropTypes.bool,
    searching: PropTypes.bool,
    editable: PropTypes.bool
  }
  static defaultProps = {
    withBack: false,
    withBlur: false,
    inversed: false,
    isFocused: false,
    searchValue: '',
    onFocus: () => {},
    blurOnFocus: false,
    editable: true
  }

  // shouldComponentUpdate (nextProps) {
  //   if (nextProps.searchValue !== this.props.searchValue || nextProps.isFocused !== this.props.isFocused) {
  //     return true
  //   }
  //
  //   return false
  // }

  onSearchTextChange = (newValue) => {
    const {updateSearchValue} = this.props

    updateSearchValue(newValue)
  }

  onBackPress = () => {
    const {navigation, onBackPress, updateSearchValue} = this.props
    updateSearchValue('')
    if (onBackPress) {
      return onBackPress()
    }

    navigation.dispatch(NavigationActions.back())
  }

  render () {
    const {
      withBack,
      withBlur,
      inversed,
      searchValue,
      containerStyle,
      blurOnFocus,
      onFocus,
      isFocused,
      searching,
      editable
    } = this.props

    return (
      <View>
        {withBlur && isIos && (
          <BlurViewContainer
            blurAmount={5}
            blurType='light'
          />
        )}
        <Container withBlur={withBlur} inversed={inversed} style={containerStyle}>
          <NavButtonsContainer>
            {withBack && (
              <BackButton isWhite={!inversed} onPress={this.onBackPress} containerStyle={{padding: 10}} />
            )}
            {editable ? <SearchBarContainer>
              <TextInput
                style={{
                  paddingRight: 35
                }}
                isFocused={isFocused}
                blurOnFocus={blurOnFocus}
                onFocus={onFocus}
                placeholder='Search'
                inversed={inversed}
                value={searchValue}
                onChangeText={this.onSearchTextChange}
              />

              {searching && <Loader />}

            </SearchBarContainer> : <SearchBarButton
              onPress={onFocus}
            >
              <DisabledTextInput>
                Search
              </DisabledTextInput>
            </SearchBarButton>
            }
          </NavButtonsContainer>
        </Container>
      </View>
    )
  }
}

const BlurViewContainer = styled(BlurView)`
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
`

const Container = styled.View`
  flex-direction: column;
  justify-content: space-between;
  padding: 15px 15px 15px 0;
  background-color: ${props => props.withBlur ? 'rgba(22, 24, 35, 0.35)' : 'transparent'};
`

const NavButtonsContainer = styled(SafeAreaView)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
`

const SearchBarContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  position: relative
`

const SearchBarButton = styled.TouchableWithoutFeedback`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  position: relative
`

const DisabledTextInput = styled.Text`
  height: 44px;
  flex: 1;
  background-color: ${props =>
    !props.inversed ? 'rgba(255, 255, 255, 0.25)' : '#F2F2F2'};
  border-radius: 20px;
  padding-vertical: 10px;
  padding-horizontal: 20px;
  font-size: 17px;
  font-weight: 700;
  font-family: ${theme.fonts.ProximaNova};
  color: 'rgba(255, 255, 255, 0.6)';
`

const Loader = styled.ActivityIndicator`
  position: absolute;
  top: -8px;
  right: 0;
  padding: 20px;
`

export default withNavigation(SearchHeader)
