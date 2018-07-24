import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import * as firebase from 'firebase/app';
import 'sanitize.css';
import 'bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.css';
import { view } from 'react-easy-state';

import './styles/minireset.css';
import './styles/common.css';
import './styles/misc.css';
import './styles/theme-overrides.css';
import './startup/init';
import Routes from './config/Routes';
import userStore from './stores/userStore';
import { getUserProfileFromFbase, getSettingsFromFbase, getAllMenusFromFbase } from './api/firebase';
import CustomLoader from './components/CustomLoader';
import { showAlert } from './utils/utils';
import settingsStore from './stores/settingsStore';
import dataStore from './stores/dataStore';
import { CustomFavicon } from './components/CustomFavicon';

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
      this.getCommonFbaseData().then(() => {
        this.setUserStoreData(user);
      });
    });
  }

  getCommonFbaseData = () => {
    getSettingsFromFbase().then(response => {
      if (response.error) {
        showAlert(response.error.message);
      } else if (response.data) {
        settingsStore.global = response.data.global;
        settingsStore.landingPage = response.data.landingPage;
        settingsStore.footer = response.data.footer;
      }
    });

    return getAllMenusFromFbase().then(res => {
      if (res.error) {
        showAlert(res.error.message);
      } else {
        dataStore.menus = res.data;
      }
    });
  };

  setUserStoreData = user => {
    if (user) {
      getUserProfileFromFbase(user.uid).then(res => {
        if (res.error) {
          showAlert(res.error.message);
        } else {
          userStore.profileData = res.data;
        }
        this.setState({ isLoading: false });
      });
    } else {
      this.setState({ isLoading: false });
      userStore.profileData = null;
    }
  };

  render() {
    return (
      <div>
        <CustomFavicon />
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

export default hot(module)(view(App));
