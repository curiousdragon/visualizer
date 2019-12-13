import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Line, Circle, Rect } from 'react-native-svg';
import { State,
				PanGestureHandler, 
				TapGestureHandler,
				RotationGestureHandler,
				FlingGestureHandler,
				PinchGestureHandler } from 'react-native-gesture-handler';

import Grid from './Grid';
import Coordinates, { TouchPoint } from './Coordinates';

const xAxisFactor = 0.85;
const yAxisFactor = 0.25;
const scale = 1;
const xLinesNum = scale * 10;


export default class Drawer extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			touchPoint: 0
		};
	}
	
	_onDoubleTap = event => {
		if (event.nativeEvent.state === State.ACTIVE) {
			var { height, width } = Dimensions.get('window');
			var coords = new Coordinates({
				height: {height}, 
				width: {width}, 
				scale: {scale}});
			console.log(coords);
			var point = coords.makeTouchPoint();
			point.convertTouchToPoint(event.nativeEvent);
			console.log(event.nativeEvent);
			console.log(point);
		}
	}

  render() {
		var { height, width } = Dimensions.get('window');

    return (
			<TapGestureHandler 
				onHandlerStateChange={this._onDoubleTap}
				numberOfTaps={2}>
				<View style={styles.viewContainer}>			
					<Grid height={height} width={width} />
				</View>
			</TapGestureHandler>
		);
  }
}

const styles = StyleSheet.create({
	viewContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},

  inputContainer: {
		flex: 0.1
	}
});


