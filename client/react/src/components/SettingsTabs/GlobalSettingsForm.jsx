import React from 'react';
import { Link } from 'react-router-dom';

import { showAlert } from './../../utils/utils';
import { saveSettingsToFbase, uploadLogoToFbase } from './../../api/firebase';
import settingsStore from './../../stores/settingsStore';
import { LOGO_SQUARE_SIDE, LOGO_HORIZONTAL_WIDTH, LOGO_HORIZONTAL_HEIGHT } from './../../config/Constants';
import { view } from 'react-easy-state';

const styles = {
  container: {
    minWidth: 350,
    flexDirection: 'column',
  },
  logoContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  squareLogo: {
    width: LOGO_SQUARE_SIDE * 2,
    height: LOGO_SQUARE_SIDE * 2,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundColor: '#f5f5f5',
  },
  horizontalLogo: {
    width: LOGO_HORIZONTAL_WIDTH * 2,
    height: LOGO_HORIZONTAL_HEIGHT * 2,
    backgroundColor: '#f5f5f5',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 25,
    marginBottom: 25,
  },
  loaderContainer: {
    height: 500,
    width: 300,
  },
  dimensionsText: {
    fontSize: 12,
    color: 'grey',
  },
};
class SettingsForm extends React.Component {
  state = {
    tagline: '',
    siteName: '',
    disableBlogMenu: false,
    disableNewRegistrations: false,
    squareLogoURL: '',
    horizontalLogoURL: '',
    isSaving: false,
  };

  componentDidMount() {
    this.setState(settingsStore.global);
  }

  onClickSave = () => {
    this.setState({ isSaving: true });
    const settingsData = {
      ...settingsStore,
      ...{ global: this.state },
    };
    saveSettingsToFbase(settingsData).then(response => {
      this.setState({ isSaving: false });
      if (response.error) {
        showAlert(response.error.message, 'error');
      } else {
        settingsStore.global = this.state;
        showAlert('Settings saved successfully', 'success');
      }
    });
  };

