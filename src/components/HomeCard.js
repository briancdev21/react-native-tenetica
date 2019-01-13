// @flow
import React, {PureComponent} from 'react'
import {
  View,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Easing
} from 'react-native'
import IconIonicon from 'react-native-vector-icons/Ionicons'
import Slider from 'react-native-slider'
import LottieView from 'lottie-react-native'
import LinearGradient from 'react-native-linear-gradient'

import Touchable from './Touchable'
import Text from './Text'
import {Metrics, Icons, Colors} from 'src/theme'
import {moderateScale} from 'src/utils/scaling'
import autobind from 'autobind-decorator'

const PADDING = 15
const LOTTIE_LOOPS = 8
const LOTTIE_TIME = 11 * 1000
const LOTTIE_STEP = 1 // LOTTIE_LOOPS
const MAX_SCALE = 10 // 10%

const styles = StyleSheet.create({
  bgImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: Metrics.screenWidth + moderateScale(2 * PADDING)
  },
  bgImage: {
    width: Metrics.screenWidth,
    height: Metrics.screenWidth,
    justifyContent: 'space-between'
  },
  bgImageStyle: {
  },
  cardTop: {
    flexDirection: 'row',
    width: Metrics.screenWidth,
    alignItems: 'center',
    height: moderateScale(40 + 2 * PADDING)
  },
  avatarContainer: {
    width: moderateScale(40 + 2 * PADDING),
    alignItems: 'center'
  },
  avatar: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(40),
    borderWidth: 1,
    borderColor: '#fff'
  },
  textTopContainer: {
    flex: 1
  },
  onlyTextTopContainer: {
    marginLeft: moderateScale(PADDING),
    flex: 1
  },
  actionButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: moderateScale(60)
  },
  cardBottomInner: {
    width: Metrics.screenWidth - moderateScale(2 * PADDING),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  comments: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: moderateScale(60)
  },
  send: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: moderateScale(30)
  },
  slider: {
    width: Metrics.screenWidth / 2,
    height: moderateScale(60),
    justifyContent: 'center'
  },
  track: {
    position: 'absolute',
    width: '100%',
    height: 9,
    alignSelf: 'center'
  },
  thumb: {
    width: 34,
    height: 34,
    backgroundColor: 'transparent'
  },
  boldText: {
    fontWeight: '700'
  },
  lottieContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  lottieView: {
    height: Metrics.screenWidth / 2,
    alignSelf: 'center',
    marginBottom: -moderateScale(40)
  },
  icon: {
    width: 25,
    height: 25,
    tintColor: Colors.white
  }
})

class HomeCard extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      sliderValue: 0.6,
      lottieProgress: new Animated.Value(0.6),
      lottieScale: this.calculateScaleFromSlider(0.6)
    }
    this.onSliderChanged = this.onSliderChanged.bind(this)
  }

  render() {
    const {
      backgroundUrl,
      author,
      totalSympathy,
      totalComments,
      place,
      onlyBussness
    } = this.props
    const transform = [{
      scale: this.state.lottieScale
    }]

    return (
      <TouchableWithoutFeedback onPress={this.props.onPressCard}>
        <View style={styles.bgImageContainer}>
          <ImageBackground
            source={{uri: backgroundUrl}}
            style={styles.bgImage}
            imageStyle={styles.bgImageStyle}
          >
            <View style={styles.cardTop}>
              {!onlyBussness &&
              <View style={styles.avatarContainer}>
                <Image source={{uri: author.photoUrl}} style={styles.avatar} />
              </View>
              }
              {!onlyBussness &&
              <View style={styles.textTopContainer}>
                <Text style={styles.boldText} reverse>
                  {author.fullName}
                </Text>
                <Text reverse small>
                  {place}
                </Text>
              </View>
              }
              {onlyBussness &&
              <View style={styles.onlyTextTopContainer}>
                <Text style={styles.boldText} reverse>
                  {place}
                </Text>
              </View>
              }
              <Touchable
                onPress={() => {}}
                innerContainerStyle={styles.actionButton}
              >
                <IconIonicon name='ios-bookmark' color='#FFFFFF' size={30} />
              </Touchable>
            </View>
            <View style={styles.lottieContainer}>
              <LottieView style={{...styles.lottieView, transform: transform}}
                source={require('../assets/lotties/emoji.json')}
                loop={false}
                progress={this.state.lottieProgress}
              />
            </View>

            <LinearGradient
              style={styles.cardBottom}
              start={{x: 0, y: 1}}
              end={{x: 0, y: 0}}
              colors={['#000000E4', '#00000000']}>
              <View
                style={styles.cardBottomInner}>
                <View
                  style={styles.slider}>
                  <Image
                    style={styles.track}
                    resizeMode={'stretch'}
                    source={Icons.slider_track}
                  />
                  <Slider
                    style={{width: '100%', height: '100%'}}
                    value={this.state.sliderValue}
                    onValueChange={this.onSliderChanged}
                    thumbImage={Icons.slider_thumb}
                    thumbStyle={styles.thumb}
                    maximumTrackTintColor={'transparent'}
                    minimumTrackTintColor={'transparent'}
                  />
                </View>

                <Image
                  style={styles.icon}
                  source={Icons.like}
                />

                <Text style={styles.boldText} reverse>
                  {Math.floor(totalSympathy / 1000)}K
                </Text>

                <Touchable innerContainerStyle={styles.comments}>
                  <Image
                    style={styles.icon}
                    source={Icons.comment}
                  />
                  <Text style={styles.boldText} reverse>
                    {totalComments}
                  </Text>
                </Touchable>
                <Touchable innerContainerStyle={styles.send}>
                  <Image
                    style={styles.icon}
                    source={Icons.send}
                  />
                </Touchable>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  onSliderChanged(value) {
    var stage = Math.floor(value * LOTTIE_LOOPS)
    stage = Math.min(stage, LOTTIE_LOOPS - 1)
    console.log(stage * LOTTIE_STEP)
    this.setState({
      sliderValue: value,
      lottieProgress: new Animated.Value(stage * LOTTIE_STEP),
      lottieScale: this.calculateScaleFromSlider(value)
    }, () => {
      Animated.timing(this.state.lottieProgress, {
        toValue: LOTTIE_STEP * (stage + 1),
        duration: LOTTIE_TIME / LOTTIE_LOOPS,
        easing: Easing.linear
      }).start()
    })
  }

  calculateScaleFromSlider(value) {
    // max scale of emojis
    return 1 + Math.abs(value - 0.5) * MAX_SCALE / 50
  }

  @autobind
  onPressCard() {
    this.props.onPressCard()
  }
}

export default HomeCard
