import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LandingScreen from './../screens/LandingScreen';
import LoginScreen from './../screens/LoginScreen';
import RegisterScreen from './../screens/RegisterScreen';

class Routes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={LandingScreen} />
          <Route path="/login" exact component={LoginScreen} />
          <Route path="/register" exact component={RegisterScreen} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
