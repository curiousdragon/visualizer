import React from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import Svg, { Line } from 'react-native-svg';

class RotateLine extends React.Component {
	constructor(props) {
		super(props);
		this.animation = new Animated.Value(0);
	}

  componentDidMount() {
    Animated.loop(
      Animated.timing(this.animation, {toValue: 1, duration: 2000})
    ).start();
  };
	
	render() {
		var height = Dimensions.get('window').height;
		var width = Dimensions.get('window').width;

		const rotation = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });

    return (
      <Animated.View
        style={{transform: [{rotate: rotation}] }}>
			<Svg height={height} width={width}>
				<Line x1="100" y1="350" x2="300" y2="500" stroke="blue" />
			</Svg>
      </Animated.View>
    );
	}

}

export default class RotatingLine extends React.Component {
  render() {
		return (
			<Svg height={this.state.height} width={this.state.width}>
				<RotateLine />
			</Svg>
		);
  }
}
