import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { G, Line, Circle, Rect } from 'react-native-svg';

import Axis from './Axis';

const xAxisFactor = 0.85;
const yAxisFactor = 0.25;
const gridLineOpacity = 0.1;

export default class Grid extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			height: this.props.height,
			width: this.props.width,
			scale: this.props.scale,
			xLinesNum: this.props.scale * 10,
		};
	}

  render() {
		var height = this.state.height;
		var width = this.state.width;
		var scale = this.state.scale;
    return (
			<G height={height} width={width}>
				<AxisX height={height} width={width} scale={scale} />			
				<AxisY height={height} width={width} scale={scale} />
				<GridX height={height} width={width} scale={scale} />
				<GridY height={height} width={width} scale={scale} />
			</G>
    );
	}
}


class AxisX extends Axis {
	constructor(props) {
		super(props);
		var height = this.state.height * xAxisFactor;
		var width = this.state.width;
		super.setPos("0", height, width, height);
	}
}

class AxisY extends Axis {
	constructor(props) {
		super(props);
		var height = this.state.height;
		var width = this.state.width * yAxisFactor;
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
		};
	}

	render() {
		if (this.state.type == "X") {
			return (
				<LineX 
					height={this.state.height}
					width={this.state.width}
					offset={this.state.offset} />
			);
		} else if (this.state.type == "Y") {
			return (
				<LineY
					height={this.state.height}
					width={this.state.width}
					offset={this.state.offset} />
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

	generateLines(numOfLines, delta, total, axisFactor, type) {
		var lines = [];
		var initial = total * axisFactor;
		var diff = total - initial;		

		if (diff >= delta) {
			initial += delta * Math.floor(diff / delta);
		}

		for (let i=0; i < numOfLines; i++) {
			var offset = "" + initial - delta * i
			lines.push(
				<LineOffset
					height={this.state.height}
					width={this.state.width}
					offset={offset}
					type={type}
					key={i} />
			);
		}
		return lines;
	}
}

class GridX extends GridLines {
	constructor(props) {
		super(props);
		this.state={
			height: this.props.height,
			width: this.props.width,
			numOfLines: this.props.scale * 10,
		};
	}

	render() {
		return (
			<G height={this.state.height} width={this.state.width}>
				{this.generateLines(
					this.state.numOfLines,
					(this.state.height / this.state.numOfLines),
					this.state.height,
					xAxisFactor,
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
		};
	}

	render() {
		return (
			<G height={this.state.height} width={this.state.width}>
				{this.generateLines(
					this.state.numOfLines,
					(this.state.width / this.state.numOfLines),
					this.state.width,
					yAxisFactor,
					"Y")}
			</G>
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

