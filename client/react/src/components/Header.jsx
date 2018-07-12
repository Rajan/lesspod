import React from 'react';
import { Link } from 'react-router-dom';

import icon from './../assets/images/icon.png';
import textIcon from './../assets/images/logo-text.png';
import LoginNavItem from './LoginNavItem';

const styles = {
  container: {},
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    width: 48,
    margin: 20,
  },
  captionContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
};

class Header extends React.Component {
  render() {
    return <div> Header </div>;
  }
}

export default Header;
