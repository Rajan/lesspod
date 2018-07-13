import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import 'sanitize.css';
import 'bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.css';
import './styles/common.css';

import './startup/init';
import Routes from './config/Routes';

class App extends Component {
  render() {
    return (
      <div>
        <Routes />
      </div>
    );
  }
}

export default hot(module)(App);
