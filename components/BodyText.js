import React from 'react';
import { StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  bodyText: {
    fontFamily: 'openSans',
  },
});

const BodyText = (props) => {
  return (
    <Text {...props} style={{ ...styles.bodyText, ...props.style }}>
      {props.children}
    </Text>
  );
};

export default BodyText;
