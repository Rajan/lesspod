import React, { Component } from 'react';

export class NavbarBurger extends Component {
  render() {
    return (
      <div role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </div>
    );
  }
}

export default NavbarBurger;
