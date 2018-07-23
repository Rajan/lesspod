import React from 'react';
import { Link } from 'react-router-dom';

import userStore from '../stores/userStore';
import { isExternalLink, dashedString } from '../utils/utils';

const getPath = menu => {
  if (userStore.profileData && userStore.profileData.id === menu.createdBy) {
    return `/editpage/${dashedString(menu.name)}`;
  }
  return `/${dashedString(menu.name)}`;
};

const NavbarUserMenus = data =>
  data.map(d => {
    if (isExternalLink(d.linkedURL)) {
      return (
        <div className="navbar-item" key={d.id}>
          <a href={d.linkedURL} target="_blank" rel="noopener noreferrer">
            {d.name}
          </a>
        </div>
      );
    }

    return (
      <div className="navbar-item" key={d.id}>
        <Link
          to={{
            pathname: `${getPath(d)}`,
            state: {
              page: {
                title: d.name,
                id: d.pageId,
              },
            },
          }}
        >
          {d.name}
        </Link>
      </div>
    );
  });

export default NavbarUserMenus;
