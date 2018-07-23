import React from 'react';
import { StyleSheet, View, StatusBar, SafeAreaView } from 'react-native';
import firebase from 'firebase';

import userStore from './src/stores/userStore';
import { getUserProfileFromFbase } from './src/api/firebase';
import { showAlert } from './src/utils/utils';

import './src/startup/init';
import Routes from './src/config/Routes';
import CustomLoader from './src/components/CustomLoader';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class App extends React.Component {
  state = {
    isLoading: true,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        getUserProfileFromFbase(user.uid).then(res => {
          this.setState({ isLoading: false });
          if (res.error) {
            showAlert(res.error.message);
          } else {
            userStore.profileData = res.data;
          }
        });
      } else {
        this.setState({ isLoading: false });
        userStore.profileData = null;
      }
    });
  }

  renderApp = () => {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <CustomLoader />
        </View>
      );
    }

    return <Routes />;
  };

  render() {
    return (
      <SafeAreaView>
        <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
        {this.renderApp()}
      </SafeAreaView>
    );
  }
}

export default App;
