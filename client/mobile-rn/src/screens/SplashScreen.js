import React from 'react';
import { StyleSheet, Image, SafeAreaView, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class App extends React.Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
        <Image source={require('./../assets/images/icon.png')} style={{ width: 60, height: 60 }} />
      </SafeAreaView>
    );
  }
}
