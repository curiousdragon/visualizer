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

const vectorColor = "blue";
const origBasisColor = "gainsboro";
const newBasisColor = "red";


class Gridder extends TransformGrid {
	constructor(props) {
		super(props);
		this.grid = <TransformGrid height={height} width={width} scale={scale} 
			xAxisFactor={xAxisFactor} yAxisFactor={yAxisFactor} 
			newScaleX={scale} newScaleY={scale} 
			endRotateX={'0deg'} endRotateY={'0deg'} 
			key="0" />;
	}

	getGrid() {
		return this.grid;
	}

	updateEndVals(newScaleX, newScaleY, endRotateX, endRotateY) {
		this.setState(state => ({
			newScaleX: {newScaleX},
			newScaleY: {newScaleY},
			endRotateX: {endRotateX},
			endRotateY: {endRotateY},
		}));

		this.componentDidMount();
	}

}

export default class Transform extends React.Component {
	constructor(props) {
		super(props);
		//console.log(height);
		var coords = new Coordinates({
			height: {height}, 
			width: {width}, 
			scale: {scale},
			xAxisFactor: {xAxisFactor},
			yAxisFactor: {yAxisFactor}});
		var origin = coords.getOrigin()
		var delta = height / xLinesNum;
		//console.log(coords);

		this.state={
			transformedGrid: 
				<DefaultGrid
					height={height} width={width} scale={scale} 
					xAxisFactor={xAxisFactor} yAxisFactor={yAxisFactor} />,
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



	/*
	_onDoubleTap = event => {
		if (event.nativeEvent.state === State.ACTIVE) {
			console.log(event.nativeEvent);
			var point = this.state.coords.makeTouchPoint();
			point.convertTouchToPoint(event.nativeEvent);
			console.log(point);

			var newVectorList = this.state.vectorList;
			newVectorList.push(
				<Vector 
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
	*/

	_onDoubleTap = event => {
		if (event.nativeEvent.state === State.ACTIVE) {
			if (this.state.newBasisCounter == 3) {
				this.setState(state => ({
					transformedGrid: null,
					newBasisCounter: 0,
					newBasisList: [],
					newBasisPoints: [],
				}));
			}	else if (this.state.newBasisCounter == 2) {
				this._transformEvent();

				console.log(this.state.transformedGrid);

				this.setState(state => ({
					newBasisCounter: state.newBasisCounter + 1,
				}));

			} else {
				//console.log(event.nativeEvent);
				var point = this.state.coords.makeTouchPoint();
				point.convertTouchToPoint(event.nativeEvent);
				//console.log(point);

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

		var originx = origin.x();
		var originy = origin.y();

		var basis1x = basis1.x();
		var basis1y = basis1.y();
		var basis2x = basis2.x();
		var basis2y = basis2.y();

		var newScaleX = Math.floor(Math.pow(Math.pow(basis1x - originx, 2) + 
													Math.pow(basis1y - originy, 2), 0.5) * 100) / 100;
		var newScaleY = Math.floor(Math.pow(Math.pow(basis2x - originx, 2) + 
													Math.pow(basis2y - originy, 2), 0.5) * 100) / 100;

		var endRotateX = (-1 * Math.floor(180 * Math.atan((originy - basis1y) / 
												(basis1x - originx)) / Math.PI * 100) / 100) + 'deg';
		var endRotateY = Math.floor(180 * Math.atan((originy - basis2y) / 
												(basis2x - originx)) / Math.PI * 100) / 100;

		console.log(endRotateY);

		console.log("scale");
		console.log(newScaleX);


		if (endRotateX > 0) {
			endRotateX = -90 + endRotateX;
		} else if (endRotateX < 0) {
			endRotateX = (90 + endRotateX);
		}
		

		if (endRotateY > 0) {
			endRotateY = 90 - endRotateY;
		} else if (endRotateY < 0) {
			endRotateY = -1 * (90 + endRotateY);
		}

		endRotateY = endRotateY + 'deg';

		console.log("END ROTATE X");
		console.log(endRotateX);
		console.log("END ROTATE Y");
		console.log(endRotateY);

		var transform = [];
		transform.push(
			<Gridder height={height} width={width} scale={scale} 
				xAxisFactor={xAxisFactor} yAxisFactor={yAxisFactor} 
				newScaleX={newScaleX} newScaleY={newScaleY}
				endRotateX={endRotateX} endRotateY={endRotateY} 
				key="1" />);
		
		this.setState(state => ({
			transformedGrid: transform,
		}));	
	}

	_onPan = event => {
		if (event.nativeEvent.state === State.END) {
			//console.log("HELLOOOOOO");
			var point = this.state.coords.makeTouchPoint();
			point.convertTouchToPoint(event.nativeEvent);
			//console.log(point);

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
			console.log("pinch");
			this.setState(state => ({
				vectorCounter: 0,
				vectorList: new Array(),
			}));
		}
	}

  render() {
		return (
			<TapGestureHandler 
				onHandlerStateChange={this._onDoubleTap}
				numberOfTaps={2}> 
			
			<Animated.View style={styles.viewContainer}>

			<PanGestureHandler
				onHandlerStateChange={this._onPan}
				//onGestureEvent={this._onPanEvent}
				//onHandlerStateChange={this._onPan}
				minDist={10}
				minPointers={1}
				maxPointers={1}>

			<Animated.View style={styles.viewContainer}>

			<PinchGestureHandler
				onHandlerStateChange={this._onLongPress}>

			<Animated.View style={styles.viewContainer}>
				<Animated.View style={styles.viewContainer}>
					<Svg height={height} width={width} >
						<Animated.View style={styles.gridContainer}>
						<Svg height={height} width={width}>
						{this.state.transformedGrid}			
						</Svg>
						</Animated.View>
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
