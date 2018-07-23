import React from 'react';
import { NativeRouter, Route, Switch, Redirect } from 'react-router-native';
import { view } from 'react-easy-state';

import userStore from '../stores/userStore';
import LoginScreen from './../screens/LoginScreen';
import RegisterScreen from './../screens/RegisterScreen';
// import LandingScreen from './../screens/LandingScreen';
import HomeScreen from './../screens/HomeScreen';
// import NewPostScreen from './../screens/NewPostScreen';
// import AllPostsScreen from './../screens/AllPostsScreen';
import ViewPostScreen from './../screens/ViewPostScreen';
// import EditPostScreen from './../screens/EditPostScreen';
// import ProfileScreen from './../screens/ProfileScreen';
// import EditPageScreen from './../screens/EditPageScreen';
// import ViewPageScreen from './../screens/ViewPageScreen';

const PrivateRoute = params => {
  if (params.auth) {
    return <Route {...params} />;
  }
  return <Redirect to={{ pathname: '/' }} />;
};

const VerifyAuthRoute = params => {
  if (params.auth) {
    return <Redirect to={{ pathname: '/home' }} />;
  }
  return <Route {...params} />;
};

class Routes extends React.Component {
  closeControlPanel = () => {
    this._drawer.close();
  };
  openControlPanel = () => {
    this._drawer.open();
  };

  render() {
    const auth = !!userStore.profileData;
    return (
      <NativeRouter>
        <Switch>
          {/* <Route path="/" exact render={props => <LandingScreen {...props} />} />
          <Route path="/blog" exact render={props => <AllPostsScreen {...props} />} /> */}
          <Route path="/post/:postId" exact render={props => <ViewPostScreen {...props} />} />
          <VerifyAuthRoute auth={auth} path="/" exact render={props => <LoginScreen {...props} />} />
          <VerifyAuthRoute auth={auth} path="/register" exact render={props => <RegisterScreen {...props} />} />
          <PrivateRoute auth={auth} path="/home" exact render={props => <HomeScreen {...props} />} />
          {/* <PrivateRoute auth={auth} path="/newpost" exact render={props => <NewPostScreen {...props} />} />
          <PrivateRoute auth={auth} path="/editpost/:postId" exact render={props => <EditPostScreen {...props} />} />
          <PrivateRoute auth={auth} path="/profile/" exact render={props => <ProfileScreen {...props} />} />
          <PrivateRoute auth={auth} path="/editpage/:pageId" exact render={props => <EditPageScreen {...props} />} />
          <Route component={ViewPageScreen} /> */}
        </Switch>
      </NativeRouter>
    );
  }
}

export default view(Routes);
