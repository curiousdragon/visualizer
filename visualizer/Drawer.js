import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { G, Line, Circle, Rect } from 'react-native-svg';
import { State,
				PanGestureHandler, 
				TapGestureHandler,
				RotationGestureHandler,
				FlingGestureHandler,
				PinchGestureHandler } from 'react-native-gesture-handler';

import Grid from './Grid';
import Coordinates, { TouchPoint, Point } from './Coordinates';
import Vector from './Vector';

const xAxisFactor = 0.85;
const yAxisFactor = 0.25;
const scale = 1;
const xLinesNum = scale * 10;


export default class Drawer extends React.Component {
	constructor(props) {
		super(props);
		var height = Dimensions.get('window').height;
		var width = Dimensions.get('window').width;
		var coords = new Coordinates({
				height: {height}, 
				width: {width}, 
				scale: {scale}});
		var delta = height / xLinesNum;

		this.state={
			vectorCounter: 0,
			touchPoint: 0,
			coords: new Coordinates({
				height: {height}, 
				width: {width}, 
				scale: {scale}}),
			vectorList: 
				[<Vector height={height} width={width} 
					origin={coords.getOrigin()}
					head={coords.makePoint({
						x: coords.getOrigin().x() + delta,
						y: coords.getOrigin().y(),
						coord_x: 1,
						coord_y: 0})} 
					key="0" />],
		};
	}
	
	_onDoubleTap = event => {
		if (event.nativeEvent.state === State.ACTIVE) {
			var { height, width } = Dimensions.get('window');
			var point = this.state.coords.makeTouchPoint();
			point.convertTouchToPoint(event.nativeEvent);

			var newVectorList = this.state.vectorList;
			newVectorList.push(
				<Vector 
					height={height}
					width={width} 
					origin={this.state.coords.getOrigin()}
					head={point} 
					key= {"" + (this.state.vectorCounter + 1)} />);

			this.setState(state => ({
				vectorCounter: state.vectorCounter + 1,
				vectorList: newVectorList,
			}));
			console.log(this.state.vectorList);
		}
	}

  render() {
		var { height, width } = Dimensions.get('window');		
		var origin = this.state.coords.getOrigin();

    return (
			<TapGestureHandler 
				onHandlerStateChange={this._onDoubleTap}
				numberOfTaps={2}>
				<View style={styles.viewContainer}>
					<Svg height={height} width={width}>
						<Grid height={height} width={width} scale={scale} />
						<G>
						{this.state.vectorList}	
						</G>

						<Vector height={height} width={width} 
						origin={this.state.coords.getOrigin()}
						head={this.state.coords.makePoint({
						x: this.state.coords.getOrigin().x() + height / xLinesNum,
						y: this.state.coords.getOrigin().y(),
						coord_x: 1,
						coord_y: 0})} />
					</Svg>
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


