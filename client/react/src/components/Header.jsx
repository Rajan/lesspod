import React from 'react';
import {
  Navbar,
  NavbarMenu,
  NavbarBrand,
  NavbarItem,
  NavbarStart,
  NavbarEnd,
  NavbarDropdown,
  NavbarLink,
  NavbarDivider,
} from 'bloomer';
import { Link } from 'react-router-dom';

import icon from './../assets/images/icon.png';
import textIcon from './../assets/images/logo-text.png';

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
          <img src={icon} alt="lesspod-logo-icon" />
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
              <Link to="/">
                <NavbarItem>Home</NavbarItem>
              </Link>
            </NavbarItem>
            <NavbarItem hasDropdown isHoverable>
              <NavbarLink>Some Menu</NavbarLink>
              <NavbarDropdown>
                <Link to="/">
                  <NavbarItem href="/">One A</NavbarItem>
                </Link>
                <Link to="/">
                  <NavbarItem href="/">Two B</NavbarItem>
                </Link>
                <NavbarDivider />
                <Link to="/">
                  <NavbarItem href="/">Two A</NavbarItem>
                </Link>
              </NavbarDropdown>
            </NavbarItem>
          </NavbarEnd>
        </NavbarMenu>
      </Navbar>
    );
  }
}

export default Header;
