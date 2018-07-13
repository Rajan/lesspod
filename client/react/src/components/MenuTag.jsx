import React, { Component } from 'react';

class MenuTag extends Component {
  state = {};
  render() {
    const { menu } = this.props;
    return (
      <button className="button" style={{ margin: '1rem' }}>
        {menu.name} &nbsp;
        <div className="tag is-danger is-delete" />
      </button>
    );
  }
}

export default MenuTag;
