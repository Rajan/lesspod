import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Title } from 'bloomer';

const styles = {
  container: {
    backgroundColor: '#FFFFFF',
    width: 300,
    height: 200,
    padding: 25,
    marginRight: 50,
    borderRadius: 5,
    boxShadow: '0 0px 0px 0 rgba(0, 0, 0, 0.2), 3px 3px 3px 0px rgba(0, 0, 0, 0.05)',
  },
};

class PostCard extends React.Component {
  render() {
    const { post } = this.props;
    return (
      <div style={styles.container}>
        <Title isSize={4}>
          <Link to={post.title}>{post.title}</Link>
        </Title>
        <span>{this.props.post.content}</span>
      </div>
    );
  }
}

export default withRouter(PostCard);
