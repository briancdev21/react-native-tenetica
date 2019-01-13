import React, {Component} from 'react'
import {
  Platform,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  View
} from 'react-native'
import styled from 'styled-components'

const isIOS = Platform.os === 'ios'

export default class PullUpContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      collapsed: true
    }
    this.panResponder = null
    this.top = SWIPE_HEIGHT
    this.height = SWIPE_HEIGHT
    this.customStyle = {
      style: {
        bottom: 0,
        top: this.top,
        height: this.height
      }
    }
    this.checkCollapsed = true

    this.viewRef = React.createRef()
  }

  componentWillMount () {
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: this.onPanResponderMove,
      onPanResponderRelease: this.onPanResponderRelease
    })
  }

  render () {
    const {itemCollapsed, itemExpanded} = this.props
    const {collapsed} = this.state

    return (
      <Container ref={this.viewRef}>
        <PanContainer {...this.panResponder.panHandlers} />

        {collapsed ? (
          <View style={{height: SWIPE_HEIGHT}} pointerEvents='none'>
            {itemCollapsed}
          </View>
        ) : (
          itemExpanded
        )}
      </Container>
    )
  }

  updateNativeProps () {
    LayoutAnimation.easeInEaseOut()
    this.viewRef.current.setNativeProps(this.customStyle)
  }

  onPanResponderMove = (event, {dy}) => {
    if (dy > 0 && !this.checkCollapsed) {
      // SWIPE DOWN

      this.customStyle.style.top = this.top + dy
      this.customStyle.style.height = DEVICE_HEIGHT - dy

      !this.state.collapsed && this.setState({collapsed: true})
      this.updateNativeProps()
    } else if (this.checkCollapsed && dy < -60) {
      // SWIPE UP
      this.top = 0
      this.customStyle.style.top = DEVICE_HEIGHT + dy
      this.customStyle.style.height = -dy + SWIPE_HEIGHT

      this.updateNativeProps()
      this.state.collapsed && this.setState({collapsed: false})
    }
  }

  onPanResponderRelease = (event, {dy}) => {
    if (dy < -100 || dy < 100) {
      this.showExpanded()
    } else {
      this.showCollapsed()
    }
  }

  showExpanded = () => {
    this.customStyle.style.top = 0
    this.customStyle.style.height = DEVICE_HEIGHT

    this.updateNativeProps()

    const {collapsed} = this.state
    collapsed && this.setState({collapsed: false})
    this.checkCollapsed = false
  }

  showCollapsed = () => {
    this.customStyle.style.top = isIOS ? DEVICE_HEIGHT - SWIPE_HEIGHT : DEVICE_HEIGHT - SWIPE_HEIGHT - 20
    this.customStyle.style.height = SWIPE_HEIGHT

    this.updateNativeProps()

    const {collapsed} = this.state
    !collapsed && this.setState({collapsed: true})
    this.checkCollapsed = true
  }
}

const MARGIN_TOP = 40
const DEVICE_HEIGHT = Dimensions.get('window').height - MARGIN_TOP
const SWIPE_HEIGHT = 72

const Container = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  margin-top: ${MARGIN_TOP};
  height: ${SWIPE_HEIGHT};
  z-index: 999;
`

const PanContainer = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.01);
`
