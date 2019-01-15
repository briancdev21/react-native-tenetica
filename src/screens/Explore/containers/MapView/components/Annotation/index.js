import React from 'react'
import {Image, TouchableWithoutFeedback} from 'react-native'

import AnnotationIcon from './icons/annotation.png'
import LocationMarker from './icons/location-marker.png'

export default function Annotation ({onPress}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Image source={AnnotationIcon} resizeMode='center' />
    </TouchableWithoutFeedback>
  )
}

export function UserLocationAnnotation () {
  return (
    <TouchableWithoutFeedback>
      <Image source={LocationMarker} resizeMode='center' />
    </TouchableWithoutFeedback>
  )
}
