import React from 'react';
import { ScrollView } from 'react-native';
import { view } from 'react-easy-state';

import PostCard from './PostCard';

class Posts extends React.Component {
  renderPosts = data => data.map(d => <PostCard key={d.id} post={d} />);

  render() {
    const postsData = this.props.data;
    return <ScrollView style={{ backgroundColor: '#F5F5F5' }}>{this.renderPosts(postsData)} </ScrollView>;
  }
}

export default view(Posts);
