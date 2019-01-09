import React from 'react'
import styled from 'styled-components'

import DiscoverGrid from 'src/containers/DiscoverGrid'
import SearchHeader from 'src/screens/Search/SearchHeader'
import CloseButton from 'src/components/Buttons/CloseButton'

import BottomDrawer from '../BottomDrawer'

export default function DiscoverExpandedContent ({ coords, openBusinessSearchModal, openBusinessProfile, onClose }) {
  return (
    <ContentContainer>
      <BottomDrawer />
      <CloseButtonContainer>
        <CloseButton onPress={onClose} />
      </CloseButtonContainer>
      <SearchHeader
        onFocus={openBusinessSearchModal}
        blurOnFocus
        coords={coords}
        containerStyle={{ paddingTop: 0, paddingBottom: 0 }}
      />
      <DiscoverGrid coords={coords} openBusinessProfile={openBusinessProfile} />
    </ContentContainer>
  )
}

const ContentContainer = styled.View`
  flex: 1;
`

const CloseButtonContainer = styled.View`
  position: absolute;
  top: 24px;
  right: 15px;
`
