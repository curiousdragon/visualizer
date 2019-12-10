import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { BaseGestureHandler } from 'react-native-gesture-handler';
import Input from './components/Input';

export default class Main extends React.Component {
  state = {
    inputValue: ''
  };

  newInputValue = value => {
    this.setState({
      inputValue: value
    });
  };

  render() {
    const { inputValue, inputValue1 } = this.state;
    return (
			<View style={styles.viewContainer}>
				<View style={styles.inputContainer}>
					<Input inputValue={inputValue1} onChangeText={this.newInputValue1} />
				</View>
				<View style={styles.inputContainer}>
					<Input inputValue={inputValue} onChangeText={this.newInputValue} />
				</View>
			</View>
    );
  }
}


class Multitap extends React.Component {
  render() {
    return (
      <LongPressGestureHandler
        onHandlerStateChange={this._onLongpress}
        minDurationMs={800}>
        <TapGestureHandler
          onHandlerStateChange={this._onSingleTap}
          waitFor={this.doubleTapRef}>
          <TapGestureHandler
            ref={this.doubleTapRef}
            onHandlerStateChange={this._onDoubleTap}
            numberOfTaps={2}>
            <View style={styles.box} />
          </TapGestureHandler>
        </TapGestureHandler>
      </LongPressGestureHandler>
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
