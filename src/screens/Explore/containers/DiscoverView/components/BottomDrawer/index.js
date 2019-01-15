import React from 'react'
import styled from 'styled-components'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import {TouchableOpacity} from 'react-native'

import StyledText from 'src/components/StyledText'

export default function BottomDrawer ({onClose}) {
  return (
    <>
      <TitleContainer>
        <StyledText style={{fontWeight: '500', fontSize: 18}}>Near me...</StyledText>
        <TouchableOpacity onPress={onClose}>
          <AntDesignIcon name='plus' size={18} color='#000' />
        </TouchableOpacity>
      </TitleContainer>
    </>
  )
}

const TitleContainer = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  font-size: 18px;
  padding: 15px 30px;
  background-color: #fff;
  height: 72px;
`
