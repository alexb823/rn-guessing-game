import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';

import Colors from '../../constants/colors';
import Card from '../Card';
import Input from '../Input';
import NumberContainer from '../NumberContainer';
import TitleText from '../TitleText';
import MainButton from '../MainButton';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: '80%',
    minWidth: 300,
    maxWidth: '95%',
    alignItems: 'center',
  },
  input: {
    minWidth: 50,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  button: {
    width: 100,
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

const StartGameScreen = ({ handleStateGame }) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirm] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const handleNumberInput = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  };

  const handleResetInput = () => {
    setEnteredValue('');
    setConfirm(false);
  };

  const handleConfirmInput = () => {
    const chosenNumber = parseInt(enteredValue);
    if (
      !Number.isInteger(chosenNumber) ||
      chosenNumber <= 0 ||
      chosenNumber > 99
    ) {
      Alert.alert('Invalid number!', 'number has to be between 1 and 99', [
        { text: 'Okay', style: 'destructive', onPress: handleResetInput },
      ]);
      return;
    }
    setConfirm(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue('');
    Keyboard.dismiss();
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>You Selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPress={() => handleStateGame(selectedNumber)}>
          START GAME
        </MainButton>
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <TitleText style={styles.title}>Start New Game</TitleText>
        <Card style={styles.inputContainer}>
          <Text>Pick a Number</Text>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2}
            onChangeText={handleNumberInput}
            value={enteredValue}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                color={Colors.accent}
                title="Reset"
                onPress={handleResetInput}
              />
            </View>
            <View style={styles.button}>
              <Button
                color={Colors.primary}
                title="Confirm"
                onPress={handleConfirmInput}
              />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default StartGameScreen;
