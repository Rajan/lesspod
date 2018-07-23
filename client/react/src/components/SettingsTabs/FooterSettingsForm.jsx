import React from 'react';
import { Link } from 'react-router-dom';

import { showAlert } from './../../utils/utils';
import { saveSettingsToFbase } from './../../api/firebase';
import settingsStore from './../../stores/settingsStore';

const styles = {
  container: {
    minWidth: 350,
    flexDirection: 'column',
  },

  subText: {
    fontSize: 12,
    color: 'grey',
  },
};
class FooterSettingsForm extends React.Component {
  state = {
    isSaving: false,
    showNavigation: true,
    phoneNumber: '',
    aboutUs: '',
    address: '',
    email: '',
    facebookURL: '',
    twitterURL: '',
    showWidgets: true,
  };

  componentDidMount() {
    this.setState(settingsStore.footer);
  }

  handleInputChange = event => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  };

  onClickSave = () => {
    this.setState({ isSaving: true });
    const settingsData = {
      ...settingsStore,
      ...{ footer: this.state },
    };
    saveSettingsToFbase(settingsData).then(response => {
      this.setState({ isSaving: false });
      if (response.error) {
        showAlert(response.error.message, 'error');
      } else {
        settingsStore.footer = this.state;
        showAlert('Settings saved successfully', 'success');
      }
    });
  };

  render() {
    const {
      isSaving,
      showWidgets,
      showNavigation,
      aboutUs,
      phoneNumber,
      address,
      email,
      facebookURL,
      twitterURL,
    } = this.state;

    return (
      <div className="box" style={styles.container}>
        <div className="field">
          <label className="label">Footer Widgets</label>
          <div className="control">
            <label className="checkbox">
              <input type="checkbox" name="showWidgets" onChange={this.handleInputChange} checked={showWidgets} />
              &nbsp; Show widgets in footer (About, Address, Contact)
            </label>
          </div>
        </div>

        <div className="field">
          <label className="label">Navigation</label>
          <div className="control">
            <label className="checkbox">
              <input type="checkbox" name="showNavigation" onChange={this.handleInputChange} checked={showNavigation} />
              &nbsp; Show navigation links in footer
            </label>
          </div>
        </div>

        <div className="field">
          <label className="label">About Us</label>
          <div className="control has-icons-left">
            <textarea
              className="input"
              style={{ height: 100 }}
              id="aboutUs"
              name="aboutUs"
              value={aboutUs}
              placeholder="e.g. A small description"
              onChange={this.handleInputChange}
            />
            {/* <span className="icon is-small is-left">
              <i className="fa fa-user-circle" />
            </span> */}
          </div>
        </div>

        <div className="field">
          <label className="label">Address</label>
          <div className="control has-icons-left">
            <textarea
              className="input"
              style={{ height: 100 }}
              id="address"
              name="address"
              value={address}
              placeholder="e.g. 311, Mount View, CA"
              onChange={this.handleInputChange}
            />
            {/* <span className="icon is-small is-left">
              <i className="fa fa-user-circle" />
            </span> */}
          </div>
        </div>

        <div className="field">
          <label className="label">Telephone</label>
          <div className="control has-icons-left">
            <input
              className="input"
              type="name"
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              placeholder="e.g. +XX XXX XXX XXXX"
              onChange={this.handleInputChange}
            />
            {/* <span className="icon is-small is-left">
              <i className="fa fa-user-circle" />
            </span> */}
          </div>
        </div>

        <div className="field">
          <label className="label">Email</label>
          <div className="control has-icons-left">
            <input
              className="input"
              type="name"
              id="email"
              name="email"
              value={email}
              placeholder="e.g. contact@company.com"
              onChange={this.handleInputChange}
            />
            {/* <span className="icon is-small is-left">
              <i className="fa fa-user-circle" />
            </span> */}
          </div>
        </div>

        <div className="field">
          <label className="label">Facebook</label>
          <div className="control has-icons-left">
            <input
              className="input"
              type="name"
              id="facebookURL"
              name="facebookURL"
              value={facebookURL}
              placeholder="e.g. http://facebook.com/my-website"
              onChange={this.handleInputChange}
            />
            {/* <span className="icon is-small is-left">
              <i className="fa fa-user-circle" />
            </span> */}
          </div>
        </div>

        <div className="field">
          <label className="label">Twitter</label>
          <div className="control has-icons-left">
            <input
              className="input"
              type="name"
              id="twitterURL"
              name="twitterURL"
              value={twitterURL}
              placeholder="e.g. http://twitter.com/my-website"
              onChange={this.handleInputChange}
            />
            {/* <span className="icon is-small is-left">
              <i className="fa fa-user-circle" />
            </span> */}
          </div>
        </div>

        <div className="field is-grouped" style={{ marginTop: '2rem' }}>
          <div className="control">
            <div
              className={`button is-info ${isSaving ? 'is-loading' : ''}`}
              onClick={() => {
                this.onClickSave();
              }}
            >
              Save Settings
            </div>
          </div>
          <div className="control">
            <Link to="/home">
              <div className="button is-text" style={{ textDecoration: 'none', color: '#0271D3' }}>
                Cancel
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default FooterSettingsForm;
