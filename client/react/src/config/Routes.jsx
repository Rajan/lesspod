import React from 'react';
import Loadable from 'react-loadable';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { view } from 'react-easy-state';
import userStore from '../stores/userStore';
import DocumentMeta from './../components/DocumentMeta';
import settingsStore from '../stores/settingsStore';
import { capitalizeFirstLetter } from '../utils/utils';

const loading = () => null;
const ScrollToTop = Loadable({
  loader: () => import('./../components/ScrollToTop'),
  loading
});

const LandingScreen = Loadable({
  loader: () => import('./../screens/LandingScreen'),
  loading
});

const LoginScreen = Loadable({
  loader: () => import('./../screens/LandingScreen'),
  loading
});

const RegisterScreen = Loadable({
  loader: () => import('./../screens/RegisterScreen'),
  loading
});

const HomeScreen = Loadable({
  loader: () => import('./../screens/HomeScreen'),
  loading
});

const NewPostScreen = Loadable({
  loader: () => import('./../screens/NewPostScreen'),
  loading
});

const AllPostsScreen = Loadable({
  loader: () => import('./../screens/AllPostsScreen'),
  loading
});

const ViewPostScreen = Loadable({
  loader: () => import('./../screens/ViewPostScreen'),
  loading
});

const EditPostScreen = Loadable({
  loader: () => import('./../screens/EditPostScreen'),
  loading
});

const Navbar = Loadable({
  loader: () => import('./../components/Navbar'),
  loading
});

const Footer = Loadable({
  loader: () => import('../components/Footer/Footer'),
  loading
});

const ProfileScreen = Loadable({
  loader: () => import('./../screens/ProfileScreen'),
  loading
});

const EditPageScreen = Loadable({
  loader: () => import('./../screens/EditPageScreen'),
  loading
});

const ViewPageScreen = Loadable({
  loader: () => import('./../screens/ViewPageScreen'),
  loading
});

const SettingsScreen = Loadable({
  loader: () => import('../screens/SettingsScreen'),
  loading
});
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
  const siteName =
    settingsStore.global.siteName ||
    capitalizeFirstLetter(window.location.hostname);
  const { pathname } = window.location;
  if (pathname === '/') {
    return siteName;
  }
  const title = capitalizeFirstLetter(pathname.split('/')[1]);
  return `${siteName} | ${title}`;
};

const CustomComponent = Comp => (
  <div>
    <DocumentMeta
      title={evaluateDocumentTitle()}
      description={settingsStore.global.tagline || ''}
    />
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
            <Route
              path="/"
              exact
              render={props => CustomComponent(<LandingScreen {...props} />)}
            />
            {/* <Route path="/:pageId" exact render={props => CustomComponent(<ViewPageScreen {...props} />)} /> */}
            <Route
              path="/blog"
              exact
              render={props => CustomComponent(<AllPostsScreen {...props} />)}
            />
            <Route
              path="/post/:slug"
              exact
              render={props => CustomComponent(<ViewPostScreen {...props} />)}
            />
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
            <PrivateRoute
              auth={auth}
              path="/home"
              exact
              render={props => CustomComponent(<HomeScreen {...props} />)}
            />
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
