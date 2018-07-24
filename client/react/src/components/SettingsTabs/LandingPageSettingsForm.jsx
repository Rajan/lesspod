import React from 'react';
import { Link } from 'react-router-dom';
import { view } from 'react-easy-state';

import settingsStore from '../../stores/settingsStore';
import { saveSettingsToFbase, uploadImageToFbase } from '../../api/firebase';
import { showAlert } from '../../utils/utils';
import { FEATURED_IMAGE_SIDE } from '../../config/Constants';

const styles = {
  container: {
    minWidth: 350,
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 25,
    marginBottom: 25,
  },
  subText: {
    fontSize: 12,
    color: 'grey',
  },
  featuredImage: {
    width: 250,
    height: 250,
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundColor: '#f5f5f5',
  },
};
class LandingPageSettingsForm extends React.Component {
  state = {
    isSaving: false,
    headline: '',
    description: '',
    subtitle: '',
    subtitlePoints: '',
    summary: '',
    showLatestPosts: '',
    featuredImageURL: '',
    featuredImageCaption: '',
  };

  componentDidMount() {
    this.setState(settingsStore.landingPage);
  }

  onClickSave = () => {
    this.setState({ isSaving: true });
    const settingsData = {
      ...settingsStore,
      ...{ landingPage: this.state },
    };
    saveSettingsToFbase(settingsData).then(response => {
      this.setState({ isSaving: false });
      if (response.error) {
        showAlert(response.error.message, 'error');
      } else {
        settingsStore.landingPage = this.state;
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
      uploadImageToFbase(imageFile, logoType).then(response => {
        const { error, data } = response;
        if (error) {
          showAlert(error.message, 'error');
        } else {
          showAlert('Featured image uploaded successfully', 'success');
          settingsStore.landingPage.featuredImageURL = data.publicURL;
          this.setState({
            featuredImageURL: data.publicURL,
          });
        }
      });
    }
  };

  render() {
    const {
      isSaving,
      headline,
      description,
      subtitle,
      subtitlePoints,
      summary,
      showLatestPosts,
      featuredImageURL,
      featuredImageCaption,
    } = this.state;

    return (
      <div className="box" style={styles.container}>
        <div className="field">
          <label className="label">Headline</label>
          <div className="control has-icons-left">
            <input
              className="input"
              type="name"
              id="headline"
              name="headline"
              value={headline}
              placeholder="e.g. This is what we do"
              onChange={this.handleInputChange}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Description</label>
          <div className="control has-icons-left">
            <input
              className="input"
              type="name"
              id="description"
              name="description"
              value={description}
              placeholder="e.g. A small decsription"
              onChange={this.handleInputChange}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Subtitle</label>
          <div className="control has-icons-left">
            <input
              className="input"
              type="name"
              id="subtitle"
              name="subtitle"
              value={subtitle}
              placeholder="e.g. Key Benefits"
              onChange={this.handleInputChange}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Subtitle Points</label>
          <div className="control has-icons-left">
            <textarea
              className="input"
              style={{ height: 100 }}
              id="subtitlePoints"
              name="subtitlePoints"
              value={subtitlePoints}
              placeholder="Enter each sentence in a new line"
              onChange={this.handleInputChange}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Summary</label>
          <div className="control has-icons-left">
            <input
              className="input"
              type="name"
              id="summary"
              name="summary"
              value={summary}
              placeholder="e.g. This is why you need to "
              onChange={this.handleInputChange}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Latest Posts</label>
          <div className="control">
            <label className="checkbox">
              <input
                type="checkbox"
                id="showLatestPosts"
                name="showLatestPosts"
                checked={showLatestPosts}
                onChange={this.handleInputChange}
              />
              &nbsp; Show Latest Posts
            </label>
          </div>
        </div>
        <br />
        <div className="field">
          <label className="label">
            Featured Image
            <span style={styles.hintText}>
              &nbsp;({FEATURED_IMAGE_SIDE}px * {FEATURED_IMAGE_SIDE}px)
            </span>
            &nbsp; &nbsp; &nbsp;
            <i
              className="fa fa-trash"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                settingsStore.landingPage.featuredImageURL = '';
                this.setState({ featuredImageURL: '' });
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
                    this.handleFileUpload(e, 'featuredImageURL');
                  }}
                  style={{ opacity: 0 }}
                />
                {featuredImageURL && featuredImageURL.length > 1 ? (
                  <div
                    style={{
                      ...styles.featuredImage,
                      ...{
                        backgroundImage: `url(${featuredImageURL})`,
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
          <label className="label">Featured Image Caption</label>
          <div className="control has-icons-left">
            <input
              className="input"
              type="name"
              id="featuredImageCaption"
              name="featuredImageCaption"
              value={featuredImageCaption}
              placeholder="e.g. Source for this image"
              onChange={this.handleInputChange}
            />
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

export default view(LandingPageSettingsForm);
