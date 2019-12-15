import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import Svg, { Rect } from 'react-native-svg';

const { width, height } = Dimensions.get('window');
const AnimatedRect = Animated.createAnimatedComponent(Rect);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

class SvgRoot extends Component {
  state = {
    initAnim: new Animated.Value(0),
  };

  componentDidMount() {
    Animated.timing(
      // Animate over time
      this.state.initAnim,
      {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }
    ).start();
  }

  render() {
    const { initAnim } = this.state;
    let animateWidth = initAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0', '80'],
    });
    return (
      <AnimatedSvg width={width} height={height} viewBox="0 0 100 100">
        <AnimatedRect
          y="10"
          x="10"
          height="80"
          width={animateWidth}
        />
      </AnimatedSvg>
    );
  }
}

export default class Example extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SvgRoot />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ecf0f1',
  },
});
