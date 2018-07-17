import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class LoginScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.containesr}>
        <Text>login dafaf af</Text>
        <Text>login dafaf af</Text>
        <Text>login dafaf af</Text>
        <Text>login dafaf af</Text>
        <Text>login dafaf af</Text>
        <Text>login dafaf af</Text>
      </View>
    );
  }
}

export default LoginScreen;
