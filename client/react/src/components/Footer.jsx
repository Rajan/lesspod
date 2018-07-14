import React, { Component } from 'react';

import SubscribeBar from './SubscribeBar';

class Footer extends Component {
  state = {};
  render() {
    return (
      <footer className="bottom-footer">
        <SubscribeBar />
      </footer>
    );
  }
}

export default Footer;
