import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import userStore from '../stores/userStore';
import { logoutFirebase } from '../api/firebase';
import { view } from 'react-easy-state';

class LoginNavItem extends React.Component {
  navigate = path => {
    this.props.history.push(path);
  };

  render() {
    if (userStore.profileData) {
      return (
        <div className="navbar-item has-dropdown is-hoverable">
          <div className="navbar-link">
            {userStore.profileData.first} {userStore.profileData.last}
          </div>
          <div className="navbar-dropdown is-right">
            <a
              className="navbar-item"
              onClick={() => {
                this.navigate('/profile');
              }}
            >
              <span className="icon is-small">
                <i className="fa fa-user-circle" />
              </span>&nbsp; Profile
            </a>
            <a
              className="navbar-item"
              onClick={() => {
                this.navigate('/settings');
              }}
            >
              <span className="icon is-small">
                <i className="fa fa-cog" />
              </span>&nbsp; Settings
            </a>
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

export default withRouter(view(LoginNavItem));
