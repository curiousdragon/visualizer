import React from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import Svg, { G, Line, Circle, Rect } from 'react-native-svg';
import { State,
				PanGestureHandler, 
				TapGestureHandler,
				PinchGestureHandler } from 'react-native-gesture-handler';

import Grid from './Grid';
import Coordinates  from './Coordinates';
import Vector from './Vector';

import TransformGrid from './TransformGrid';
import TransformVector from './TransformVector';
import DefaultGrid from './DefaultTransformGrid';

const xAxisFactor = 0.5;
const yAxisFactor = 0.5;
const scale = 1;
const xLinesNum = scale * 10;

const heightFactor = 1.5;
const widthFactor = 1.5;

const height = Dimensions.get('window').height * heightFactor;
const width = Dimensions.get('window').width * widthFactor;

const vectorColor = "dodgerblue";
const origBasisColor = "gainsboro";
const newBasisColor = "lightsalmon";


export default class Transform extends React.Component {
	constructor(props) {
		super(props);
		var coords = new Coordinates({
			height: {height}, 
			width: {width}, 
			scale: {scale},
			xAxisFactor: {xAxisFactor},
			yAxisFactor: {yAxisFactor}});
		var origin = coords.getOrigin();
		var delta = height / xLinesNum;

		this.state={
			transformedGrid: [],
			vectorCounter: 0,
			newBasisCounter: 0,
			touchPoint: 0,
			coords: new Coordinates({
				height: {height}, 
				width: {width}, 
				scale: {scale},
				xAxisFactor: {xAxisFactor},
				yAxisFactor: {yAxisFactor}}),
			origBasisList:
				[<Vector height={height} width={width} 
						origin={origin}
						head={coords.makePoint({
						x: origin.x() + delta,
						y: origin.y(),
						coord_x: 1,
						coord_y: 0})} 
						color={origBasisColor} 
						key="0" />,
					<Vector height={height} width={width} 
						origin={origin}
						head={coords.makePoint({
						x: origin.x(),
						y: origin.y() - delta,
						coord_x: 0,
						coord_y: 1})} 
						color={origBasisColor} 
						key="1" />],
			newBasisList: [],
			newBasisPoints: [],
			vectorList: 
				[<Vector height={height} width={width} 
					origin={origin}
					head={coords.makePoint({
						x: coords.getOrigin().x() + delta,
						y: coords.getOrigin().y() - delta,
						coord_x: 1,
						coord_y: 1})}
					color={vectorColor} 
					key="0" />],
		};
	}


	_onTap = event => {
		if (event.nativeEvent.state === State.ACTIVE) {
			if (this.state.newBasisCounter == 3) {
				this.setState(state => ({
					transformedGrid: [],
					newBasisCounter: 0,
					newBasisList: [],
					newBasisPoints: [],
				}));
			}	else if (this.state.newBasisCounter == 2) {
				var newGrid = this._transformEvent();

				this.setState(state => ({
					transformedGrid: newGrid,
					newBasisCounter: state.newBasisCounter + 1,
				}));

			} else {
				var point = this.state.coords.makeTouchPoint();
				point.convertTouchToPoint(event.nativeEvent);

				var newBasisVectorList = this.state.newBasisList;
				var newBasisPointsList = this.state.newBasisPoints;

				newBasisPointsList.push(point);
				newBasisVectorList.push(
					<Vector 
						height={height}
						width={width} 
						origin={this.state.coords.getOrigin()}
						head={point} 
						color={newBasisColor}
						key= {"" + (this.state.newBasisCounter + 1)} />);

				this.setState(state => ({
					newBasisCounter: state.newBasisCounter + 1,
					newBasisList: newBasisVectorList,
					newBasisPoints: newBasisPointsList,
				}));
			}
		}
	}

