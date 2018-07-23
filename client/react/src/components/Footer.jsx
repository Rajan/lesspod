import React, { Component } from 'react';
import { view } from 'react-easy-state';

import SubscribeBar from './SubscribeBar';
import { FooterDeclaration } from './FooterDeclaration';
import { FooterWidgets } from './FooterWidgets';
import settingsStore from '../stores/settingsStore';

class Footer extends Component {
  state = {};
  render() {
    return (
      <footer>
        <SubscribeBar />
        {settingsStore.footer.showWidgets && <FooterWidgets />}
        <FooterDeclaration />
      </footer>
    );
  }
}

export default view(Footer);
