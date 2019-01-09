import React from 'react'
import {ImageBackground} from 'react-native'
import {withNavigation} from 'react-navigation'
import styled from 'styled-components'

import {theme} from 'src/theme'

import StyledText from 'src/components/StyledText'
import AttributeIcon from './AttributeIcon'

import ParkingIcon from './AttributeIcon/icons/parking.png'
import DogIcon from './AttributeIcon/icons/dog.png'
import CrippleIcon from './AttributeIcon/icons/cripple.png'

class BusinessCard extends React.Component {
  render() {
    const {name, cover_photo_url: coverPhotoUrl, style} = this.props

    let coverPhoto = ''

    if (coverPhotoUrl) {
      coverPhoto = coverPhotoUrl
    }

    return (
      <Container style={style} onPress={this.onPress}>
        <CoverContainer>
          {!!coverPhoto && <BusinessCover source={{uri: coverPhoto}} />}
        </CoverContainer>

        <InfoContainer>
          <Title numberOfLines={2}>{name}</Title>

          <AttributesContainer>
            <AttributeIcon icon={ParkingIcon} />
            <AttributeIcon icon={DogIcon} />
            <AttributeIcon icon={CrippleIcon} />
          </AttributesContainer>
        </InfoContainer>
      </Container>
    )
  }

  onPress = () => {
    const {navigation, id: placeId} = this.props
    navigation.navigate('BusinessProfile', {placeId})
  }
}

// //
const Container = styled.TouchableOpacity`
  flex-direction: row;
  border-radius: 24px;
`

const CoverContainer = styled.View`
  width: 88px;
  height: 88px;
  border-radius: 19px;
  overflow: hidden;
`

const BusinessCover = styled(ImageBackground)`
  width: 100%;
  height: 100%;
`

const InfoContainer = styled.View`
  flex: 1;
  margin-left: ${theme.spacing.regular};
  justify-content: space-between;
  padding: 2px;
`

const Title = styled(StyledText)`
  color: ${theme.colors.darkBlue};
  font-size: ${theme.fontSize.regular};
  font-weight: ${theme.fontWeight.bold};
`

const AttributesContainer = styled.View`
  flex-direction: row;
`

export default withNavigation(BusinessCard)
