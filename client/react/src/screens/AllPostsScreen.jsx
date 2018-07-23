import React, { Component } from 'react';
import { view } from 'react-easy-state';

import Posts from '../components/Posts';
import { getAllPostsFromFbase } from '../api/firebase';
import Shimmer from '../components/Shimmer';
import dataStore from '../stores/dataStore';
import PostsToolbar from '../components/PostsToolbar';

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
    const posts = dataStore.getFilteredPosts();
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
                  <PostsToolbar />
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
