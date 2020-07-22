import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.26,
    elevation: 5,
    padding: 20,
    borderRadius: 4,
  },
})
const Card = (props) => {
  return <View style={{...styles.card, ...props.style}}>{props.children}</View>;
};

export default Card;
