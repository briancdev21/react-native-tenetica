import React from 'react'
import {Image, TouchableWithoutFeedback} from 'react-native'
import styled from 'styled-components'

export default function NavBarIcon({icon, onPress, active}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Container>
        <IconContainer active={active}>
          <Image source={icon} />
        </IconContainer>
      </Container>
    </TouchableWithoutFeedback>
  )
}

const Container = styled.View`
  height : 48px;
  padding-horizontal: 20px;
  padding-vertical: 12px;
`

const IconContainer = styled.View`
  width: 20px;
  opacity: ${props => (props.active ? 1.0 : 1.0)};
`
