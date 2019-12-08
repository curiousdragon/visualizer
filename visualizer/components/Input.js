import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const Input = ({ inputValue, onChangeText, onDoneAddItem }) => (
	<TextInput
		style={styles.textInput}
		value={inputValue}
		onChangeText={onChangeText}
		placeholder="Type here to add note."
		multiline={true}
		selectionColor={'gray'}
		maxLength={30}
		returnKeyType="done"
		blurOnSubmit={true}
		onSubmitEditing={onDoneAddItem}
	/>
);

const styles = StyleSheet.create({
	textInput: {
		fontSize: 30
	}
});

export default Input;
