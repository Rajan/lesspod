import React, { Component } from 'react';

import settingsStore from '../stores/settingsStore';

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
    return (
      <div>
        {window.location.pathname.indexOf('/post/') === -1 && (
          <div style={styles.decalaration}>
            <div>
              {settingsStore.global.siteName} | {window.location.host} © {new Date().getFullYear()}. All rights
              reserved.
            </div>
            <div>
              <b>Powered by</b>{' '}
              <a href="http://lesspod.org" target="_blank" rel="noopener noreferrer">
                Lesspod
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default FooterDeclaration;
