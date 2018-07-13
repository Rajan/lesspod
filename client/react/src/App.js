import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import * as firebase from 'firebase/app';
import 'sanitize.css';
import 'bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.css';

import './styles/minireset.css';
import './styles/common.css';
import './startup/init';
import Routes from './config/Routes';
import userStore from './stores/userStore';
import { getUserProfileFromFbase } from './api/firebase';

class App extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        getUserProfileFromFbase(user.uid).then(res => {
          if (res.error) {
            console.log(res.error.message);
          } else {
            userStore.profileData = res.data;
          }
        });
      } else {
        userStore.profileData = null;
      }
    });
  }

  render() {
    return (
      <div>
        <Routes />
      </div>
    );
  }
}

export default hot(module)(App);
