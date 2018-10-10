import React, { Component } from 'react';
import { view } from 'react-easy-state';

import settingsStore from './../../stores/settingsStore';

const styles = {
  decalaration: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 10,
    paddingTop: 10,
    fontSize: 18,
  },
};

export class FooterDeclaration extends Component {
  render() {
    const { siteName } = settingsStore.global;
    return (
      <div>
        {
          <div style={styles.decalaration}>
            <div>
              {siteName.length > 0 && `${siteName} | `} {window.location.host} © {new Date().getFullYear()}. All rights
              reserved.
            </div>
            <div>
              Powered by{' '}
              <a href="http://lesspod.org" target="_blank" rel="noopener noreferrer">
                Lesspod
              </a>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default view(FooterDeclaration);
