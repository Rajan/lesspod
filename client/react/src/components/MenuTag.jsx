import React, { Component } from 'react';
import dataStore from '../stores/dataStore';
import { deleteMenuFromFbase, deletePageFromFbase } from '../api/firebase';
import { showAlert } from '../utils/utils';

class MenuTag extends Component {
  state = {};
  render() {
    const { menu } = this.props;
    return (
      <button className="button" style={{ margin: '1rem' }}>
        {menu.name} &nbsp;
        <div
          className="tag is-danger is-delete"
          onClick={() => {
            deleteMenuFromFbase(menu.id).then(res => {
              if (res.error) {
                showAlert(res.error.message, 'error');
              } else {
                deletePageFromFbase(menu.pageId).then(response => {
                  if (response.error) {
                    showAlert(response.error.message, 'error');
                  } else {
                    showAlert('Menu & Page deleted', 'success');
                    dataStore.deleteMenu(menu);
                  }
                });
              }
            });
          }}
        />
      </button>
    );
  }
}

export default MenuTag;