  handleInputChange = event => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  };

  handleFileUpload = (event, logoType) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      showAlert('Uploading image...');
      uploadLogoToFbase(imageFile, logoType).then(response => {
        const { error, data } = response;
        if (error) {
          showAlert(error.message, 'error');
        } else if (logoType === 'squareLogoURL') {
          showAlert('Square logo updated successfully', 'success');
          settingsStore.global.squareLogoURL = data;
          this.setState({
            squareLogoURL: data,
          });
        } else if (logoType === 'horizontalLogoURL') {
          showAlert('Horizontal logo updated successfully', 'success');
          settingsStore.global.horizontalLogoURL = data;
          this.setState({
            horizontalLogoURL: data,
          });
        }
      });
    }
  };

  render() {
    const {
      isSaving,
      siteName,
      tagline,
      squareLogoURL,
      horizontalLogoURL,
      disableBlogMenu,
      disableNewRegistrations,
    } = this.state;

    return (
      <div className="box" style={styles.container}>
        {/* <div style={styles.logoContainer}>
          <div style={styles.logo} />
          <div style={styles.logoText} />
        </div> */}
        <div>
          {/* <div className="field has-text-centered">
            <span className="icon" style={{ width: '3rem', height: '3rem' }}>
              <i className="fa fa-cog fas fa-3x" />
            </span>
            <br /> Site Settings <br />
          </div>
          <br /> */}
          <div className="field">
            <label className="label">Site Name</label>
            <div className="control has-icons-left">
              <input
                className="input"
                type="name"
                id="siteName"
                name="siteName"
                value={siteName}
                placeholder="e.g. My Website"
                onChange={this.handleInputChange}
              />
              {/* <span className="icon is-small is-left">
              <i className="fa fa-user-circle" />
            </span> */}
            </div>
          </div>

          <div className="field">
            <label className="label">Tag Line</label>
            <div className="control has-icons-left">
              <input
                className="input"
                type="name"
                id="tagline"
                name="tagline"
                value={tagline}
                placeholder="e.g. Serverless Blogging Engine"
                onChange={this.handleInputChange}
              />
              {/* <span className="icon is-small is-left">
              <i className="fa fa-user-circle" />
            </span> */}
            </div>
          </div>

          <div className="field">
            <label className="label">
              Square Logo
              <span style={styles.dimensionsText}>
                &nbsp;({LOGO_SQUARE_SIDE * 2}px * {LOGO_SQUARE_SIDE * 2}px)
              </span>
              &nbsp; &nbsp; &nbsp;
              <i
                className="fa fa-trash"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  settingsStore.global.squareLogoURL = '';
                  this.setState({ squareLogoURL: '' });
                }}
              />
            </label>
            <div className="control has-icons-left">
              <div className="file has-name is-boxed">
                <label className="file-label">
                  <input
                    className="file-input"
                    type="file"
                    name="logo"
                    accept="image/*"
                    onChange={e => {
                      this.handleFileUpload(e, 'squareLogoURL');
                    }}
                    style={{ opacity: 0 }}
                  />
                  {squareLogoURL && squareLogoURL.length > 1 ? (
                    <div
                      style={{
                        ...styles.squareLogo,
                        ...{
                          backgroundImage: `url(${squareLogoURL})`,
                        },
                      }}
                    />
                  ) : (
                    <span className="file-cta">
                      <span className="file-icon">
                        <i className="fa fa-upload" />
                      </span>
                      <span className="file-label">Choose a file…</span>
                    </span>
                  )}
                </label>
              </div>
            </div>
          </div>
          <br />
          <div className="field">
            <label className="label">
              Site Logo
              <span style={styles.dimensionsText}>
                &nbsp;({LOGO_HORIZONTAL_WIDTH * 2}px * {LOGO_HORIZONTAL_HEIGHT * 2}px)
              </span>
              &nbsp; &nbsp; &nbsp;
              <i
                className="fa fa-trash"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  settingsStore.global.horizontalLogoURL = '';
                  this.setState({ horizontalLogoURL: '' });
                }}
              />
            </label>
            <div className="control has-icons-left">
              <div className="file has-name is-boxed">
                <label className="file-label">
                  <input
                    className="file-input"
                    type="file"
                    name="logo"
                    accept="image/*"
                    onChange={e => {
                      this.handleFileUpload(e, 'horizontalLogoURL');
                    }}
                    style={{ opacity: 0 }}
                  />
                  {horizontalLogoURL && horizontalLogoURL.length > 1 ? (
                    <div
                      style={{
                        ...styles.horizontalLogo,
                        ...{
                          backgroundImage: `url(${horizontalLogoURL})`,
                        },
                      }}
                    />
                  ) : (
                    <span className="file-cta">
                      <span className="file-icon">
                        <i className="fa fa-upload" />
                      </span>
                      <span className="file-label">Choose a file…</span>
                    </span>
                  )}
                </label>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label">Blog Menu</label>
            <div className="control">
              <label className="checkbox">
                <input
                  type="checkbox"
                  name="disableBlogMenu"
                  checked={disableBlogMenu}
                  onChange={this.handleInputChange}
                />
                &nbsp; Disable Blog Menu
              </label>
            </div>
          </div>
          <div className="field">
            <label className="label">New Registrations</label>
            <div className="control">
              <label className="checkbox">
                <input
                  type="checkbox"
                  name="disableNewRegistrations"
                  onChange={this.handleInputChange}
                  checked={disableNewRegistrations}
                />
                &nbsp; Disable New Registrations
              </label>
            </div>
          </div>
          <div className="field is-grouped" style={{ marginTop: '2rem' }}>
            <div className="control">
              <div
                href="#"
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
      </div>
    );
  }
}

export default view(SettingsForm);
