import React, { Component } from 'react';
import { View } from 'react-native';
import { view } from 'react-easy-state';

import dataStore from '../stores/dataStore';
import { getAllPostsFromFbaseByUser, logoutFirebase } from '../api/firebase';
import userStore from '../stores/userStore';
import { showAlert } from '../utils/utils';
import Shimmer from '../components/Shimmer';
import Posts from '../components/Posts';
import CustomSearchBar from '../components/CustomSearchBar';
import { Button } from '../../node_modules/react-native-elements';

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    dataStore.posts = [];
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
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
    const posts = dataStore.getFilteredPosts();

    return (
      <View>
        <CustomSearchBar />
        {/* <View>
          <Button title="LOGOUT" onPress={() => logoutFirebase()} />
        </View> */}
        {this.state.isLoading ? <View /> : <Posts data={posts} />}
        {/* <Button
          title="Logout"
          titleStyle={{ fontWeight: '600' }}
          buttonStyle={{
            borderWidth: 0,
            borderRadius: 5,
          }}
          onPress={() => {
            logoutFirebase();
          }}
        /> */}
      </View>
    );
  }
}

export default view(HomeScreen);
