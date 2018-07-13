import React from 'react';
import { withRouter } from 'react-router-dom';

import PostCard from './PostCard';

class Posts extends React.Component {
  renderPosts = data => data.map(d => <PostCard key={d.id} post={d} />);

  render() {
    const postsData = this.props.data;
    return (
      <div className="columns is-multiline">
        <div className="column is-12-tablet is-6-desktop is-4-widescreen">{this.renderPosts(postsData)}</div>
      </div>
    );
  }
}

export default withRouter(Posts);
