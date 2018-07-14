import React from 'react';
import { Link } from 'react-router-dom';
import userStore from '../stores/userStore';
import { logoutFirebase } from '../api/firebase';

class LoginNavItem extends React.Component {
  render() {
    if (userStore.profileData) {
      return (
        <div className="navbar-item has-dropdown is-hoverable">
          <div className="navbar-link">
            {userStore.profileData.first} {userStore.profileData.last}
          </div>
          <div className="navbar-dropdown is-right">
            <Link to="/profile">
              <a className="navbar-item">
                <span className="icon is-small">
                  <i className="fa fa-user-circle" />
                </span>&nbsp; Profile
              </a>
            </Link>
            <Link to="/settings">
              <a className="navbar-item">
                <span className="icon is-small">
                  <i className="fa fa-cog" />
                </span>&nbsp; Settings
              </a>
            </Link>
            <a
              className="navbar-item"
              href="https://github.com/Rajan/lesspod/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>
                <span className="icon is-small">
                  <i className="fa fa-bug" />
                </span>&nbsp; Report bug
              </div>
            </a>
            <a
              className="navbar-item"
              onClick={() => {
                logoutFirebase();
              }}
            >
              <span className="icon is-small">
                <i className="fa fa-arrow-right" />
              </span>&nbsp; Sign Out
            </a>
          </div>
        </div>
      );
    }
    return (
      <div className="navbar-item">
        <Link to="/login">Login</Link>
      </div>
    );
  }
}

export default LoginNavItem;
