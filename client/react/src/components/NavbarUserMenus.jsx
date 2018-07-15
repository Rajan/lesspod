import React from 'react';
import { Link } from 'react-router-dom';

import userStore from '../stores/userStore';
import { isExternalLink, dashedString } from '../utils/utils';

const getPath = name => {
  if (userStore.profileData) {
    return `/editpage/${dashedString(name)}`;
  }
  return `/${dashedString(name)}`;
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
            pathname: `${getPath(d.name)}`,
            state: {
              post: {
                title: d.name,
                id: d.postId,
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
