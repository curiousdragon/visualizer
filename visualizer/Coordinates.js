import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const xAxisFactor = 0.85;
const yAxisFactor = 0.25;
const scale = 1;
const xLinesNum = scale * 10;
const gridLineOpacity = 0.1;

export default class CoordSys {
	constructor(props) {
		super(props);
		this.state={
			height: this.props.height,
			width: this.props.width,
			origin: this.props.origin,
		};
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



