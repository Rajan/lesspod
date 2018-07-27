import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import dataStore from '../stores/dataStore';
import { deleteMenuFromFbase, deletePageFromFbase } from '../api/firebase';
import {
  showAlert,
  isExternalLink,
  dashedString,
  confirmAlert,
  isParentMenu,
  isSubMenu,
  getParentMenu,
} from '../utils/utils';
import userStore from '../stores/userStore';

class MenuTag extends Component {
  state = {};

  onClickDelete = menu => {
    if (isParentMenu(menu.id, dataStore.menus)) {
      this.deleteParentAndChildMenus(menu);
    } else {
      confirmAlert(`Delete '${menu.name}' ?`, () => this.deleteSingleMenu(menu));
    }
  };

  getName = menu => {
    if (isSubMenu(menu)) {
      return `${getParentMenu(menu, dataStore.menus).name} → ${menu.name}`;
    }
    return menu.name;
  };

  getPath = menu => {
    if (userStore.profileData && userStore.profileData.id === menu.createdBy) {
      return `/editpage/${dashedString(menu.name)}`;
    }
    return `/${dashedString(menu.name)}`;
  };

  deleteParentAndChildMenus = menu => {
    confirmAlert(`Delete '${menu.name}' and all it's sub menus ?`, () => {
      // delete submenus first
      dataStore.menus.forEach(m => {
        if (m.parentMenuId === menu.id) {
          this.deleteSingleMenu(m);
        }
      });
      this.deleteSingleMenu(menu);
    });
  };

  deleteSingleMenu = menu => {
    deleteMenuFromFbase(menu.id).then(res => {
      if (res.error) {
        showAlert(res.error.message, 'error');
      } else {
        deletePageFromFbase(menu.pageId).then(response => {
          if (response.error) {
            showAlert(response.error.message, 'error');
          } else {
            showAlert(`${menu.name} deleted`, 'success');
            dataStore.deleteMenu(menu);
          }
        });
      }
    });
  };

  render() {
    const { menu } = this.props;
    return (
      <div className="control">
        {isExternalLink(menu.linkedURL) ? (
          <div className="tags has-addons">
            <a className="tag is-white is-medium" href={menu.linkedURL} target="_blank" rel="noopener noreferrer">
              {this.getName(menu)}
            </a>
            <div
              className="tag is-white is-delete is-success is-medium pointer"
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
              {this.getName(menu)}
            </Link>
            <Link
              className="tag is-info is-medium"
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
              Edit
            </Link>
            <div
              className="tag is-white is-delete is-success is-medium pointer"
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
