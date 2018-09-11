import React from 'react';
import { Link } from 'react-router-dom';
import { view } from 'react-easy-state';

import { isExternalLink, dashedString, isParentMenu, isSubMenu } from '../utils/utils';

const getPath = menu =>
  // if (userStore.profileData && userStore.profileData.id === menu.createdBy) {
  //   return `/editpage/${dashedString(menu.name)}`;
  // }
  `/${dashedString(menu.name)}`;

class NavbarUserMenus extends React.Component {
  renderSubMenus = (parentMenu, allMenus) => (
    <div className="navbar-dropdown">
      {allMenus.map(menu => menu.parentMenuId === parentMenu.id && this.renderSubMenuItem([menu]))}
    </div>
  );

  renderSubMenuItem = data =>
    data.map(d => {
      if (isSubMenu(d) && isExternalLink(d.linkedURL)) {
        return this.renderExternalMenuItem(d, data);
      }

      return isSubMenu(d) && this.renderInternalMenuItem(d, data);
    });

  renderExternalMenuItem = (menu, allMenus) => {
    const showDropdown = isParentMenu(menu.id, allMenus);
    return (
      <div className={`navbar-item ${showDropdown ? 'has-dropdown is-hoverable' : ''}`} key={menu.id}>
        <a
          className={showDropdown ? 'navbar-link' : ''}
          href={menu.linkedURL}
          target="_blank"
          rel="noopener noreferrer"
        >
          {menu.name}
        </a>
        {showDropdown && this.renderSubMenus(menu, allMenus)}
      </div>
    );
  };

  renderInternalMenuItem = (menu, allMenus) => {
    const showDropdown = isParentMenu(menu.id, allMenus);
    return (
      <div className={`navbar-item ${showDropdown ? 'has-dropdown is-hoverable' : ''}`} key={menu.id}>
        <Link
          className={showDropdown ? 'navbar-link' : ''}
          to={{
            pathname: `${getPath(menu)}`,
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

        {showDropdown && this.renderSubMenus(menu, allMenus)}
      </div>
    );
  };

  render() {
    const { data } = this.props;
    return data.map(d => {
      if (!isSubMenu(d) && isExternalLink(d.linkedURL)) {
        return this.renderExternalMenuItem(d, data);
      }

      return !isSubMenu(d) && this.renderInternalMenuItem(d, data);
    });
  }
}

export default view(NavbarUserMenus);
