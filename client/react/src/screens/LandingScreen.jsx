import React from 'react';
import { Link } from 'react-router-dom';
import GitHubButton from 'react-github-button';
import 'react-github-button/assets/style.css';

import Navbar from './../components/Navbar';
import ServerlessImage from './../assets/images/serverless.png';

class LandingScreen extends React.Component {
  componentDidMount() {
    if (window.location.pathname !== '/standaloneapp') {
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <section className="section">
          <div className="hero-body">
            <div className="container has-text-centered">
              <div className="columns is-vcentered">
                <div className="column is-5">
                  <figure className="image is-4by3">
                    <img src={ServerlessImage} alt="Description" />
                  </figure>
                  <br />
                  <h6 className="title is-6" style={{ fontWeight: 300 }}>
                    Image credits: Hackernoon
                  </h6>
                </div>
                <div className="column is-6 is-offset-1 has-text-left">
                  <h1 className="title">Serverless Websites</h1>
                  <h2 className="subtitle is-4 ">
                    <br />
                    Lesspod lets anyone build and deploy website+blog combination to serverless platforms (starting with{' '}
                    <Link to="https://firebase.google.com/pricing/" target="_blank">
                      Firebase
                    </Link>). Key benefits:
                  </h2>
                  <div className="content" style={{ fontSize: '1.3rem' }}>
                    <ul className="has-text-left block" style={{ marginBottom: '0.5rem' }}>
                      <li>No fixed yearly/monthly hosting fees.</li>
                      <li>Infinite scalability of the cloud.</li>
                      <li>Free hosting till you're very popular!</li>
                    </ul>
                    <span style={{ color: 'green' }}>
                      This is a <em>serverless website</em> hosted freely on Firebase.
                    </span>
                  </div>
                  <p className="has-text-left">
                    <b style={{ fontSize: '1.3rem', paddingBottom: '1rem' }}>Star us on Github or Follow on Twitter:</b>
                    <br />
                    <br />
                    <a href="https://github.com/Rajan/lesspod" target="_blank" rel="noopener noreferrer">
                      <GitHubButton type="stargazers" size="large" namespace="rajan" repo="lesspod" />
                    </a>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <a className="twitter-follow-button" href="https://twitter.com/less_pod" data-size="large">
                      Follow
                    </a>
                  </p>
                </div>
              </div>
              <div className="columns has-text-centered is-multiline">
                <div className="column has-text-centered">
                  <br />
                  <br />
                  <h2 className="title" v-if="filteredPosts.length > 0">
                    Latest Posts
                  </h2>
                  <div className="columns is-multiline">
                    <div
                      v-for="(post, index) in filteredPosts.slice(0, 6)"
                      className="column is-12-tablet is-6-desktop is-4-widescreen"
                    >
                      <article className="box">
                        <div className="media">
                          <div className="media-content">
                            <p className="title is-5 is-spaced is-marginless">
                              <Link to="#">sss</Link>
                            </p>
                            <div className="content ">
                              <span className="content is-small">sss</span>
                              <br />
                              <p v-html="postSummary(post.content)" />
                            </div>
                          </div>
                        </div>
                      </article>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
        </section>
      </div>
    );
  }
}

export default LandingScreen;
