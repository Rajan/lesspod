import React from 'react';
import { view } from 'react-easy-state';

import userStore from './../stores/userStore';
import Posts from '../components/Posts';
import Menus from '../components/Menus';
import { getAllPostsFromFbaseByUser } from '../api/firebase';
import Shimmer from '../components/Shimmer';
import { showAlert } from '../utils/utils';
import dataStore from '../stores/dataStore';
import PostsToolbar from '../components/PostsToolbar';
import {setGa} from '../utils/utils';


const styles = {
  bodyContainer: {
    // height: '100vh',
    // backgroundColor: '#F5F5F5',
  },
};

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    dataStore.posts = [];
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
	setGa(window.location.pathname);
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
    const { menus } = dataStore;
    const posts = dataStore.getFilteredPosts();

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

export default view(HomeScreen);
