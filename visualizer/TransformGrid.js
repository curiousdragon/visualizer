import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Svg, { G, Line } from 'react-native-svg';

import Axis from './Axis';

const gridLineOpacity = 0.1;

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
			newScale: this.props.newScale,
		};

		this.rotateX = new Animated.Value(0);
		this.rotateY = new Animated.Value(0);
	}

	componentDidMount() {
		Animated.parallel([
			//Animated.loop(
				Animated.timing(this.rotateX, {toValue: 1, duration: 3000}),
			//),

			//Animated.loop(
				Animated.timing(this.rotateY, {toValue: 1, duration: 3000}),
			//),
			
		]).start();
		
	}


  render() {
		var height = this.state.height;
		var width = this.state.width;
		var scale = this.state.scale;
		var xAF = this.state.xAxisFactor;
		var yAF = this.state.yAxisFactor;
		var newScale = this.state.newScale;

		const rotationX = this.rotateX.interpolate({
			inputRange: [0, 1],
			outputRange: ['0deg', '-5deg'],
		});

		const rotationY = this.rotateY.interpolate({
			inputRange: [0, 1],
			outputRange: ['0deg', '10deg'],
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
						newScale={newScale} />
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
						newScale={newScale} />
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
	}
}

class AxisY extends Axis {
	constructor(props) {
		super(props);
		var height = this.state.height;
		var width = this.state.width * this.props.yAxisFactor;
		super.setPos(width, "0", width, height);
	}
}

class LineX extends AxisX {
	constructor(props) {
		super(props);
		super.setStrokeOpacity(gridLineOpacity);
		super.setPosY(this.props.offset);
	}
}

class LineY extends AxisY {
	constructor(props) {
		super(props);
		super.setStrokeOpacity(gridLineOpacity);
		super.setPosX(this.props.offset);
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
		//Animated.loop(
			Animated.timing(this.anim, {toValue: 1, duration: 3000}).start();
		//).start();
	}
	

	render() {
		console.log(this.state.endVal);
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

	generateLines(numOfLines, delta, total, axisFactor, newDelta, type) {
		var numOfLines = numOfLines;
		var lines = [];
		var initial = total * axisFactor;
		var diff = total - initial;
		var dDelta = newDelta - delta;


		console.log("total?");
		console.log(total);
		console.log("INITIAL??");
		console.log(initial);

		if (diff >= delta) {
			initial += delta * Math.floor(diff / delta);
		}

		if (type == "X") {
			for (let i = 0; i <= numOfLines; i++) {
				var offset = "" + initial - delta * i;
				var endVal = (i - Math.floor(diff / delta)) * dDelta;

				console.log("is this endVal? see below");
				console.log(endVal);

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
			for (let i = 0; i <= numOfLines; i++) {
				var offset = "" + initial - delta * i;
				console.log("OFFSET?");
				console.log(offset);
				var endVal = (i - Math.floor(diff / delta)) * dDelta;
				
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
			console.log(lines);
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
			newNumOfLines: this.props.newScale * 10,
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
					(this.state.height / this.state.newNumOfLines),
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
			numOfLines: this.props.width / (this.props.height / (this.props.scale * 10)),
			yAxisFactor: this.props.yAxisFactor,
			newNumOfLines: this.props.width / (this.props.height / (this.props.newScale * 10)),
		};
	}

	render() {
		return (
			<G height={this.state.height} width={this.state.width}>
				{this.generateLines(
					this.state.numOfLines,
					(this.state.width / this.state.numOfLines),
					this.state.width,
					this.state.yAxisFactor,
					(this.state.width / this.state.newNumOfLines),
					"Y")}
			</G>
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

  inputContainer: {
		flex: 0.1
	}
});

