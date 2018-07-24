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
import EditPostScreen from './../screens/EditPostScreen';
import Navbar from './../components/Navbar';
import Footer from '../components/Footer/Footer';
import ProfileScreen from './../screens/ProfileScreen';
import EditPageScreen from './../screens/EditPageScreen';
import ViewPageScreen from './../screens/ViewPageScreen';
import SettingsScreen from '../screens/SettingsScreen';
import DocumentMeta from './../components/DocumentMeta';
import settingsStore from '../stores/settingsStore';
import { capitalizeFirstLetter } from '../utils/utils';

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

const evaluateDocumentTitle = () => {
  const siteName = settingsStore.global.siteName || capitalizeFirstLetter(window.location.hostname);
  const { pathname } = window.location;
  if (pathname === '/') {
    return siteName;
  }
  const title = capitalizeFirstLetter(pathname.split('/')[1]);
  return `${siteName} | ${title}`;
};

const CustomComponent = Comp => (
  <div>
    <DocumentMeta title={evaluateDocumentTitle()} description={settingsStore.global.tagline || ''} />
    {Comp}
  </div>
);

class Routes extends React.Component {
  render() {
    const auth = !!userStore.profileData;
    return (
      <BrowserRouter>
        <ScrollToTop>
          <Navbar />
          <Switch>
            <Route path="/" exact render={props => CustomComponent(<LandingScreen {...props} />)} />
            {/* <Route path="/:pageId" exact render={props => CustomComponent(<ViewPageScreen {...props} />)} /> */}
            <Route path="/blog" exact render={props => CustomComponent(<AllPostsScreen {...props} />)} />
            <Route path="/post/:slug" exact render={props => CustomComponent(<ViewPostScreen {...props} />)} />
            <VerifyAuthRoute
              auth={auth}
              path="/login"
              exact
              render={props => CustomComponent(<LoginScreen {...props} />)}
            />
            <VerifyAuthRoute
              auth={auth}
              path="/register"
              exact
              render={props => CustomComponent(<RegisterScreen {...props} />)}
            />
            <PrivateRoute auth={auth} path="/home" exact render={props => CustomComponent(<HomeScreen {...props} />)} />
            <PrivateRoute
              auth={auth}
              path="/newpost"
              exact
              render={props => CustomComponent(<NewPostScreen {...props} />)}
            />
            <PrivateRoute
              auth={auth}
              path="/editpost/:slug"
              exact
              render={props => CustomComponent(<EditPostScreen {...props} />)}
            />
            <PrivateRoute
              auth={auth}
              path="/profile/"
              exact
              render={props => CustomComponent(<ProfileScreen {...props} />)}
            />
            <PrivateRoute
              auth={auth}
              path="/editpage/:slug"
              exact
              render={props => CustomComponent(<EditPageScreen {...props} />)}
            />
            <PrivateRoute
              auth={auth}
              path="/settings"
              exact
              render={props => CustomComponent(<SettingsScreen {...props} />)}
            />
            <Route component={ViewPageScreen} />
          </Switch>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    );
  }
}

export default view(Routes);
