import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Line, Circle, Rect } from 'react-native-svg';

const xAxisFactor = 0.85;
const yAxisFactor = 0.25;

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
			strokeOpacity: "1",
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
		super.setPos(width, 0, width, height);
	}
}


class LineX extends AxisX {
	constructor(props) {
		super(props);
		super.setStrokeOpacity("0.2");
		var height = this.props.height * 0.85;
		var width = this.props.width;		
		super.setPos("0", height, width, height);
		super.setPosY(this.props.y);
	}
}

class GridX extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			height: this.props.height,
			width: this.props.width,
		};
	}

	generateLines(numOfLines) {
		var lines = [];
		var delta_y = 50;
		for (let i=0; i < numOfLines; i++) {
			var offset = "" + this.state.height + delta_y * i
			lines.push([ i, offset ]);
			console.warn(offset)
		}
		return lines;
	}



	generate(numOfLines) {
		var lines = [];
		var delta_y = this.state.height / numOfLines;

		var initial = this.state.height * xAxisFactor;
		var difference = this.state.height - initial;

		if (difference >= delta_y) {
			initial = initial + delta_y * (Math.floor(difference / delta_y) );
		} 

		for (let i=0; i < numOfLines; i++) {
			var offset = "" + initial - delta_y * (i)
			lines.push(
			<LineX 
				height={this.state.height}
				width={this.state.width}
				y={offset} key={i}/>);
		}
		return lines;
	}


	render() {
		return (
			<Svg height={this.state.height} width={this.state.width}>
				{this.generate(10)}
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

