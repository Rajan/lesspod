import React from 'react';
import { Link } from 'react-router-dom';
import { view } from 'react-easy-state';

import userStore from './../stores/userStore';
import Posts from '../components/Posts';
import Menus from '../components/Menus';
import { getAllPostsFromFbaseByUser } from '../api/firebase';
import Shimmer from '../components/Shimmer';
import { showAlert, generateFakePosts } from '../utils/utils';
import dataStore from '../stores/dataStore';

const styles = {
  bodyContainer: {
    // height: '100vh',
    // backgroundColor: '#F5F5F5',
  },
};

class HomeScreen extends React.Component {
  state = {
    isLoading: true,
  };

  componentDidMount() {
    // generateFakePosts(20);

    getAllPostsFromFbaseByUser(userStore.profileData.id).then(response => {
      if (response.error) {
        showAlert(response.error.message);
      } else {
        dataStore.posts = response.data;
        this.setState({ isLoading: false });
      }
    });
  }

  render() {
    const { posts, menus } = dataStore;
    let fullName;
    if (userStore.profileData) {
      fullName = `${userStore.profileData.first} ${userStore.profileData.last}`.toUpperCase();
    }
    return (
      <div>
        <div style={styles.bodyContainer}>
          <section className="section">
            <div className="container">
              <div className="columns is-centered is-multiline">
                <Menus data={menus} />
                <div className="column is-two-thirds">
                  <h1 className="title">All Posts by {fullName}</h1>
                </div>
                <div className="column is-two-thirds">
                  <nav className="level">
                    <div className="level-left">
                      <div className="level-item">
                        <p className="subtitle is-5">
                          <strong>{posts.length}</strong> Posts
                        </p>
                      </div>

                      <div className="level-item">
                        <Link to="/newpost">
                          <div className="button is-success">New Post</div>
                        </Link>
                      </div>

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

export default view(HomeScreen);
