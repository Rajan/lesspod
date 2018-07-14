import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Posts from '../components/Posts';

import { getAllPostsFromFbase } from '../api/firebase';
import userStore from '../stores/userStore';
import Shimmer from '../components/Shimmer';
import dataStore from '../stores/dataStore';
import { view } from 'react-easy-state';

const styles = {
  bodyContainer: {
    // height: '100vh',
    // backgroundColor: '#F5F5F5',
  },
};

class AllPostsScreen extends Component {
  constructor(props) {
    super(props);

    dataStore.posts = [];
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    getAllPostsFromFbase().then(response => {
      dataStore.posts = response.data;
      this.setState({ isLoading: false });
    });
  }

  render() {
    const { posts } = dataStore;
    return (
      <div>
        <div style={styles.bodyContainer}>
          <section className="section">
            <div className="container">
              <div className="columns is-centered is-multiline">
                <div className="column is-two-thirds">
                  <h1 className="title">All Blog Posts </h1>
                </div>
                <div className="column is-two-thirds">
                  <nav className="level">
                    <div className="level-left">
                      <div className="level-item">
                        <p className="subtitle is-5">
                          <strong>{posts.length}</strong> Posts
                        </p>
                      </div>

                      {!!userStore.profileData && (
                        <div className="level-item">
                          <Link to="/newpost">
                            <div className="button is-success">New Post</div>
                          </Link>
                        </div>
                      )}

                      <div className="level-item is-hidden-tablet-only">
                        <div className="field has-addons">
                          <p className="control">
                            <input className="input" type="text" placeholder="Search posts..." />
                          </p>
                          <p className="control">
                            <button className="button">Search</button>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="level-right">
                      <div className="level-item">Order by</div>
                      <div className="level-item">
                        <div className="select">
                          <select>
                            <option>Publish date</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </nav>
                  {this.state.isLoading ? <Shimmer /> : <Posts data={posts} />}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default view(AllPostsScreen);
