import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Line, Circle, Rect } from 'react-native-svg';

import Axis from './Axis';

export default class LineVector extends Axis {
	constructor(props) {
		super(props);
		this.state={
			height: this.props.height,
			width: this.props.width,
			x1: this.props.x1,
			y1: this.props.y1,
			x2: this.props.x2,
			y2: this.props.y2,
			stroke: this.props.color,
			strokeWidth: "2",
			strokeOpacity: "0.8",
		};
	}
}




