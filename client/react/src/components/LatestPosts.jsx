import React, { Component } from 'react';
import { view } from 'react-easy-state';

import { getLatestPostsFromFbase } from '../api/firebase';
import dataStore from '../stores/dataStore';
import { showAlert } from '../utils/utils';
import Shimmer from './Shimmer';
import Posts from './Posts';
import { LATEST_POSTS_LIMIT } from '../config/Constants';

class LatestPosts extends Component {
  constructor(props) {
    super(props);

    dataStore.posts = [];
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    dataStore.query = '';
    getLatestPostsFromFbase().then(response => {
      if (response.error) {
        showAlert(response.error.message);
      } else {
        dataStore.posts = response.data;
        this.setState({ isLoading: false });
      }
    });
  }

  render() {
    const posts = dataStore.getFilteredPosts().slice(0, LATEST_POSTS_LIMIT);

    return this.state.isLoading ? <Shimmer /> : <Posts data={posts} />;
  }
}

export default view(LatestPosts);
