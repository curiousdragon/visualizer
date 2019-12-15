import React from 'react';
import { View, StyleSheet, Dimensions, Animated, Image, Easing } from 'react-native';
import Svg, { G, Line, Circle, Rect } from 'react-native-svg';
import { State,
				PanGestureHandler, 
				TapGestureHandler,
				LongPressGestureHandler,
				RotationGestureHandler,
				FlingGestureHandler,
				PinchGestureHandler } from 'react-native-gesture-handler';

import Grid from './Grid';
import Coordinates  from './Coordinates';
import Vector from './Vector';

import TransformGrid from './TransformGrid';

const xAxisFactor = 0.5;
const yAxisFactor = 0.5;
const scale = 1;
const xLinesNum = scale * 10;


export default class Transform extends React.Component {
	constructor(props) {
		super(props);
	}

  render() {
		var { height, width } = Dimensions.get('window');

		return (
			<Animated.View style={styles.viewContainer}>
				<Svg height={height - 100} width={width - 100}>
					<Rect height={height - 100} width={width - 100} fill="blue" opacity="0.01" />
					<TransformGrid height={height - 100} width={width - 100} scale={scale} 
						xAxisFactor={xAxisFactor} yAxisFactor={yAxisFactor} />
				</Svg>
			</Animated.View>
		);
  }
}

const styles = StyleSheet.create({
	viewContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},

	animatedStyles: {
		width: 100,
		height: 100,
		backgroundColor: 'blue',
		opacity: 0.5,
	},

  inputContainer: {
		flex: 0.1
	}
});
