import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Svg, { G, Line } from 'react-native-svg';

import Axis from './Axis';

const gridLineOpacity = 0.2;
const strokeColor = "royalblue";

export default class TransformGrid extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			height: this.props.height,
			width: this.props.width,
			scale: this.props.scale,
			xLinesNum: this.props.scale * 10,
			xAxisFactor: this.props.xAxisFactor,
			yAxisFactor: this.props.yAxisFactor,
			newScaleX: this.props.newScaleX,
			newScaleY: this.props.newScaleY,
			endRotateX: this.props.endRotateX,
			endRotateY: this.props.endRotateY,
		};

		this.rotateX = new Animated.Value(0);
		this.rotateY = new Animated.Value(0);
	}

	componentDidMount() {
		Animated.parallel([
			Animated.timing(this.rotateX, {toValue: 1, duration: 3000, useNativeDriver: true}),
			Animated.timing(this.rotateY, {toValue: 1, duration: 3000, useNativeDriver: true}),
		]).start();
	}

  render() {
		var height = this.state.height;
		var width = this.state.width;
		var scale = this.state.scale;
		var xAF = this.state.xAxisFactor;
		var yAF = this.state.yAxisFactor;
		var newScaleX = this.state.newScaleX;
		var newScaleY = this.state.newScaleY;

		const rotationX = this.rotateX.interpolate({
			inputRange: [0, 1],
			outputRange: ['0deg', this.state.endRotateX],
		});

		const rotationY = this.rotateY.interpolate({
			inputRange: [0, 1],
			outputRange: ['0deg', this.state.endRotateY],
		});

    return (
			<G height={height} width={width}>
				<Animated.View
					style={[
						styles.viewContainer,
						{transform: [{rotate: rotationX}] }]}>
				<Svg height={height} width={width}>
					<AxisX height={height} width={width} scale={scale} 
						xAxisFactor={xAF} yAxisFactor={yAF} />
					<GridX height={height} width={width} scale={scale}
						xAxisFactor={xAF} yAxisFactor={yAF} 
						newScaleX={newScaleX} newScaleY={newScaleY} />
				</Svg>
				</Animated.View>

				<Animated.View
					style={[
						styles.viewContainer,
						{transform: [{rotate: rotationY}] }]}>
				<Svg height={height} width={width}>
					<AxisY height={height} width={width} scale={scale} 
						xAxisFactor={xAF} yAxisFactor={yAF} />
					<GridY height={height} width={width} scale={scale}
						xAxisFactor={xAF} yAxisFactor={yAF} 
						newScaleX={newScaleX} newScaleY={newScaleY} />
				</Svg>
				</Animated.View>
			</G>
    );
	}
}


class AxisX extends Axis {
	constructor(props) {
		super(props);
		var height = this.state.height * this.props.xAxisFactor;
		var width = this.state.width;
		super.setPos("0", height, width, height);
		super.setStroke(strokeColor);		
	}
}

class AxisY extends Axis {
	constructor(props) {
		super(props);
		var height = this.state.height;
		var width = this.state.width * this.props.yAxisFactor;
		super.setPos(width, "0", width, height);
		super.setStroke(strokeColor);		
	}
}

class LineX extends AxisX {
	constructor(props) {
		super(props);
		super.setStrokeOpacity(gridLineOpacity);
		var offset = "" + this.props.offset
		super.setPosY(offset);
	}
}

class LineY extends AxisY {
	constructor(props) {
		super(props);
		super.setStrokeOpacity(gridLineOpacity);
		super.setPosX("" + this.props.offset);		
	}
}

class LineOffset extends Axis {
	constructor(props) {
		super(props);
		this.state={
			height: this.props.height,
			width: this.props.width,
			offset: this.props.offset,
			type: this.props.type,
			endVal: this.props.endVal,
		};
		this.anim = new Animated.Value(0);
	}

	componentDidMount() {
		Animated.timing(this.anim, {toValue: 1, duration: 3000, useNativeDriver: true}).start();
	}

	render() {
		const translate = this.anim.interpolate({
			inputRange: [0, 1],
			outputRange: [0, this.state.endVal],
		});
		
		if (this.state.type == "X") {
			return (
				<Animated.View 
					style={[
						styles.viewContainer,
						{transform: [{translateY: translate}]} ]} >
				<Svg height={this.state.height} width={this.state.width}>
					<LineX 
						height={this.state.height}
						width={this.state.width}
						offset={this.state.offset} />
				</Svg>
				</Animated.View>
			);
		} else if (this.state.type == "Y") {
			return (
				<Animated.View 
					style={[
						styles.viewContainer,
						{transform: [{translateX: translate}]} ]} >
				<Svg height={this.state.height} width={this.state.width}>
					<LineY 
						height={this.state.height}
						width={this.state.width}
						offset={this.state.offset} />
				</Svg>
				</Animated.View>
			);
		}
	}
}

class GridLines extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			height: this.props.height,
			width: this.props.width,
		};
	}

	generateLines(numOfLines, delta, total, axisFactor, newScale, type) {
		var numOfLines = Math.floor(numOfLines / 2);
		var lines = [];
		var initial = total * axisFactor;
		var diff = total - initial;

		if (type == "X") {
			for (let i = -1 * numOfLines; i <= numOfLines; i++) {
				var offset = Math.floor((initial - delta * i) * 10000) / 10000;
				var endVal = (initial - delta * i * newScale);
				endVal = endVal - offset;

				lines.push(
					<LineOffset
						height={this.state.height}
						width={this.state.width}
						offset={offset}
						type={type}
						endVal={endVal}
						key={i} />
				);
			}
			return lines;
		} else if (type == "Y") {
			for (let i = -1 * numOfLines; i <= numOfLines; i++) {
				var offset = Math.floor((initial - delta * i) * 10000) / 10000;
				var endVal = (initial - delta * i * newScale);
				endVal = endVal - offset;

				lines.push(
					<LineOffset
						height={this.state.height}
						width={this.state.width}
						offset={offset}
						type={type}
						endVal={endVal}
						key={i} />
				);
			}
			return lines; 			
		}
	}
}

class GridX extends GridLines {
	constructor(props) {
		super(props);
		this.state={
			height: this.props.height,
			width: this.props.width,
			numOfLines: this.props.scale * 10,
			xAxisFactor: this.props.xAxisFactor,
			newScaleY: this.props.newScaleY,
		};
	}

	render() {
		return (
			<G height={this.state.height} width={this.state.width}>
				{this.generateLines(
					this.state.numOfLines,
					(this.state.height / this.state.numOfLines),
					this.state.height,
					this.state.xAxisFactor,
					this.state.newScaleY,
					"X")}
			</G>
		);
	}	
}

class GridY extends GridLines {
	constructor(props) {
		super(props);
		this.state={
			height: this.props.height,
			width: this.props.width,
			numOfLines: this.props.width / this.props.height * this.props.scale * 10,
			yAxisFactor: this.props.yAxisFactor,
			newScaleX: this.props.newScaleX,
		};
	}

	render() {
		return (
			<G height={this.state.height} width={this.state.width}>
				{this.generateLines(
					this.state.numOfLines,
					Math.floor((this.state.width / this.state.numOfLines) * 100) / 100,
					this.state.width,
					this.state.yAxisFactor,
					this.state.newScaleX,
					"Y")}
			</G>
		);
	}	
}


const styles = StyleSheet.create({
	viewContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
	},

  inputContainer: {
		flex: 0.1
	}
});

