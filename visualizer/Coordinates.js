import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const xAxisFactor = 0.85;
const yAxisFactor = 0.25;
const gridLineOpacity = 0.1;

export default class Coordinates {
	constructor(props) {
		this.state={
			height: props.height.height,
			width: props.width.width,
			scale: props.scale.scale,
			xLinesNum: props.scale.scale * 10,
			origin: this.setOrigin(props.height.height, props.width.width),
		};
	}

	setOrigin(height, width) {
		origin_y = height * xAxisFactor;
		origin_x = width * yAxisFactor;
		return new Point({
			x: origin_x, 
			y: origin_y, 
			coord_x: 0, 
			coord_y: 0})
	}

	getOrigin() {
		return this.state.origin;
	}

	makeTouchPoint() {
		var props = {
			height: this.state.height, 
			width: this.state.width,
			xLinesNum: this.state.xLinesNum,
			origin: this.state.origin
		};
		var point = new TouchPoint(props);
		return new TouchPoint(props);
	}
}


class Point {
	constructor(props) {
		 this.state={
			x: props.x,
			y: props.y,
			coord_x: props.coord_x,
			coord_y: props.coord_y,
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
		super(props);
		this.state={
			x: 0,
			y: 0,
			coord_x: 0,
			coord_y: 0,
			height: props.height,
			width: props.width,
			delta: props.height / props.xLinesNum,
			origin: props.origin,
		};
	}

	convertXPosition(xPosition) {
		var pos_x = xPosition * this.state.width;
		return xPosition;
	}

	convertYPosition(yPosition) {
		var pos_y = yPosition * this.state.height;
		return yPosition;
	}

	convertX(xPosition) {
		var origin_x = this.state.origin.x();
		var pos_x = this.convertXPosition(xPosition);
		var diff = pos_x - origin_x;

		var coord_diff = diff / this.state.delta;
		return coord_diff;
	}

	convertY(yPosition) {
		var origin_y = this.state.origin.y();
		var pos_y = this.convertYPosition(yPosition);
		var diff = pos_y - origin_y;

		var coord_diff = diff / this.state.delta;
		return -1 * coord_diff
	}

	convertTouchToPoint(touchEvent) {
		this.state.x = this.convertXPosition(touchEvent.absoluteX);
		this.state.y = this.convertYPosition(touchEvent.absoluteY);
		this.state.coord_x = this.convertX(touchEvent.absoluteX);
		this.state.coord_y = this.convertY(touchEvent.absoluteY);
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



