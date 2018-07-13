import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LandingScreen from './../screens/LandingScreen';
import LoginScreen from './../screens/LoginScreen';
import RegisterScreen from './../screens/RegisterScreen';
// import HomeScreen from './../screens/HomeScreen';
// import ProfileScreen from './../screens/ProfileScreen';

class Routes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={LandingScreen} />
          <Route path="/login" exact component={LoginScreen} />
          <Route path="/register" exact component={RegisterScreen} />
          {/* <Route path="/home" exact component={HomeScreen} />
          <Route path="/profile" exact component={ProfileScreen} />  */}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
