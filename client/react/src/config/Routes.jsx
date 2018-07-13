import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { view } from 'react-easy-state';

import userStore from '../stores/userStore';
import LandingScreen from './../screens/LandingScreen';
import LoginScreen from './../screens/LoginScreen';
import RegisterScreen from './../screens/RegisterScreen';
import HomeScreen from './../screens/HomeScreen';
// import ProfileScreen from './../screens/ProfileScreen';

const PrivateRoute = params => {
  if (params.auth) {
    return <Route {...params} />;
  }
  return <Redirect to={{ pathname: '/login' }} />;
};

class Routes extends React.Component {
  render() {
    const auth = userStore.profileData;
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={LandingScreen} />
          <Route path="/login" exact component={LoginScreen} />
          <Route path="/register" exact component={RegisterScreen} />
          <PrivateRoute auth={auth} path="/home" exact component={HomeScreen} />
          {/* <Route path="/profile" exact component={ProfileScreen} />  */}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default view(Routes);
