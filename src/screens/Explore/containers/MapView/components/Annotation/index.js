import React from 'react'
import { Image, TouchableWithoutFeedback } from 'react-native'

import AnnotationIcon from './icons/annotation.png'

export default function Annotation ({ onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Image source={AnnotationIcon} resizeMode='center' />
    </TouchableWithoutFeedback>
  )
}
