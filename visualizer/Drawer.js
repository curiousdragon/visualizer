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

const xAxisFactor = 0.5;
const yAxisFactor = 0.5;
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
			scale: {scale},
			xAxisFactor: {xAxisFactor},
			yAxisFactor: {yAxisFactor}});
		var delta = height / xLinesNum;

		this.state={
			vectorCounter: 0,
			touchPoint: 0,
			moveableVec: 
				<Vector height={height} width={width} 
					origin={coords.getOrigin()}
					head={coords.makePoint({
						x: coords.getOrigin().x() + delta,
						y: coords.getOrigin().y() - delta,
						coord_x: 1,
						coord_y: 1})} />,

			coords: new Coordinates({
				height: {height}, 
				width: {width}, 
				scale: {scale},
				xAxisFactor: {xAxisFactor},
				yAxisFactor: {yAxisFactor}}),
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

		this._translateX = new Animated.Value(0);
    this._translateY = new Animated.Value(0);
    this._lastOffset = { x: 0, y: 0 };
		this._onGestureEvent = Animated.event(
      [
        {
          nativeEvent: {
            translationX: this._translateX,
            translationY: this._translateY,
          },
        },
      ],
      { useNativeDriver: true }
    );
  
	}

	_onDoubleTap = event => {
		if (event.nativeEvent.state === State.ACTIVE) {
			var { height, width } = Dimensions.get('window');
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
					key= {"" + (this.state.vectorCounter + 1)} />);

			this.setState(state => ({
				vectorCounter: state.vectorCounter + 1,
				vectorList: newVectorList,
			}));
		}
	}

	_onPan = event => {
		if (event.nativeEvent.state === State.END) {
			console.log("HELLOOOOOO");
			var { height, width } = Dimensions.get('window');
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
					key= {"" + (this.state.vectorCounter + 1)} />);

			this.setState(state => ({
				vectorCounter: state.vectorCounter + 1,
				vectorList: newVectorList,
			}));

		}
	}

	_onPanEvent = event => {
		if (event.nativeEvent.state === State.ACTIVE) {
			console.log("HELLOOOOOO");
			var { height, width } = Dimensions.get('window');
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
					key= {"" + (this.state.vectorCounter + 1)} />);

			this.setState(state => ({
				vectorCounter: state.vectorCounter + 1,
				vectorList: newVectorList,
			}));


			/*
			this.setState(state => ({
				moveableVec: 
					<Vector 
						height={height}
						width={width} 
						origin={this.state.coords.getOrigin()}
						head={point} />,
			}));
			*/
		}
	}

	_onHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this._lastOffset.x += event.nativeEvent.translationX;
      this._lastOffset.y += event.nativeEvent.translationY;
      this._translateX.setOffset(this._lastOffset.x);
      this._translateX.setValue(0);
      this._translateY.setOffset(this._lastOffset.y);
      this._translateY.setValue(0);
    }
  };

  render() {
		var { height, width } = Dimensions.get('window');		
		var origin = this.state.coords.getOrigin();

    return (
			
			<TapGestureHandler 
				onHandlerStateChange={this._onDoubleTap}
				numberOfTaps={2}> 
			
			<Animated.View style={styles.viewContainer}>

			<PanGestureHandler
				onGestureEvent={this._onGestureEvent}
				onHandlerStateChange={this._onHandlerStateChange}
				//onGestureEvent={this._onPanEvent}
				//onHandlerStateChange={this._onPan}
				minDist={10}
				minPointers={1}>
			<Animated.View style={styles.viewContainer}>


				<Svg height={height} width={width} >
					<Rect height={height} width={width} fill="blue" opacity="0.01" />
					<Grid height={height} width={width} scale={scale} 
						xAxisFactor={xAxisFactor} yAxisFactor={yAxisFactor} />

					<G>
					{this.state.vectorList}	
					</G>

			<Animated.View style={[
				styles.animatedStyles,
				{
					transform: [
						{ translateX: this._translateX },
						{ translateY: this._translateY },
					],
				},
			]}>

			<Svg>

				<G>
					{this.state.moveableVec}
				</G>

			</Svg>
			</Animated.View>



					<Vector height={height} width={width} 
						origin={origin}
						head={this.state.coords.makePoint({
						x: origin.x() + height / xLinesNum,
						y: origin.y(),
						coord_x: 1,
						coord_y: 0})} />

				</Svg>
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
		alignItems: 'center'
	},

	animatedStyles: {
		width: 100,
		height: 100,
		alignSelf: 'center',
		backgroundColor: 'blue',
		opacity: 0.5,
	},

  inputContainer: {
		flex: 0.1
	}
});
