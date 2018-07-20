import React, { Component } from 'react';

import SubscribeBar from './SubscribeBar';

const styles = {
  decalaration: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
};

class Footer extends Component {
  state = {};
  render() {
    return (
      <footer className="bottom-footer-no-sticky">
        <SubscribeBar />
        <div style={styles.decalaration}>
          <div>
            {window.location.host} © {new Date().getFullYear()}. All rights reserved.
          </div>
          <div>
            <b>Powered by</b>{' '}
            <a href="http://lesspod.org" target="_blank">
              Lesspod
            </a>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
