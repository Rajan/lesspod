import React from 'react';
import { Link } from 'react-router-dom';
import GitHubButton from 'react-github-button';
import 'react-github-button/assets/style.css';
import { view } from 'react-easy-state';
import ProgressiveImage from 'react-progressive-image';

import userStore from '../stores/userStore';
import LatestPosts from '../components/LatestPosts';
import settingsStore from '../stores/settingsStore';
import { FEATURED_IMAGE_SIDE } from '../config/Constants';

const styles = {
  featuredImage: {
    width: FEATURED_IMAGE_SIDE,
    height: FEATURED_IMAGE_SIDE,
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    // backgroundColor: '#f5f5f5',
  },
};
class LandingScreen extends React.Component {
  componentDidMount() {
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    document.body.appendChild(script);
  }

  renderSubtitlePoints = str => str.split('\n').map(s => <li>{s}</li>);

  render() {
    const {
      headline,
      description,
      subtitle,
      subtitlePoints,
      summary,
      showLatestPosts,
      featuredImageURL,
      featuredImageCaption,
    } = settingsStore.landingPage;
    return (
      <div style={{ backgroundColor: '#FFF' }}>
        <section className="section">
          <div className="hero-body">
            <div className="container has-text-centered">
              <div className="columns is-vcentered">
                <div className="column is-5">
                  <div
                    style={{
                      ...styles.featuredImage,
                      ...{
                        backgroundImage: `url(${featuredImageURL})`,
                      },
                    }}
                  />

                  <br />
                  <h6 className="title is-6" style={{ fontWeight: 300 }}>
                    <em>{featuredImageCaption}</em>
                  </h6>
                </div>
                <div className="column is-6 is-offset-1 has-text-left">
                  <h1 className="title is-4">{headline}</h1>
                  <h2 className="subtitle">
                    <br />
                    {description}
                  </h2>
                  <br />
                  <p className="title is-4"> {subtitle}</p>
                  <div className="content" style={{ fontSize: '1.3rem' }}>
                    <ul className="has-text-left block" style={{ marginBottom: '1rem' }}>
                      {this.renderSubtitlePoints(subtitlePoints)}
                    </ul>
                    <span style={{ color: 'green' }}>{summary}</span>
                  </div>
                  {settingsStore.global.siteName.toLowerCase() === 'lesspod' && (
                    <p className="has-text-left">
                      <b style={{ fontSize: '1.3rem', paddingBottom: '1rem' }}>
                        Star us on Github or Follow on Twitter:
                      </b>
                      <br />
                      <br />
                      <GitHubButton type="stargazers" size="large" namespace="rajan" repo="lesspod" />
                      &nbsp; &nbsp; &nbsp; &nbsp;
                      <a className="twitter-follow-button" href="https://twitter.com/less_pod" data-size="large">
                        Follow
                      </a>
                    </p>
                  )}
                </div>
              </div>
              {showLatestPosts && (
                <div className="columns has-text-centered is-multiline">
                  <div className="column has-text-centered">
                    <br />
                    <br />
                    <h2 className="title">Latest Posts</h2>
                    <LatestPosts />
                  </div>
                </div>
              )}
            </div>
          </div>

          {!userStore.profileData && (
            <div className="hero-foot">
              <div className="container">
                <div className="is-centered">
                  <div className="column has-text-centered" style={{ fontSize: '1.5rem' }}>
                    <Link to="/login">Login</Link>&nbsp;Or&nbsp;
                    <Link to="/register">Create Account</Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    );
  }
}

export default view(LandingScreen);
