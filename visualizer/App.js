import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
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
