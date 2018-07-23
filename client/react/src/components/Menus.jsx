import React, { Component } from 'react';

import MenuTag from './MenuTag';
import { view } from 'react-easy-state';

class Menus extends Component {
  state = {};

  renderMenus = data => data.map(d => <MenuTag menu={d} key={d.id} />);
  render() {
    const menuData = this.props.data;
    return (
      <div className="column is-two-thirds">
        <h1 className="title">All Menus</h1>
        <div className="field is-grouped is-grouped-multiline">{this.renderMenus(menuData)}</div>
      </div>
    );
  }
}

export default view(Menus);
