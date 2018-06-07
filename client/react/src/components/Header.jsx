import React from 'react';
import { Navbar, NavbarMenu, NavbarBrand, NavbarItem, NavbarStart, NavbarEnd } from 'bloomer';
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
    return (
      <Navbar style={styles.container}>
        <NavbarBrand style={styles.iconContainer}>
          <img height="160" width="50" src={icon} alt="lesspod-logo-icon" />
        </NavbarBrand>
        <NavbarMenu onClick={this.onClickNav}>
          <NavbarStart isUnselectable>
            <div style={styles.captionContainer}>
              <img src={textIcon} width="auto" height="21" alt="lesspod-logo-text" />
              <p>Serverless Blogging Engine</p>
            </div>
          </NavbarStart>
          <NavbarEnd>
            <NavbarItem>
              <Link to="/">Home</Link>
            </NavbarItem>
            <LoginNavItem />
          </NavbarEnd>
        </NavbarMenu>
      </Navbar>
    );
  }
}

export default Header;
