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


const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const AnimatedVec = Animated.createAnimatedComponent(Vector);
const AnimatedG = Animated.createAnimatedComponent(G);

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

class SvgRoot extends React.Component {
	/*
	constructor(props) {
		super(props);
		var height = Dimensions.get('window').height;
		var width = Dimensions.get('window').width;
		
		this.state={
			coords: new Coordinates({
				height: {height}, 
				width: {width}, 
				scale: {scale},
				xAxisFactor: {xAxisFactor},
				yAxisFactor: {yAxisFactor},})
		};
	}
	*/

	state={
		initAnim: new Animated.Value(0),
	}

  componentDidMount() {
    Animated.timing(
      // Animate over time
      this.state.initAnim,
      {
				toValue: 200,
        duration: 3000,
        useNativeDriver: false,
      }
    ).start();
  }

  render() {
    const { initAnim } = this.state;
		
		var height = Dimensions.get('window').height;
		var width = Dimensions.get('window').width;
		var delta = height / xLinesNum;
		var coords = new Coordinates({
				height: {height}, 
				width: {width}, 
				scale: {scale},
				xAxisFactor: {xAxisFactor},
				yAxisFactor: {yAxisFactor},});	
		var origin = coords.getOrigin();

		let animateX = initAnim.interpolate({
			inputRange: [0, 200],
			outputRange: ['0','180'],
		});
		console.log("hello");
		console.log(animateX);

		  
				/*
				<Vector
					height={height}
					width={width}
					origin={origin}
					head={coords.makePoint({
						x: 100,
						y: 200,
						coord_x: (100 - origin.x()) / delta ,
						coord_y: (200 - origin.y()) / delta })}
        />
				*/


    return (
			<AnimatedG height={animateX} width={width}>
				<Line x1="120" y1="20" x2="280" y2="100" stroke="#060" />
      			</AnimatedG>
    );
  }
}






export default class Transform extends React.Component {
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
		return (
			<Svg height={this.state.height} width={this.state.width}>
			<RotateLine />
			</Svg>


		/*
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

				<Svg height={height} width={width}>
					<Rect height={height} width={width} fill="blue" opacity="0.01" />
					<Grid height={height} width={width} scale={scale} 
						xAxisFactor={xAxisFactor} yAxisFactor={yAxisFactor} />

					<G>
					{this.state.vectorList}	
					</G>

					<Animated.View style={[
						{
							transform: [
								{ translateX: this._translateX },
								{ translateY: this._translateY },
							],
						},
					]}>
					<Svg height={height} width={width}>
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
			*/
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