	_transformEvent() {
		var basis1 = this.state.newBasisPoints[0];
		var basis2 = this.state.newBasisPoints[1];
		var origin = this.state.coords.getOrigin();

		var originx = origin.coord_x();
		var originy = origin.coord_y();

		var basis1x = basis1.coord_x();
		var basis1y = basis1.coord_y();
		var basis2x = basis2.coord_x();
		var basis2y = basis2.coord_y();

		var diff1x = basis1x - originx;
		var diff1y = basis1y - originy;
		var diff2x = basis2x - originx;
		var diff2y = basis2y - originy;

		/*
		var newScaleX = diff1x;
		var newScaleY = diff2y;
		*/

		var angleX = 180 * Math.atan(Math.abs(diff1y) / Math.abs(diff1x)) / Math.PI; 
		var angleY = 180 * Math.atan(Math.abs(diff2y) / Math.abs(diff2x)) / Math.PI; 
		console.log("x: " + angleX + ", " + 
								"y: " + angleY);

		if (basis1x > 0 && basis1y > 0) { // first quadrant
			angleX = 0 - angleX;
		} else if (basis1x < 0 && basis1y > 0) { // second quadrant
			angleX = -1 * (180 - angleX);
		} else if (basis1x < 0 && basis1y < 0) { // third quadrant
			angleX = -1 * (180 + angleX);
		} else if (basis1x > 0 && basis1y < 0) { // fourth quadrant
			angleX = angleX;
		}

		if (basis2x > 0 && basis2y > 0) { // first quadrant
			angleY = (90 - angleY);
		} else if (basis2x < 0 && basis2y > 0) { // second quadrant
			angleY = -1 * (90 - angleY);
		} else if (basis2x < 0 && basis2y < 0) { // third quadrant
			angleY = -1 * (90 + angleY);
		} else if (basis2x > 0 && basis2y < 0) { // fourth quadrant
			angleY = (90 + angleY);
		}


		/*
		var newScaleX = diff1x + (diff1y / (diff2y / diff2x * -1));
		var newScaleY = diff2y + (diff2x * (diff1y / diff1x));
		*/

		
		var newScaleX = Math.floor(Math.pow(Math.pow(basis1x - originx, 2) + 
													Math.pow(basis1y - originy, 2), 0.5) * 100) / 100;
		var newScaleY = Math.floor(Math.pow(Math.pow(basis2x - originx, 2) + 
													Math.pow(basis2y - originy, 2), 0.5) * 100) / 100;
		

		var endRotateX = angleX;
		var endRotateY = angleY;
		console.log("x: " + endRotateX + ", " + 
								"y: " + endRotateY);

		/*
		var endRotateX = -1 * Math.abs(Math.floor(180 * Math.atan((originy - basis1y) / 
												(basis1x - originx)) / Math.PI * 100) / 100);
		var endRotateY = 90 - Math.abs(Math.floor(180 * Math.atan((originy - basis2y) / 
												(basis2x - originx)) / Math.PI * 100) / 100);
		*/

		/*
		if (basis1x < 0 && basis1y > 0) {
			endRotateX = -1 * (180 + endRotateX);
		} else if (basis1x < 0 && basis1y < 0) {
			endRotateX = -1 * (270 + (90 - endRotateX)) + 180;
		} else if (basis1x > 0 && basis1y < 0) {
			endRotateX = -1 * endRotateX;
		}

		if (basis2x < 0 && basis2y > 0) {
			endRotateY = endRotateY * -1;
		} else if (basis2x < 0 && basis2y < 0) {
			endRotateY = -1 * (180 - endRotateY);
		} else if (basis2x > 0 && basis2y < 0) {
			endRotateY = 180 - endRotateY;
		}
		*/

		endRotateX = Math.floor((endRotateX % 360) * 100) / 100 + 'deg';		
		endRotateY = Math.floor((endRotateY % 360) * 100) / 100 + 'deg';
		

		var transform =	[];
		transform.push(
			<TransformGrid 
				height={height} width={width} 
				scale={scale} 
				xAxisFactor={xAxisFactor} yAxisFactor={yAxisFactor} 
				newScaleX={newScaleX} newScaleY={newScaleY}
				endRotateX={endRotateX} endRotateY={endRotateY} 
				key="1" />
		);
		return transform;
	}

	_onPan = event => {
		if (event.nativeEvent.state === State.END) {
			var point = this.state.coords.makeTouchPoint();
			point.convertTouchToPoint(event.nativeEvent);

			var newVectorList = this.state.vectorList;
			newVectorList.push(
				<TransformVector 
					height={height}
					width={width} 
					origin={this.state.coords.getOrigin()}
					head={point} 
					color={vectorColor}
					key= {"" + (this.state.vectorCounter + 1)} />);

			this.setState(state => ({
				vectorCounter: state.vectorCounter + 1,
				vectorList: newVectorList,
			}));
		}
	}

	_onLongPress = event => {
		if (event.nativeEvent.state === State.END) {
			this.setState(state => ({
				vectorCounter: 0,
				vectorList: new Array(),
			}));
		}
	}

  render() {
		return (
			<TapGestureHandler 
				onHandlerStateChange={this._onTap}
				numberOfTaps={1}> 
			
			<Animated.View style={styles.viewContainer}>

			<PanGestureHandler
				onHandlerStateChange={this._onPan}
				minDist={30}
				minPointers={1}
				maxPointers={1}>

			<Animated.View style={styles.viewContainer}>

			<PinchGestureHandler
				onHandlerStateChange={this._onLongPress}>

			<Animated.View style={styles.viewContainer}>
				<Animated.View style={styles.viewContainer}>
					<Svg height={height} width={width} >
						{this.state.transformedGrid}			
					</Svg>
				</Animated.View>

				<Rect height={height} width={width} fill="blue" opacity="0.01" />
				
				<Animated.View style={styles.gridContainer}>
					<Svg height={height} width={width}>
						<Grid height={height} width={width} scale={scale} 
							xAxisFactor={xAxisFactor} yAxisFactor={yAxisFactor} />
					</Svg>
				</Animated.View>
				
				<Animated.View style={styles.vectorContainer}>
					<Svg height={height} width={width}>
					<G>
						{this.state.origBasisList}	
					</G>

					<G>
						{this.state.newBasisList}	
					</G>

					<G>
						{this.state.vectorList}	
					</G>
					</Svg>
				</Animated.View>
			</Animated.View>

			</PinchGestureHandler>
			</Animated.View>

			</PanGestureHandler>
			</Animated.View>
			</TapGestureHandler>


		);
  }
}

const styles = StyleSheet.create({
	viewContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
	},

	transformContainer: {
		opacity: 0.8,
		position: 'absolute',
	},

	gridContainer: {
		opacity: 0.5,
		position: 'absolute',
	},

	vectorContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
	},

});
