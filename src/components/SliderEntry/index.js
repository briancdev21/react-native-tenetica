import React, {Component} from 'react'
import {Image} from 'react-native'
import PropTypes from 'prop-types'
import LinearGradient from 'react-native-linear-gradient'
import styled from 'styled-components'

import StyledText from 'src/components/StyledText'

import FakeSlideImage from './image.png'

export default class SliderEntry extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    onPress: PropTypes.func,
    active: PropTypes.bool
  }

  static defaultProps = {
    data: {},
    onPress: () => { },
    active: false
  }

  render () {
    const {data: {name}, active} = this.props

    return (
      <SlideContainer onPress={this.onPress}>
        <Container
          colors={active ? BLUE_GRADIENT : GRAY_GRADIENT}
          style={{shadowOffset: {height: 20}}}
        >
          <ImageContainer>
            <Image style={{borderRadius: 12, overflow: 'hidden'}} source={FakeSlideImage} />
          </ImageContainer>
          <TextContainer>
            <Text>
              {name}
            </Text>
          </TextContainer>
        </Container>
      </SlideContainer>
    )
  }

  onPress = () => {
    const {onPress, data} = this.props

    onPress(data)
  }
}

const SlideContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 1
})`
  padding-left: 15px;
`

const BLUE_GRADIENT = ['#00B6EA', '#22CEE7']
const GRAY_GRADIENT = ['rgba(22, 24, 35, 0.85)', 'rgba(22, 24, 35, 0.85)']

const Container = styled(LinearGradient).attrs({
  start: {x: 0, y: 0},
  end: {x: 1, y: 0}
})`
  flex-direction: row;
  justify-content: center;
  align-content: center;
  height: 100px;
  border-color: #fff;
  border-radius: 16px;
  padding: 5px;
  shadowColor: 'rgba(22, 24, 35, 0.2)';
  shadowOpacity: ${props => props.isGridView ? 0 : 1.0}; 
  shadowRadius: 40;
`

const TextContainer = styled.View`
  flex: 1;
  padding-left: 15px;
  padding-right: 5px;
  align-self: center;
`

const Text = styled(StyledText).attrs({
  numberOfLines: 3
})`
  font-size: 17px;
  letter-spacing: -0.15px;
  font-weight: 700;
  margin: 10px;
  color: #ffffff;
`

const ImageContainer = styled.View`
  width: 88px;
  height: 88px;
  align-items: center;
  justify-content: center;
`
