import { createStackNavigator } from 'react-navigation';

import SplashScreen from './../screens/SplashScreen';

const Routes = createStackNavigator(
  {
    Splash: {
      screen: SplashScreen,
    },
  },
  { initialRouteName: 'Splash' }
);

export default Routes;
