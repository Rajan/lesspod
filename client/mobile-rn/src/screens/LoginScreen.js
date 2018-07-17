import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { blueBg } from './../config/Colors';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: blueBg,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  form: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
  },
});

class LoginScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <Text>Login form</Text>
        </View>
      </View>
    );
  }
}

export default LoginScreen;
