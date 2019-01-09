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
import Entypo from 'react-native-vector-icons/Entypo'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Slider from 'react-native-slider'
import LottieView from 'lottie-react-native'
import LinearGradient from 'react-native-linear-gradient'

import Touchable from './Touchable'
import Text from './Text'
import {Metrics, Icons, Colors} from 'src/theme'
import {moderateScale} from 'src/utils/scaling'
import autobind from 'autobind-decorator'
import Feather from 'react-native-vector-icons/Feather'

const PADDING = 15
const LOTTIE_LOOPS = 8
const LOTTIE_TIME = 11 * 1000
const LOTTIE_STEP = 1 / LOTTIE_LOOPS

const styles = StyleSheet.create({
  bgImageContainer: {
    flex: 1,
    alignItems: 'center',
    height: Metrics.screenWidth + moderateScale(2 * PADDING)
  },
  bgImage: {
    width: '100%',
    height: Metrics.screenWidth - moderateScale(2 * PADDING),
    justifyContent: 'space-between',
    marginTop: moderateScale(PADDING)
  },
  cardTop: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(PADDING),
    height: moderateScale(40 + 2 * PADDING)
  },
  avatarContainer: {
    alignItems: 'center'
  },
  avatar: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    borderWidth: 1,
    borderColor: '#fff'
  },
  textTopContainer: {
    flex: 1,
    paddingLeft: moderateScale(PADDING / 2)
  },
  onlyTextTopContainer: {
    marginLeft: moderateScale(PADDING),
    flex: 1
  },
  actionButton: {
    paddingLeft: moderateScale(PADDING),
    height: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardBottomInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: moderateScale(60),
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: moderateScale(PADDING)
  },
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center'
  },
  comments: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  send: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: moderateScale(30)
  },
  slider: {
    marginHorizontal: 10,
    flex: 1,
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
  },
  countText: {
    fontSize: 12,
    paddingBottom: moderateScale(5)
  },
  leftSpace: {
    marginLeft: moderateScale(10)
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
      <TouchableWithoutFeedback style={styles.bgImageContainer} onPress={this.onPressCard}>
          <ImageBackground
            source={{uri: backgroundUrl}}
          style={styles.bgImage}>
            <View style={styles.cardTop}>
            {
              (author && author.photoUrl) ? <View style={styles.avatarContainer}>
                <Image source={{uri: author.photoUrl}} style={styles.avatar} />
              </View> : null
            }
              }
              {!onlyBussness &&
              <View style={styles.textTopContainer}>
                <Text style={styles.boldText} reverse>
                  {author.fullName}
                </Text>
                <Text reverse small>
                {place || ' '}
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
              <IconIonicon name='ios-bookmark' color='#AEADB1' size={30} />
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
            <View style={styles.leftIconsContainer}>
              <Touchable innerContainerStyle={styles.comments}>
                <Entypo
                  name='heart'
                  color='#AEADB1'
                  size={30}
                />
                <Text style={styles.countText} reverse>
                  {Math.floor(totalSympathy / 1000)}K
                </Text>
              </Touchable>

              <Touchable innerContainerStyle={[styles.comments, styles.leftSpace]}>
                <EvilIcons
                  name='comment'
                  color='#AEADB1'
                  size={30}
                />
                <Text style={styles.countText} reverse>
                  {totalComments}
                </Text>
              </Touchable>
            </View>
            <Slider
              style={styles.slider}
              value={this.state.sliderValue}
              onValueChange={sliderValue =>
                this.setState(() => ({sliderValue}))
              }
            />
            <Touchable innerContainerStyle={styles.comments}>
              <Feather
                name='send'
                color='#AEADB1'
                size={25}
              />
            </Touchable>
                <Touchable innerContainerStyle={styles.send}>
                  <Image
                    style={styles.icon}
                    source={Icons.send}
                  />
                </Touchable>
              </View>
          </ImageBackground>
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
    return 1 + 0.2 * Math.abs(value - 0.5)
  }

  @autobind
  onPressCard() {
    this.props.onPressCard()
  }
}

export default HomeCard
