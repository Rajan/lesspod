import React from 'react';
import { Link } from 'react-router-dom';
import GitHubButton from 'react-github-button';
import 'react-github-button/assets/style.css';

import ServerlessImage from './../assets/images/serverless.png';
import Posts from './../components/Posts';
import Shimmer from './../components/Shimmer';
import { getLatestPostsFromFbase } from '../api/firebase';

class LandingScreen extends React.Component {
  state = { posts: [], isLoading: true };

  componentDidMount() {
    if (window.location.pathname !== '/standaloneapp') {
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      document.body.appendChild(script);
    }

    getLatestPostsFromFbase().then(response => {
      if (response.error) {
        console.log(response.error.message);
      } else {
        this.setState({ posts: response.data, isLoading: false });
      }
    });
  }

  render() {
    return (
      <div style={{ backgroundColor: '#FFF' }}>
       
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
                    <GitHubButton type="stargazers" size="large" namespace="rajan" repo="lesspod" />
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
                  {this.state.isLoading ? <Shimmer /> : <Posts data={this.state.posts} />}
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
