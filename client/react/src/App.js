import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import 'sanitize.css';
import 'bulma/css/bulma.css';
import './styles/common.css';

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
