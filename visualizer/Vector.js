import React from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import { G, Line, Circle, Rect, Polygon } from 'react-native-svg';

import LineVector from './LineVector';

const xAxisFactor = 0.85;
const yAxisFactor = 0.25;
const scale = 1;
const xLinesNum = scale * 10;
const gridLineOpacity = 0.1;

export default class Vector extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			height: this.props.height,
			width: this.props.width,
			origin: this.props.origin,
			head: this.props.head,
		};
	}

  render() {
		var height = this.state.height;
		var width = this.state.width;
    return (
			<G height={height} width={width}>
				<LineArrowHead 
					height={height} width={width} 
					origin={this.state.origin} head={this.state.head} />
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
			triBase: 15,
			triHeight: 15 * (3^0.5) / 2,
			fill: "blue",
			stroke: "blue",
			strokeWidth: "1",
		};
	}

	getPoints() { // note top - left - right: clockwise
		var head = this.state.head;
		var origin = this.state.origin;

		var alpha = Math.atan((head.y() - origin.y()) / (head.x() - origin.x()));

		// note: sine and cosine takes in radians
		var mid_pointX = head.x() - this.state.triHeight * Math.cos(alpha);
		var mid_pointY = head.y() - this.state.triHeight * Math.sin(alpha);

		var top_pointX = head.x();
		var top_pointY = head.y();

		var diffX = (this.state.triBase / 2) * Math.sin(alpha);
		var diffY = (this.state.triBase / 2) * Math.cos(alpha);

		var left_pointX = mid_pointX - diffX;
		var left_pointY = mid_pointY + diffY;

		var right_pointX = mid_pointX + diffX;
		var right_pointY = mid_pointY - diffY;

		return ("" + top_pointX + "," + top_pointY + " " + 
			left_pointX + "," + left_pointY + " " +
			right_pointX + "," + right_pointY);
	}

	render() {
		return (
			<Polygon
				points={this.getPoints()}
				fill={this.state.fill}
				stroke={this.state.stroke}
				strokeWidth={this.state.strokeWidth} />
		);
	}
}

class LineArrowHead extends React.Component {
	constructor(props) {
		super(props);
		console.log(props.head);
		this.state={
			x1: this.props.origin.x(), 
			y1: this.props.origin.y(), 
			x2: this.props.head.x(), 
			y2: this.props.head.y(),
			origin: this.props.origin,
			head: this.props.head,
		};
	}

	render() {
		var height = this.state.height;
		var width = this.state.width;

		return (
			<G height={this.state.height} width={this.state.width}>
				<LineVector x1={this.state.x1} y1={this.state.y1}
					x2={this.state.x2} y2={this.state.y2} />
				<Triangle origin={this.state.origin} head={this.state.head} />
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


