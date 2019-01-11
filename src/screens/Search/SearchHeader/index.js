import React from 'react'
import {BlurView} from 'react-native-blur'
import {
  Platform,
  View,
  Image,
  SafeAreaView,
  StyleSheet
} from 'react-native'
import {connect} from 'react-redux'
import {withNavigation, NavigationActions} from 'react-navigation'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {businessSearchValueSelector, businessSearchLoadingStatusSelector} from '../selectors'

import BackButton from 'src/components/Buttons/BackButton'
import TextInput from 'src/components/inputs/TextInput'
import SearchIcon from './icons/search.png'
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
              <BackButton isWhite={false} onPress={this.onBackPress} containerStyle={styles.backButtonStyle} />
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
              <DisabledTextInput style={styles.disabledTextContainer}>
                <Image style={{width: 19, height: 19}} source={SearchIcon} />
                &nbsp;&nbsp;Search...
              </DisabledTextInput>
            </SearchBarButton>
            }
          </NavButtonsContainer>
        </Container>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  backButtonStyle: {
    height: 35,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    marginHorizontal: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20
  },
  disabledTextContainer: {
    borderRadius: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20
  }
})

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
  background-color: transparent;
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
  flex: 1;
  background-color: #fff;
  padding-vertical: 14px;
  padding-horizontal: 15px;
  margin-right: 5px;
  font-size: 18px;
  font-weight: 300;
  font-family: ${theme.fonts.ProximaNova};
  color: #202020;
`

const Loader = styled.ActivityIndicator`
  position: absolute;
  top: -8px;
  right: 0;
  padding: 20px;
`

export default withNavigation(SearchHeader)
