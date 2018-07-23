import React from 'react';
import { Link } from 'react-router-dom';

import userStore from './../stores/userStore';
import { showAlert } from './../utils/utils';
import { updatePasswordinFbase, updateEmailinFbase, updateDataInFbase } from '../api/firebase';
import { USERS_COLLECTION } from '../config/Constants';

class ProfileScreen extends React.Component {
  state = {
    fullName: `${userStore.profileData.first} ${userStore.profileData.last}`,
    email: userStore.profileData.email,
    password: '',
    confirmPassword: '',
  };

  onClickSave = () => {
    const { fullName, email, password, confirmPassword } = this.state;

    const first = fullName.split(' ')[0];
    const last = fullName.split(' ')[1] ? fullName.split(' ')[1] : '';

    if (password !== confirmPassword) {
      showAlert('Passwords do not match', 'error');
    } else if (confirmPassword.length > 0) {
      updatePasswordinFbase(confirmPassword).then(res => {
        if (res.error) {
          showAlert(res.error.message, 'error');
        }
      });
    }

    if (userStore.profileData.email === email) {
      const profileData = {
        first,
        last,
      };
      updateDataInFbase(USERS_COLLECTION, userStore.profileData.id, profileData).then(res => {
        if (res.error) {
          showAlert(res.error.message, 'error');
        } else {
          showAlert('Profile updated successfully', 'success');
          userStore.profileData.first = first;
          userStore.profileData.last = last;
        }
      });
    } else {
      updateEmailinFbase(email).then(res => {
        if (res.error) {
          showAlert(res.error.message, 'error');
        } else {
          const profileData = {
            first,
            last,
            email,
          };
          updateDataInFbase(USERS_COLLECTION, userStore.profileData.id, profileData).then(res => {
            if (res.error) {
              showAlert(res.error.message, 'error');
            } else {
              showAlert('Profile updated successfully', 'success');
              userStore.profileData.first = first;
              userStore.profileData.last = last;
              userStore.profileData.email = email;
            }
          });
        }
      });
    }
  };

  handleInputChange = event => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const { fullName, email, password, confirmPassword } = this.state;
    return (
      <section className="hero is-info">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-5-tablet is-4-desktop is-4-widescreen">
                <div className="box">
                  <div className="field has-text-centered">
                    {/* <img src="../assets/images/logo-bis.png" width="167">  */}
                    <span className="icon" style={{ width: '3rem', height: '3rem' }}>
                      <i className="fa fa-user-circle fas fa-3x" />
                    </span>
                    {/* <img id="profile-pic" width="80" height="80" alt="" /> */}
                    <br />
                    User Profile
                  </div>
                  <div className="field">
                    <label className="label">Full Name (First Last)</label>
                    <div className="control has-icons-left">
                      <input
                        className="input"
                        type="text"
                        id="fullName"
                        name="fullName"
                        placeholder="e.g. Alex Johnson"
                        autoComplete="name"
                        value={fullName}
                        onChange={this.handleInputChange}
                        required
                      />
                      <span className="icon is-small is-left">
                        <i className="fa fa-user-circle" />
                      </span>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control has-icons-left">
                      <input
                        className="input"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="e.g. alexjohnson@gmail.com"
                        autoComplete="username"
                        value={email}
                        onChange={this.handleInputChange}
                        required
                      />
                      <span className="icon is-small is-left">
                        <i className="fa fa-envelope" />
                      </span>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">New Password</label>
                    <div className="control has-icons-left">
                      <input
                        className="input"
                        type="password"
                        id="password"
                        name="password"
                        placeholder="********"
                        autoComplete="new-password"
                        value={password}
                        onChange={this.handleInputChange}
                        required
                      />
                      <span className="icon is-small is-left">
                        <i className="fa fa-lock" />
                      </span>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Retype Password</label>
                    <div className="control has-icons-left">
                      <input
                        className="input"
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="********"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={this.handleInputChange}
                        required
                      />
                      <span className="icon is-small is-left">
                        <i className="fa fa-lock" />
                      </span>
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Update Profile Photo</label>
                    <div className="control has-icons-left">
                      <input type="button" value="Upload" id="uploadProfilePic" />
                    </div>
                  </div>
                  <div className="field is-grouped" style={{ marginTop: '1.5rem' }}>
                    <div className="control">
                      <button
                        className="button is-info"
                        onClick={() => {
                          this.onClickSave();
                        }}
                      >
                        Save Profile
                      </button>
                    </div>
                    <div className="control">
                      <Link to="/home">
                        <div className="button is-text" style={{ textDecoration: 'none' }} href="home">
                          Cancel
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ProfileScreen;
