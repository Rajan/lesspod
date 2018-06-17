import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { NavbarItem, NavbarDropdown, NavbarLink, NavbarDivider } from 'bloomer';

class LoginNavItem extends React.Component {
  render() {
    const { state } = this.props.history.location;
    if (state && state.user) {
      return (
        <NavbarItem hasDropdown isHoverable>
          <NavbarLink>{`${state.user.first} ${state.user.last}`}</NavbarLink>
          <NavbarDropdown>
            <NavbarItem>
              <Link to={{ pathname: '/profile', state: { user: state.user } }}>Profile</Link>
            </NavbarItem>
            <NavbarItem>
              <Link to="/settings">Settings</Link>
            </NavbarItem>
            <NavbarDivider />
            <NavbarItem>Logout</NavbarItem>
          </NavbarDropdown>
        </NavbarItem>
      );
    }
    return (
      <NavbarItem>
        <Link to="/login">Login</Link>
      </NavbarItem>
    );
  }
}

export default withRouter(LoginNavItem);
