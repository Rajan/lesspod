import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Link } from 'react-router-native';
import HTML from 'react-native-render-html';
import dayjs from 'dayjs';

import { blueBg } from '../config/Colors';
import { deletePostFromFbase } from '../api/firebase';
import { showAlert } from '../utils/utils';
import dataStore from './../stores/dataStore';

const styles = {
  container: {
    backgroundColor: '#ffffff',
    padding: 15,
    margin: 10,
    borderRadius: 5,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  authorText: {
    fontSize: 14,
    color: 'grey',
  },
  contentText: {
    fontSize: 18,
  },
  actionText: {
    color: blueBg,
    fontSize: 16,
  },
};

class PostCard extends Component {
  getPostSummary = content => {
    let postSummary = content
      .replace(/<(?:.|\n)*?>/gm, '')
      .replace(/\./g, '. ')
      .replace(/,/g, ', ')
      .substring(0, 140);
    if (postSummary.length === 140) {
      postSummary += '...';
      return postSummary;
    }
    return postSummary;
  };

  deletePost = post => {
    deletePostFromFbase(post.id).then(response => {
      if (response.error) {
        showAlert(response.error.message, 'error');
      } else {
        dataStore.deletePost(post);
        showAlert('Post deleted!', 'success');
      }
    });
  };

  render() {
    const { post } = this.props;
    return (
      <View style={styles.container}>
        <View style={{ marginBottom: 10, marginTop: 10 }}>
          <Text style={styles.titleText}>{post.title}</Text>
        </View>
        <Text style={styles.authorText}>
          {dayjs(post.createdAt).format('MMMM D, YYYY')} . {post.author}
        </Text>
        <View style={{ marginBottom: 20, marginTop: 10 }}>
          <HTML html={this.getPostSummary(post.content)} imagesMaxWidth={Dimensions.get('window').width * 0.75} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Link
            to={{
              pathname: `/editpost/${post.id}`,
              state: {
                post,
              },
            }}
          >
            <Text style={styles.actionText}>Edit</Text>
          </Link>
          <Link
            to={{
              pathname: `/post/${post.id}`,
              state: {
                post,
              },
            }}
          >
            <Text style={styles.actionText}>View</Text>
          </Link>
          <Text
            style={styles.actionText}
            onPress={() => {
              this.deletePost();
            }}
          >
            Delete
          </Text>
        </View>
      </View>
    );
  }
}

export default PostCard;
