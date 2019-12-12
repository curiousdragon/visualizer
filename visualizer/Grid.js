import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Line, Circle, Rect } from 'react-native-svg';

const xAxisFactor = 0.85;
const yAxisFactor = 0.25;
const scale = 1;
const xLinesNum = scale * 10;
const gridLineOpacity = 0.1;

export default class Grid extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			height: this.props.height,
			width: this.props.width
		};
	}

  render() {
		var height = this.state.height
		var width = this.state.width
    return (
      <View style={styles.viewContainer}>
				<Svg height={height} width={width}>
					<AxisX height={height} width={width} />			
					<AxisY height={height} width={width} />
					<GridX height={height} width={width} />
					<GridY height={height} width={width} />
				</Svg>
			</View>
    );
  }
}

class Axis extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			height: this.props.height,
			width: this.props.width,
			x1: "100",
			y1: "100",
			x2: "100",
			y2: "100",
			stroke: "blue",
			strokeWidth: "2",
			strokeOpacity: "0.8",
		};
	}

	setPos(x1, y1, x2, y2) {
		this.state.x1 = x1;
		this.state.y1 = y1;
		this.state.x2 = x2;
		this.state.y2 = y2;
	}

	setPosX(x) {
		this.state.x1 = x;
		this.state.x2 = x;
	}

	setPosY(y) {
		this.state.y1 = y;
		this.state.y2 = y;
	}

	setStrokeOpacity(opacity) {
		this.state.strokeOpacity = opacity;
	}

	render() {
		return (
			<Line 
			x1={this.state.x1} y1={this.state.y1}
			x2={this.state.x2} y2={this.state.y2}
			stroke={this.state.stroke}
			strokeWidth={this.state.strokeWidth}
			strokeOpacity={this.state.strokeOpacity} />
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
			numOfLines: xLinesNum,
		};
	}

	render() {
		return (
			<Svg height={this.state.height} width={this.state.width}>
				{this.generateLines(
					this.state.numOfLines,
					(this.state.height / this.state.numOfLines),
					this.state.height,
					xAxisFactor,
					"X")}
			</Svg>
		);
	}	
}

class GridY extends GridLines {
	constructor(props) {
		super(props);
		this.state={
			height: this.props.height,
			width: this.props.width,
			numOfLines: this.props.width / (this.props.height / xLinesNum),
		};
	}

	render() {
		return (
			<Svg height={this.state.height} width={this.state.width}>
				{this.generateLines(
					this.state.numOfLines,
					(this.state.width / this.state.numOfLines),
					this.state.width,
					yAxisFactor,
					"Y")}
			</Svg>
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

