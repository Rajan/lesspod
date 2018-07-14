import React, { Component } from 'react';

import './../styles/custom-loader.css';
import LogoIcon from './../assets/images/icon.png';

class CustomLoader extends Component {
  state = {};
  render() {
    return (
      <span className="beacon">
        <img src={LogoIcon} alt="lesspod-logo-icon" width={60} height={60} />
      </span>
    );
  }
}

export default CustomLoader;
