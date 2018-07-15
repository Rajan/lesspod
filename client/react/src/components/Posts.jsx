import React from 'react';
import { view } from 'react-easy-state';

import PostCard from './PostCard';

class Posts extends React.Component {
  renderPosts = data => data.map(d => <PostCard key={d.id} post={d} />);

  render() {
    const postsData = this.props.data;
    return <div className="columns is-multiline">{this.renderPosts(postsData)} </div>;
  }
}

export default view(Posts);
