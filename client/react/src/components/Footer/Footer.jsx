import React, { Component } from 'react';
import { view } from 'react-easy-state';

import { FooterDeclaration } from './FooterDeclaration';
import { FooterWidgets } from './FooterWidgets';
import settingsStore from '../../stores/settingsStore';

class Footer extends Component {
  state = {};
  render() {
    return (
      <footer>
        {settingsStore.footer.showWidgets && <FooterWidgets />}
        <FooterDeclaration />
      </footer>
    );
  }
}

export default view(Footer);
