import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Line, Circle, Rect } from 'react-native-svg';

export default class Axis extends React.Component {
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



