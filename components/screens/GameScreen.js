import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  Text,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../NumberContainer';
import Card from '../Card';
import DefaultStyles from '../../constants/defaultStyles';
import TitleText from '../TitleText';
import MainButton from '../MainButton';
import BodyText from '../BodyText';

const generateNum = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateNum(min, max, exclude);
  } else {
    return rndNum;
  }
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 400,
    maxWidth: '90%',
  },
  listContainer: {
    flex: 1,
    width: '60%',
  },
  list: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

const renderListItem = (itemData, listLength) => (
  <View style={styles.listItem}>
    <BodyText>#{listLength - itemData.index}</BodyText>
    <Text>{itemData.item}</Text>
  </View>
);

const GameScreen = ({ userChoice, handleGameOver }) => {
  const initialGuess = generateNum(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [passedGuesses, setPassedGuesses] = useState([initialGuess.toString()]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    if (currentGuess === userChoice) {
      handleGameOver(passedGuesses.length);
    }
  }, [currentGuess, userChoice, handleGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === 'less' && userChoice > currentGuess) ||
      (direction === 'more' && userChoice < currentGuess)
    ) {
      Alert.alert("Don't Lie!", 'You know that is wrong', [
        { text: 'Sorry!', style: 'cancel' },
      ]);
    } else if (direction === 'less') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNum = generateNum(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNum);
    setPassedGuesses((prev) => [nextNum.toString(), ...prev]);
  };

  return (
    <View style={styles.screen}>
      <TitleText style={DefaultStyles.title}>Opponent's Guess</TitleText>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, 'less')}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, 'more')}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        {/* <ScrollView contentContainerStyle={styles.list} >
          {passedGuesses.map((guess, idx) =>
            renderListItem(guess, passedGuesses.length - idx)
          )}
        </ScrollView> */}
        <FlatList
          contentContainerStyle={styles.list}
          keyExtractor={(item) => item}
          data={passedGuesses}
          renderItem={(data) => renderListItem(data, passedGuesses.length)}
        />
      </View>
    </View>
  );
};

export default GameScreen;
