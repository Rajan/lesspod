import React, { Component } from 'react';

import { getLatestPostsFromFbase } from '../api/firebase';
import dataStore from '../stores/dataStore';
import { showAlert } from '../utils/utils';
import Shimmer from './Shimmer';
import Posts from './Posts';

class LatestPosts extends Component {
  constructor(props) {
    super(props);

    dataStore.posts = [];
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
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
    return <div>{this.state.isLoading ? <Shimmer /> : <Posts data={dataStore.getFilteredPosts()} />}</div>;
  }
}

export default LatestPosts;
