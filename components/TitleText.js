import React from 'react';
import { StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  text: {
    fontFamily: 'openSansBold',
    fontSize: 18,

  },
});

const TitleText = (props) => {
  return <Text {...props} style={{...styles.text, ...props.style}}>{props.children}</Text>;
};

export default TitleText;
