import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Line, Circle, Rect, Polygon } from 'react-native-svg';

import Axis from './Grid';

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
		var height = this.state.height
		var width = this.state.width
    return (
			<Svg height={height} width={width}>
				<LineArrowHead 
					height={height} weight={weight} 
					origin={origin} head={head} />
			</Svg>
    );
  }
}

class Triangle extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			origin: this.props.origin,
			head: this.props.head,
			triHeight: 15,
			triBase: 20,
			fill: "blue",
			stroke: "blue",
			strokeWidth: "1",
		};
	}

	getPoints() {
		var slope = this.state.origin.
		return "" + points
	}

	render() {
		return (
			<Polygon
				points={getPoints()}
				fill={this.state.fill}
				stroke={this.state.stroke}
				strokeWidth={this.state.strokeWidth} />
		);
	}
}

class LineArrowHead extends Axis {
	constructor(props) {
		super(props);
		this.state={
			height: this.props.height,
			width: this.props.width
			origin: this.props.origin,
			head: this.props.head,
		};
	}

	render() {
		return (
			<Svg height={height} width={width}>
				{super.render()}
				<Triangle origin={this.state.origin} head={this.state.head} />
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


