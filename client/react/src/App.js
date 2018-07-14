import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import * as firebase from 'firebase/app';
import 'sanitize.css';
import 'bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.css';

import './styles/minireset.css';
import './styles/common.css';
import './styles/misc.css';
import './startup/init';
import Routes from './config/Routes';
import userStore from './stores/userStore';
import { getUserProfileFromFbase } from './api/firebase';
import CustomLoader from './components/CustomLoader';

const styles = {
  loaderContainer: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
};

class App extends Component {
  state = {
    isLoading: true,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        getUserProfileFromFbase(user.uid).then(res => {
          if (res.error) {
            console.log(res.error.message);
          } else {
            userStore.profileData = res.data;
          }
          this.setState({ isLoading: false });
        });
      } else {
        this.setState({ isLoading: false });
        userStore.profileData = null;
      }
    });
  }

  render() {
    return (
      <div>
        {this.state.isLoading ? (
          <div style={styles.loaderContainer}>
            <CustomLoader />
          </div>
        ) : (
          <Routes />
        )}
      </div>
    );
  }
}

export default hot(module)(App);
