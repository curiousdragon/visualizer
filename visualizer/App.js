import React from 'react';
import ReactNative, { 
	View, 
	Text,
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

import Svg, { Text as TextSvg, TSpan, G, } from 'react-native-svg';

import Transform from './Transform';
import Coordinates from './Coordinates';
import Vector from './Vector';
import Grid from './Grid';
////////////////////////////////
const xAxisFactor = 0.45;
const yAxisFactor = 0.3;
const scale = 1;
const xLinesNum = scale * 10;
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


class HomeScreen extends React.Component {
  render() {
		var coords = new Coordinates({
			height: {height}, 
			width: {width}, 
			scale: {scale},
			xAxisFactor: {xAxisFactor},
			yAxisFactor: {yAxisFactor}});
		var origin = coords.getOrigin();
		console.log(origin);
		var head = coords.makePoint({
			x: origin.x() + 100,
			y: origin.y() - 100,
			coord_x: 0,
			coord_y: 0,
		});
		console.log(head);

    return (
      <View style={styles.absContainer}>
				<Svg height={height} width={width}>
					<TextSvg 
						fill="dodgerblue"
						stroke="none"
						fontFamily="Cochin"
						fontSize="50"
						x={width * 0.5}
						y={height * 0.2}
						textAnchor="middle">
							visual-izer
					</TextSvg>
					<G opacity="0.7">
					<Grid height={height} width={width} scale={scale} 
						xAxisFactor={xAxisFactor} yAxisFactor={yAxisFactor} />
					</G>
					<Vector 
						height={height}
						width={width} 
						origin={origin}
						head={head} 
						color="dodgerblue" />
				</Svg>
				
				<TouchableOpacity
					style={styles.absContainer}
          onPress={() => this.props.navigation.push('Graph')}>
				<View style={styles.viewContainer} 
					height={height * 0.2}
					width={width * 0.5} 
					top={height * 0.62} >
				<Svg height={height} width={width}>
					<TextSvg 
						fill="lightsalmon"
						stroke="none"
						fontFamily="Cochin"
						fontSize="50"
						x={width * 0.5}
						y={height * 0.5}
						textAnchor="middle">
							start
					</TextSvg>
				</Svg>
				</View>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.absContainer}
          onPress={() => this.props.navigation.push('Instructions')}>
				<View style={styles.viewContainer} 
					height={height * 0.2}
					width={width * 0.5}
					top={height * 0.73} >
				<Svg height={height} width={width}>
					<TextSvg 
						fill="gainsboro"
						stroke="none"
						fontFamily="Cochin"
						fontSize="50"
						x={width * 0.5}
						y={height * 0.5}
						textAnchor="middle">
							how to
					</TextSvg>
				</Svg>
				</View>
				</TouchableOpacity>
      </View>
    );
  }
}

class InstructionsScreen extends React.Component {
  render() {
		var { height, width } = Dimensions.get('window');
    return (
			<View style={styles.absContainer}>
				<Svg height={height} width={width}>
					<TextSvg
						fill="dodgerblue"
						stroke="none"
						fontFamily="Cochin"
						fontSize="50"
						x={width * 0.5}
						y={height * 0.2}
						textAnchor="middle">
							instructions
					</TextSvg>
				</Svg>
				
				<View style={styles.textContainer}
					top={height * 0.3} 
					left={width * 0.1} >
				<Text style={{
					fontSize: 20,
					fontFamily: "Cochin" }} > 
					Drag to draw a blue vector. {"\n"}
					Tap once to draw a basis vector. {"\n"} {"\n"}
					Once you’ve drawn two basis vectors, 
					tap once to watch the transformation. {"\n"} {"\n"}
					Another tap clears the basis vectors. {"\n"}
					Pinch to clear the blue vectors. {"\n"} {"\n"} 
					To return to home, press and hold anywhere. 
				</Text>
				</View>

				<TouchableOpacity
					style={styles.absContainer}
					onPress={() => this.props.navigation.navigate('Home')}>
				<View style={styles.viewContainer}
					height={height * 0.2}
					width={width * 0.5}
					top={height * 0.7} >
				<Svg height={height} width={width}>
					<TextSvg
						fill="lightsalmon"
						stroke="none"
						fontFamily="Cochin"
						fontSize="50"
						x={width * 0.5}
						y={height * 0.5}
						textAnchor="middle">
							home
					</TextSvg>
				</Svg>
				</View>
				</TouchableOpacity>
			</View>
    );
  }
}

class GraphScreen extends React.Component {
	_onLongPress = event => {
		if (event.nativeEvent.state === State.ACTIVE) {
			console.log("three tap");
			this.props.navigation.navigate('Home');
		}
	}

	render() {
		return (
			<LongPressGestureHandler
				onHandlerStateChange={this._onLongPress}
				minDurationMs={500} > 
				<Animated.View style={styles.viewContainer}>
					<Transform />
				</Animated.View>
			</LongPressGestureHandler>
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

/////////////////////////////////////
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
		position: 'absolute',		
	},

  inputContainer: {
		flex: 0.1
	}
});

