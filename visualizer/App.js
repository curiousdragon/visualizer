import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';

import Drawer from './Drawer';
import Coordinates from './Coordinates';

import Example from './Test';

export default class App extends React.Component {
  render() {
    return (
			//	<Example />
			<Drawer />
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

