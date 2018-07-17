import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { view } from 'react-easy-state';

import SplashScreen from './../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import userStore from '../stores/userStore';

const PublicRoutes = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
    },
    Register: {
      screen: LoginScreen,
    },
  },
  { initialRouteName: 'Login' }
);

const PrivateRoutes = createStackNavigator(
  {
    Splash: {
      screen: SplashScreen,
    },
  },
  { initialRouteName: 'Splash' }
);

// export default (userStore.profileData ? view(PrivateRoutes) : view(PublicRoutes));

export default PublicRoutes;
