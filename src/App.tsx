/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const cards = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const cardColors = ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#00BCD4', '#009688'];

// For testing
// const cards = ['A', 'B'];
// const cardColors = ['#F44336', '#E91E63'];

const generateCards = () => {
  let initialCards = cards.concat(cards);
  let shuffledCards: string[] = [];
  for (let i = 0; i < initialCards.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    shuffledCards[i] = shuffledCards[j];
    shuffledCards[j] = initialCards[i];
  }
  return shuffledCards;
};

function App(): JSX.Element {

  const [gameCards, setGameCards] = useState(generateCards());
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [turns, setTurns] = useState(0);


  const handleCardPress = (index: number) => {
    if (selectedCards.length < 2 && !selectedCards.includes(index) && !matchedCards.includes(index)) {
      setSelectedCards([...selectedCards, index]);
    }
  };

  useEffect(() => {
    if (matchedCards.length === gameCards.length) {
      Alert.alert('Congratulations!', `You won the game in ${turns} turns.`);
      setTimeout(() => {
        setTurns(0);
      }, 1000);
      setGameCards(generateCards());
      setMatchedCards([]);
    }
  }, [matchedCards]);

  useEffect(() => {
    setTimeout(() => {
      if (selectedCards.length === 2) {
        const [firstIndex, secondIndex] = selectedCards;
        if (gameCards[firstIndex] === gameCards[secondIndex]) {
          setMatchedCards([...matchedCards, firstIndex, secondIndex]);
        }
        setSelectedCards([]);
        setTurns(turns + 1);
      }
    }, 500);
  }, [selectedCards]);

  const handleRestartPressed = () => {
    setTimeout(() => {
      setTurns(0);
    }, 500);
    setGameCards(generateCards());
    setMatchedCards([]);
    setSelectedCards([]);
  }

  const renderCard = (index: number) => {
    if (matchedCards.includes(index)) {
      return (
        <View style={[styles.card, { backgroundColor: cardColors[cards.indexOf(gameCards[index])] }]}>
          <Text style={styles.cardText}>{gameCards[index]}</Text>
        </View>
      );
    } else {
      return (
        <TouchableOpacity style={styles.card} onPress={() => handleCardPress(index)}>
          <Text style={styles.cardText}>{selectedCards.includes(index) ? gameCards[index] : ''}</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.turnsText}>Matches: {matchedCards.length > 0 ? matchedCards.length / 2 : 0}</Text>
        <Text style={styles.turnsText}>Turns: {turns}</Text>
      </View>

      <View style={styles.board}>
        {gameCards.map((_item, index) => (
          <View key={index} style={styles.cardContainer}>
            {renderCard(index)}
          </View>
        ))}
      </View>

      <TouchableOpacity onPress={handleRestartPressed} style={styles.button}>
        <Text style={{ color: "white" }}>Restart</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  turnsText: {
    fontSize: 20,
    marginBottom: 20,
    color: "black",
    marginTop: 30,

  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  cardContainer: {
    width: 60,
    aspectRatio: 1,
    margin: 10,

  },
  card: {
    flex: 1,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  matchedCard: {
    backgroundColor: '#ddd',
  },
  cardText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 40,
    width: 80,
    height: 40,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center"
  }
});




export default App;
