import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import dataStore from '../stores/dataStore';
import { deleteMenuFromFbase, deletePageFromFbase } from '../api/firebase';
import { showAlert, isExternalLink, dashedString } from '../utils/utils';
import userStore from '../stores/userStore';

class MenuTag extends Component {
  state = {};

  onClickDelete = menu => {
    deleteMenuFromFbase(menu.id).then(res => {
      if (res.error) {
        showAlert(res.error.message, 'error');
      } else {
        deletePageFromFbase(menu.pageId).then(response => {
          if (response.error) {
            showAlert(response.error.message, 'error');
          } else {
            showAlert('Menu deleted', 'success');
            dataStore.deleteMenu(menu);
          }
        });
      }
    });
  };

  getPath = menu => {
    if (userStore.profileData && userStore.profileData.id === menu.createdBy) {
      return `/editpage/${dashedString(menu.name)}`;
    }
    return `/${dashedString(menu.name)}`;
  };

  render() {
    const { menu } = this.props;
    return (
      <div className="control">
        {isExternalLink(menu.linkedURL) ? (
          <div className="tags has-addons">
            <a className="tag is-white is-medium" href={menu.linkedURL} target="_blank" rel="noopener noreferrer">
              {menu.name}
            </a>
            <a
              className="tag is-white is-delete is-success is-medium"
              onClick={() => {
                this.onClickDelete(menu);
              }}
            />
          </div>
        ) : (
          <div className="tags has-addons">
            <Link
              className="tag is-white is-medium"
              to={{
                pathname: `${this.getPath(menu)}`,
                state: {
                  page: {
                    title: menu.name,
                    id: menu.pageId,
                  },
                },
              }}
            >
              {menu.name}
            </Link>
            <a
              className="tag is-white is-delete is-success is-medium"
              onClick={() => {
                this.onClickDelete(menu);
              }}
            />
          </div>
        )}
      </div>
    );
  }
}

export default MenuTag;
