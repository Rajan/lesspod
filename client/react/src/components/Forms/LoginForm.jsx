import React from 'react';
import { view } from 'react-easy-state';
import { Textfit } from 'react-textfit';

import LogoMin from './../../assets/images/icon.png';
import { getUserProfileFromFbase, loginWithFirebase } from '../../api/firebase';
import userStore from './../../stores/userStore';
import { showAlert } from '../../utils/utils';
import settingsStore from '../../stores/settingsStore';
import { blueBg } from './../../config/Colors';

const styles = {
  logoContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    textAlign: 'center',
    marginBottom: 15,
    backgroundImage: `url(${LogoMin})`,
    width: 65,
    height: 65,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
  logoText: {
    textAlign: 'center',
    marginBottom: 15,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    fontSize: 24,
    color: blueBg,
    fontWeight: 'bold',
    width: '80%',
  },
};
class LoginForm extends React.Component {
  state = {
    email: '',
    password: '',
    isLoading: false,
  };

  onLoginClick = () => {
    this.setState({ isLoading: true });
    loginWithFirebase(this.state.email, this.state.password).then(response => {
      const { error, data } = response;
      if (error) {
        showAlert(error.message, 'error');
        this.setState({ isLoading: false });
      } else {
        getUserProfileFromFbase(data.user.uid).then(res => {
          this.setState({ isLoading: false });
          if (res.error) {
            showAlert(res.error.message, 'error');
          } else {
            userStore.profileData = res.data;
            this.props.history.push('/home');
          }
        });
      }
    });
  };

  onClickRegister = () => {
    if (settingsStore.global.disableNewRegistrations) {
      showAlert('New user registrations are disabled');
    } else {
      this.props.history.push('/register');
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
    return (
      <div className="box">
        <div style={styles.logoContainer}>
          <div style={styles.logo} />
          <div style={styles.logoText}>
            <Textfit mode="single" max={36}>
              {settingsStore.global.siteName}
            </Textfit>
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
              onChange={this.handleInputChange}
              required
            />
            <span className="icon is-small is-left">
              <i className="fa fa-envelope" />
            </span>
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control has-icons-left">
            <input
              className="input"
              type="password"
              id="password"
              name="password"
              placeholder="********"
              onChange={this.handleInputChange}
              required
            />
            <span className="icon is-small is-left">
              <i className="fa fa-lock" />
            </span>
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <label className="checkbox">
              <input type="checkbox" required />
              &nbsp; Remember me
            </label>
          </div>
          <div className="control">
            <a className="is-link is-small" style={{ textDecoration: 'none', color: '#0271D3' }}>
              Forgot Password?
            </a>
          </div>
        </div>
        <div className="field is-grouped" style={{ marginTop: '2rem' }}>
          <div className="control">
            <div
              href="#"
              className={`button is-info ${this.state.isLoading ? 'is-loading' : ''}`}
              onClick={() => {
                this.onLoginClick();
              }}
            >
              LOGIN
            </div>
          </div>
          <div className="control">
            <div
              className="button is-text"
              style={{ textDecoration: 'none', color: '#0271D3' }}
              onClick={() => {
                this.onClickRegister();
              }}
            >
              CREATE ACCOUNT
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default view(LoginForm);
