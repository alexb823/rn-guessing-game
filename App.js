import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header';
import StartGameScreen from './components/screens/StartGameScreen';
import GameScreen from './components/screens/GameScreen';
import GameOverScreen from './components/screens/GameOverScreen';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

const fetchFonts = () => {
  return Font.loadAsync({
    openSans: require('./assets/fonts/OpenSans-Regular.ttf'),
    openSansBold: require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  const handleStateGame = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };

  const handleGameOver = (numOfRounds) => {
    setGuessRounds(numOfRounds);
  };

  const handleNewGameConfig = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  let content = <StartGameScreen handleStateGame={handleStateGame} />;

  if (userNumber && guessRounds === 0) {
    content = (
      <GameScreen userChoice={userNumber} handleGameOver={handleGameOver} />
    );
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        guessRounds={guessRounds}
        userNumber={userNumber}
        handleNewGameConfig={handleNewGameConfig}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />
      {content}
      <StatusBar style="auto" />
    </View>
  );
}
