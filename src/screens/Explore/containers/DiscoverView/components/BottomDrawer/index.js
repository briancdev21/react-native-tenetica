import React from 'react'
import styled from 'styled-components'

import DiscoverIcon from '../DiscoverIcon'
import SwipeIcon from '../SwipeIcon'

import StyledText from 'src/components/StyledText'

export default function BottomDrawer () {
  return (
    <>
      <SwipeIconContainer>
        <SwipeIcon />
      </SwipeIconContainer>
      <TitleContainer>
        <DiscoverIcon />
        <Title>Discover</Title>
      </TitleContainer>
    </>
  )
}

const SwipeIconContainer = styled.View`
  margin: 6px 0 14px;
  align-self: center;
`

const TitleContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
`

const Title = styled(StyledText)`
  align-self: center;
  font-size: 17px;
  font-weight: 500;
  letter-spacing: -0.41px;
  color: #FFF;
`
