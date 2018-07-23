import React, { Component } from 'react';
import Favicon from 'react-favicon';
import { view } from 'react-easy-state';

import settingsStore from '../stores/settingsStore';

export class CustomFavicon extends Component {
  render() {
    const { squareLogoURL } = settingsStore.global;
    return <div>{squareLogoURL && squareLogoURL.length > 1 && <Favicon url={squareLogoURL} />}</div>;
  }
}

export default view(CustomFavicon);
