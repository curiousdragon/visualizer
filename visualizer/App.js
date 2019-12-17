import React from 'react';
import { 
	View, 
	StyleSheet, 
	Dimensions, 
	Animated, 
	Button, 
	TouchableOpacity,
} from 'react-native';

import { createAppContainer, } from 'react-navigation';
import { createStackNavigator, } from 'react-navigation-stack';
import { 
	State,
	PanGestureHandler, 
	TapGestureHandler,
	LongPressGestureHandler,
} from 'react-native-gesture-handler';

import Svg, { Text, } from 'react-native-svg';
import Transform from './Transform';


class HomeScreen extends React.Component {
  render() {
		console.log("home");
		var { height, width } = Dimensions.get('window');
		console.log(height);
		console.log(width);
    return (
      <View style={styles.viewContainer}>
				<Svg height={height} width={width}>
					<Text 
						fill="dodgerblue"
						stroke="none"
						fontFamily="Cochin"
						fontSize="50"
						x={width * 0.5}
						y={height * 0.2}
						textAnchor="middle">
						visual-izer
					</Text>
				</Svg>

				<TouchableOpacity
					style={styles.absContainer}
          onPress={() => this.props.navigation.push('Instructions')}>
				<View style={styles.viewContainer} 
					height={height * 0.2}
					width={width * 0.5}>
				<Svg height={height} width={width}>
					<Text 
						fill="lightsalmon"
						stroke="none"
						fontFamily="Cochin"
						fontSize="50"
						x={width * 0.5}
						y={height * 0.5}
						textAnchor="middle">
						start
					</Text>
				</Svg>
				</View>
				</TouchableOpacity>
      </View>
    );
  }
}

class InstructionsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.push('Instructions')}
        />
				<Button
          title="Go to Graph"
          onPress={() => this.props.navigation.navigate('Graph')}
        />

        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

class GraphScreen extends React.Component {
	_onThreeTap = event => {
		if (event.nativeEvent.state === State.ACTIVE) {
			this.props.navigation.navigate('Home');
		}
	}

	render() {
		return (
			<TapGestureHandler
				onHandlerStateChange={this._onThreeTap}
				numberOfTaps={1}
				minPointers={3} > 
				<Animated.View style={styles.viewContainer}>
					<Transform />
				</Animated.View>
			</TapGestureHandler>
		);
	}
}

const RootStack = createStackNavigator(
	{
		Home: HomeScreen,
		Instructions: InstructionsScreen,
		Graph: GraphScreen,
	},
	{
		headerMode: 'none',
	},

);

export default createAppContainer(RootStack);






class App extends React.Component {
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

	absContainer: {
		alignItems: 'center',
		position: 'absolute',
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

