import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Line, Circle, Rect } from 'react-native-svg';

import Drawer from './Drawer';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.viewContainer}>
				<Drawer />
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

