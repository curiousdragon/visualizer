import React from 'react';
import { Button, View, StyleSheet, Dimensions, Text, Animated } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { State,
				PanGestureHandler, 
				TapGestureHandler,
				LongPressGestureHandler } from 'react-native-gesture-handler';

import Transform from './Transform';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			rend: 
				<View style={styles.viewContainer}>
				<Text> Drag from the origin to draw a blue vector.
				Tap twice to draw a new basis vector. 
				Once you’ve drawn two basis vectors, 
				tap twice again to watch the transformation.
				</Text>

				<Text>
				Another double tap clears the basis vectors.
				Pinch to clear the blue vectors.
				</Text>
				</View>,
			text: 
				<View>
				<Text> Drag from the origin to draw a blue vector.
				</Text>
				<Text>
				Tap twice to draw a new basis vector. 
				</Text>
				<Text>
				Once you’ve drawn two basis vectors, 
				</Text>
				<Text>
				tap twice again to watch the transformation.
				</Text>

				<Text>
				Another double tap clears the basis vectors.
				</Text>
				<Text>
				Pinch to clear the blue vectors.
				</Text>
				</View>,
			graph:
				<Transform />,
			home: true,
		}
	};

	_onTap = event => {
		if (event.nativeEvent.state === State.ACTIVE) {
			if (this.state.home) {
				this.setState(state => ({
					rend: state.graph,
					home: false,
				}));
			} else {
				this.setState(state => ({
					rend: state.text,
					home: true,
				}));
			}
		}
	}
		

  render() {
    return (
			//<Example />
			//<Drawer />
			<Animated.View style={styles.viewContainer}>
			<LongPressGestureHandler
				onHandlerStateChange={this._onTap}>
					{this.state.rend}
			</LongPressGestureHandler>
			</Animated.View>
	    );
  }
}

const styles = StyleSheet.create({
	viewContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	textContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: '80%',
	},

  inputContainer: {
		flex: 0.1
	}
});

