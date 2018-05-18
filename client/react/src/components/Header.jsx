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
            <NavbarItem href="/">Home</NavbarItem>
            <NavbarItem hasDropdown isHoverable>
              <NavbarLink>User Name</NavbarLink>
              <NavbarDropdown>
                <NavbarItem href="/">Profile</NavbarItem>
                <NavbarItem href="/">Settings</NavbarItem>
                <NavbarDivider />
                <NavbarItem href="/">Logout</NavbarItem>
              </NavbarDropdown>
            </NavbarItem>
          </NavbarEnd>
        </NavbarMenu>
      </Navbar>
    );
  }
}

export default Header;
