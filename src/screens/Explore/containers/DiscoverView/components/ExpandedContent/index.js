import React from 'react'
import styled from 'styled-components'

import DiscoverGrid from 'src/containers/DiscoverGrid'
import SearchHeader from 'src/screens/Search/SearchHeader'

import BottomDrawer from '../BottomDrawer'

export default function DiscoverExpandedContent ({coords, openBusinessSearchModal, openBusinessProfile, onClose}) {
  return (
    <ContentContainer>
      <BottomDrawer onClose={onClose} />
      <SearchHeader
        onFocus={openBusinessSearchModal}
        blurOnFocus
        coords={coords}
        containerStyle={{paddingTop: 0, paddingBottom: 0}}
      />
      <DiscoverGrid coords={coords} openBusinessProfile={openBusinessProfile} />
    </ContentContainer>
  )
}

const ContentContainer = styled.View`
  flex: 1;
  background-color: #fff;
`
