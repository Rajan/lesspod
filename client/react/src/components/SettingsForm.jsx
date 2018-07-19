import React from 'react';
import { Link } from 'react-router-dom';

import CustomLoader from './../components/CustomLoader';
import { showAlert } from '../utils/utils';
import { saveSettingsToFbase, uploadLogoToFbase } from '../api/firebase';
import settingsStore from '../stores/settingsStore';
import { LOGO_SQUARE_SIDE, LOGO_HORIZONTAL_WIDTH, LOGO_HORIZONTAL_HEIGHT } from '../config/Constants';

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
    backgroundColor: '#f5f5f5',
  },
  horizontalLogo: {
    width: LOGO_HORIZONTAL_WIDTH * 2,
    height: LOGO_HORIZONTAL_HEIGHT * 2,
    backgroundColor: '#f5f5f5',
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
    disableBlogMenu: false,
    disableNewRegistrations: false,
    squareLogoURL: '',
    horizontalLogoURL: '',
    isLoading: true,
    isSaving: false,
  };

  componentDidMount() {
    this.setState(settingsStore.global);
  }

  onClickSave = () => {
    this.setState({ isSaving: true });
    saveSettingsToFbase(this.state).then(response => {
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
          this.setState({
            squareLogoURL: data,
          });
        } else if (logoType === 'horizontalLogoURL') {
          showAlert('Horizontal logo updated successfully', 'success');
          this.setState({
            horizontalLogoURL: data,
          });
        }
      });
    }
  };

  render() {
    const {
      isLoading,
      isSaving,
      tagline,
      horizontalLogoURL,
      squareLogoURL,
      disableBlogMenu,
      disableNewRegistrations,
    } = this.state;

    return (
      <div className="box" style={styles.container}>
        {/* <div style={styles.logoContainer}>
          <div style={styles.logo} />
          <div style={styles.logoText} />
        </div> */}

        {isLoading ? (
          <div style={styles.loaderContainer}>
            <CustomLoader />
          </div>
        ) : (
          <div>
            <div className="field has-text-centered">
              <span className="icon" style={{ width: '3rem', height: '3rem' }}>
                <i className="fa fa-cog fas fa-3x" />
              </span>
              <br /> Site Settings
            </div>
            <div className="field">
              <label className="label">
                Square Logo
                <span style={styles.dimensionsText}>
                  &nbsp;({LOGO_SQUARE_SIDE * 2}px * {LOGO_SQUARE_SIDE * 2}px)
                </span>
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
                    {squareLogoURL.length > 1 ? (
                      <div style={styles.squareLogo}>
                        <div
                          style={{
                            width: LOGO_SQUARE_SIDE * 2,
                            height: LOGO_SQUARE_SIDE * 2,
                            backgroundImage: `url(${squareLogoURL})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                          }}
                        />
                      </div>
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
                Horizontal Logo
                <span style={styles.dimensionsText}>
                  &nbsp;({LOGO_HORIZONTAL_WIDTH * 2}px * {LOGO_HORIZONTAL_HEIGHT * 2}px)
                </span>
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
                    {horizontalLogoURL.length > 1 ? (
                      <div style={styles.horizontalLogo}>
                        <div
                          style={{
                            width: LOGO_HORIZONTAL_WIDTH * 2,
                            height: LOGO_HORIZONTAL_HEIGHT * 2,
                            backgroundImage: `url(${horizontalLogoURL})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                          }}
                        />
                      </div>
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
        )}
      </div>
    );
  }
}

export default SettingsForm;
