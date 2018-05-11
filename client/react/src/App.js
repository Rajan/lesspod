import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Header from './components/common/Header/Header';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

export default hot(module)(App);
