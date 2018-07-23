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
        <div className="tags has-addons">{this.renderMenus(menuData)}</div>
        <div className="subtitle">
          Note: Clicking on the <div className="tag is-danger is-delete" /> will delete the menu/page permanently.
        </div>
      </div>
    );
  }
}

export default view(Menus);
