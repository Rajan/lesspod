import React, { Component } from 'react';

import SubscribeBar from './SubscribeBar';
import { FooterDeclaration } from './FooterDeclaration';

class Footer extends Component {
  state = {};
  render() {
    return (
      <footer>
        <SubscribeBar />
        <FooterDeclaration />
      </footer>
    );
  }
}

export default Footer;
