import React from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import { G, Line, Circle, Rect, Polygon } from 'react-native-svg';

import LineVector from './LineVector';

const triangleSide = 15;

export default class Vector extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			height: this.props.height,
			width: this.props.width,
			origin: this.props.origin,
			head: this.props.head,
			color: this.props.color,
		};
	}

  render() {
		var height = this.state.height;
		var width = this.state.width;
    return (
			<G height={height} width={width}>
				<LineArrowHead 
					height={height} width={width} 
					origin={this.state.origin} head={this.state.head} 
					color={this.state.color} />
			</G>
    );
  }
}

class Triangle extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			origin: this.props.origin,
			head: this.props.head,
			triBase: triangleSide,
			triHeight: triangleSide * Math.pow(3, 0.5) / 2,
			fill: this.props.color,
			stroke: this.props.color,
			strokeWidth: "1",
		};
	}

	getPoints() {
		var head = this.state.head;
		var origin = this.state.origin;

		var top_pointX = head.x();
		var top_pointY = head.y();

		var diffX = this.state.triBase / 2;
		var diffY = this.state.triHeight;

		var left_pointX = top_pointX - diffX;
		var left_pointY = top_pointY + diffY;

		var right_pointX = top_pointX + diffX;
		var right_pointY = top_pointY + diffY;

		return ("" + top_pointX + "," + top_pointY + " " + 
			left_pointX + "," + left_pointY + " " +
			right_pointX + "," + right_pointY);
	}

	getRotation() {
		var head = this.state.head;
		var origin = this.state.origin;
		
		var alpha = Math.atan((head.y() - origin.y()) / (head.x() - origin.x()));
		var alpha_degrees = alpha * 180 / Math.PI;
		var rotate = alpha_degrees;

		if (head.x() < origin.x()) {
			rotate -= 90;
		} else {
			rotate += 90;
		}

		return "" + rotate;
	}

	getOrigin() {
		var head = this.state.head;
		var x = head.x();
		var y = head.y();
		return "" + x + ", " + y;
	}

	render() {
		return (
			<G rotation={this.getRotation()} origin={this.getOrigin()}>
				<Polygon
					points={this.getPoints()}
					fill={this.state.fill}
					stroke={this.state.stroke}
					strokeWidth={this.state.strokeWidth} />
			</G>
		);
	}
}

class LineArrowHead extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			x1: this.props.origin.x(), 
			y1: this.props.origin.y(), 
			x2: this.props.head.x(), 
			y2: this.props.head.y(),
			origin: this.props.origin,
			head: this.props.head,
			color: this.props.color,
		};
	}

	render() {
		var height = this.state.height;
		var width = this.state.width;

		return (
			<G height={this.state.height} width={this.state.width}>
				<LineVector x1={this.state.x1} y1={this.state.y1}
					x2={this.state.x2} y2={this.state.y2} 
					color={this.state.color} />
				<Triangle origin={this.state.origin} head={this.state.head} 
					color={this.state.color} />
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


