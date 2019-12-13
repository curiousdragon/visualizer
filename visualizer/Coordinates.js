import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const xAxisFactor = 0.85;
const yAxisFactor = 0.25;
const gridLineOpacity = 0.1;

export default class Coordinates {
	constructor(props) {
		this.state={
			height: this.props.height,
			width: this.props.width,
			scale: this.props.scale,
			xLinesNum: this.props.scale * 10,
			origin: this.findOrigin(this.props.height, this.props.width),
		};
	}

	findOrigin(height, width) {
		origin_y = height * xAxisFactor;
		origin_x = width * yAxisFactor;
		return new Point(origin_x, origin_y, 0, 0)
	}
}


class Point {
	constructor(props) {
		this.state={
			x: this.props.x,
			y: this.props.y,
			coord_x: this.props.coord_x,
			coord_y: this.props.coord_y,
		};
	}

	x() {
		return this.state.x
	}

	y() {
		return this.state.y
	}

	coord_x() {
		return this.state.coord_x
	}

	coord_y() {
		return this.state.coord_y
	}
}

class TouchPoint extends Point {
	constructor(props) {
		this.state={
			x: 0,
			y: 0,
			coord_x: 0,
			coord_y: 0,
			height: this.props.height,
			width: this.props.width,
			delta: this.props.height / this.props.xLinesNum,
			origin: this.props.origin,
		};
	}

	convertXPosition(xPosition) {
		var pos_x = xPosition * this.state.width;
		return pos_x;
	}

	convertYPosition(yPosition) {
		var pos_y = yPosition * this.state.height;
		return pos_y;
	}

	convertX(xPosition) {
		var origin_x = this.state.origin.x();
		var pos_x = convertXPosition(xPosition);
		var diff = pos_x - origin_x;

		var coord_diff = diff / delta;
		return coord_diff;
	}

	convertY(yPosition) {
		var origin_y = this.state.origin.y();
		var pos_y = convertYPosition(yPosition);
		var diff = pos_y - origin_y;

		var coord_diff = diff / delta;
		return coord_diff
	}

	convertTouchToPoint(touchEvent) {
		this.state.x = convertXPosition(touchEvent.absoluteX);
		this.state.y = convertYPosition(touchEvent.absoluteY);
		this.state.coord_x = convertX(touchEvent.absoluteX);
		this.state.coord_y = convertY(touchEvent.absoluteY);
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



