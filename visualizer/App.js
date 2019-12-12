import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Line, Circle, Rect } from 'react-native-svg';

class Axis extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			height: this.props.height,
			width: this.props.width,
			x1: "100",
			y1: "100",
			x2: "100",
			y2: "100",
			stroke: "blue",
			strokeWidth: "2"
		};
	}

	setPos(x1, y1, x2, y2) {
		this.state.x1 = x1;
		this.state.y1 = y1;
		this.state.x2 = x2;
		this.state.y2 = y2;
	}

	render() {
		return (
			<Line 
			x1={this.state.x1} y1={this.state.y1}
			x2={this.state.x2} y2={this.state.y2}
			stroke={this.state.stroke}
			strokeWidth={this.state.strokeWidth} />
		);
	}	
}

class AxisX extends Axis {
	constructor(props) {
		super(props);
		var height = this.state.height * 0.85;
		var width = this.state.width;
		super.setPos("0", height, width, height);
	}
}

class AxisY extends Axis {
	constructor(props) {
		super(props);
		var height = this.state.height;
		var width = this.state.width * 0.25;
		super.setPos(width, 0, width, height);
	}
}

export default class App extends React.Component {
  render() {
		var { height, width } = Dimensions.get('window')
    return (
      <View style={styles.viewContainer}>
				<Svg height={height} width={width}>
					<AxisX height={height} width={width} />			
					<AxisY height={height} width={width} />
				</Svg>
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

