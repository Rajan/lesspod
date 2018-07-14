import React, { Component } from 'react';

import SubscribeBar from './SubscribeBar';
import userStore from '../stores/userStore';

class Footer extends Component {
  state = {};
  render() {
    return <footer className="bottom-footer">{!userStore.profileData && <SubscribeBar />}</footer>;
  }
}

export default Footer;
