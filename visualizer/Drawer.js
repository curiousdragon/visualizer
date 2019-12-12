import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Line, Circle, Rect } from 'react-native-svg';

import Grid from './Grid';

export default class Drawer extends React.Component {
  render() {
		var { height, width } = Dimensions.get('window')
    return (
			<View style={styles.viewContainer}>
				<Grid height={height} width={width} />
			</View>
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


