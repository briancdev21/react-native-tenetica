import React, {PureComponent} from 'react'
import {Image} from 'react-native'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export class ProfileFeed extends PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired
  }

  render = () => {
    const {data} = this.props

    return (
      data.map(({id, images}) => (
        <ImageContainer key={id}>
          <Image
            resizeMode='cover'
            style={{height: 240}}
            source={{uri: images[0].url}}
          />
        </ImageContainer>
      ))
    )
  }
}

const ImageContainer = styled.View`
  margin-top: 15px;
  height: 240px;
`
