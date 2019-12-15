import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { G, Line, Circle, Rect } from 'react-native-svg';

import Grid from './Grid';

const gridLineOpacity = 0.1;
const strokeColor = "royalblue";

export default class DefaultGrid extends Grid {
	constructor(props) {
		super(props);
		this.state.strokeColor = "royalblue";
	}
}
