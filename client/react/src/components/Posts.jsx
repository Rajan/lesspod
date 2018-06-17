import React from 'react';
import { withRouter } from 'react-router-dom';

import PostCard from './PostCard';

const styles = {
  container: {
    marginTop: 50,
    display: 'flex',
    flexDirection: 'row',
  },
};

class Posts extends React.Component {
  renderPosts = data => data.map(d => <PostCard key={d.id} post={d} />);

  render() {
    const postsData = this.props.data;
    return <div style={styles.container}>{this.renderPosts(postsData)}</div>;
  }
}

export default withRouter(Posts);
