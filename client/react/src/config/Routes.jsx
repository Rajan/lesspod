import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { view } from 'react-easy-state';

import ScrollToTop from './../components/ScrollToTop';
import userStore from '../stores/userStore';
import LandingScreen from './../screens/LandingScreen';
import LoginScreen from './../screens/LoginScreen';
import RegisterScreen from './../screens/RegisterScreen';
import HomeScreen from './../screens/HomeScreen';
import NewPostScreen from './../screens/NewPostScreen';
import AllPostsScreen from './../screens/AllPostsScreen';
import ViewPostScreen from './../screens/ViewPostScreen';
import Navbar from '../components/Navbar';
// import ProfileScreen from './../screens/ProfileScreen';

const PrivateRoute = params => {
  if (params.auth) {
    return <Route {...params} />;
  }
  return <Redirect to={{ pathname: '/login' }} />;
};

const VerifyAuthRoute = params => {
  if (params.auth) {
    return <Redirect to={{ pathname: '/home' }} />;
  }
  return <Route {...params} />;
};

class Routes extends React.Component {
  render() {
    const auth = !!userStore.profileData;
    return (
      <BrowserRouter>
        <ScrollToTop>
          <Navbar />
          <Switch>
            <Route path="/" exact render={props => <LandingScreen {...props} />} />
            <Route path="/blog" exact render={props => <AllPostsScreen {...props} />} />
            <Route path="/post/:postId" exact render={props => <ViewPostScreen {...props} />} />
            <VerifyAuthRoute auth={auth} path="/login" exact render={props => <LoginScreen {...props} />} />
            <VerifyAuthRoute auth={auth} path="/register" exact render={props => <RegisterScreen {...props} />} />
            <PrivateRoute auth={auth} path="/home" exact render={props => <HomeScreen {...props} />} />
            <PrivateRoute auth={auth} path="/newpost" exact render={props => <NewPostScreen {...props} />} />
          </Switch>
        </ScrollToTop>
      </BrowserRouter>
    );
  }
}

export default view(Routes);
