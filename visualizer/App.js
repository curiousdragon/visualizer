import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import Drawer from './Drawer';
import Coordinates from './Coordinates';

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

