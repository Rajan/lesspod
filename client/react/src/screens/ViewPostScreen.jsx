import React, { Component } from 'react';
import dayjs from 'dayjs';
import { BounceLoader } from 'react-spinners';
import ReactHtmlParser from 'react-html-parser';

import Navbar from './../components/Navbar';
import { getPostFromFBase, getLatestPostsFromFbase } from '../api/firebase';
import { logoColor } from './../config/Colors';
import Posts from '../components/Posts';
import Shimmer from './../components/Shimmer';
import DisqusEmbed from '../components/DisqusEmbed';

const styles = {
  loaderContainer: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
};
class ViewPostScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      title: '',
      content: '',
      tags: '',
      author: '',
      isLoading: true,
      latestPosts: [],
    };
  }

  componentDidMount() {
    const { state } = this.props.history.location;
    if (state) {
      const { post } = state;
      this.setState({
        id: post.id,
        title: post.title,
        content: post.content,
        tags: post.tags,
        author: post.author,
        isLoading: false,
        shimmer: true,
      });
    } else {
      this.renderPostFromFbase(this.props.match.params.postId);
    }

    getLatestPostsFromFbase().then(response => {
      if (response.error) {
        console.log(response.error.message);
      } else {
        this.setState({ latestPosts: response.data, shimmer: false });
      }
    });
  }

  static getDerivedStateFromProps(newProps, prevState) {
    return newProps.location.state.post;
  }

  renderPostFromFbase = postId => {
    getPostFromFBase(postId).then(response => {
      if (response.error) {
        console.log(response.error.message);
      } else {
        const post = response.data;
        this.setState({
          id: post.id,
          title: post.title,
          content: post.content,
          tags: post.tags,
          author: post.author,
          isLoading: false,
        });
      }
    });
  };

  render() {
    const { id, title, content, tags, author, createdAt, isLoading, latestPosts, shimmer } = this.state;

    return (
      <div style={{ backgroundColor: '#FFFFFF', height: '100vh' }}>
        {/* <Navbar /> */}

        {isLoading ? (
          <div style={styles.loaderContainer}>
            <BounceLoader size={60} color={logoColor} loading={this.state.isLoading} />
          </div>
        ) : (
          <section className="section">
            <div className="container">
              <div className="columns is-centered is-multiline">
                <div className="column is-two-thirds">
                  <div className="field is-horizontal">
                    <div className="field-body">
                      <div className="field">
                        <p className="control has-text-centered">
                          <input
                            className="input has-text-centered is-large disabled"
                            style={{ fontWeight: 'bold', fontSize: '2rem' }}
                            id="title"
                            type="text"
                            placeholder="Post Title"
                            value={title}
                            readOnly
                          />
                          <span className="has-text-centered is-large disabled">
                            {dayjs(createdAt).format('MMMM D, YYYY')} . {author}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column is-two-thirds">
                  <span className="has-text-left" style={{ fontSize: '1.3rem' }}>
                    {ReactHtmlParser(content)}
                  </span>
                  <br />

                  {tags.length > 0 && (
                    <div className="tags">
                      <span
                        className="button is-link is-outlined is-small is-rounded"
                        style={{ marginRight: '0.6rem' }}
                      >
                        {tags}
                      </span>
                    </div>
                  )}
                  <input type="hidden" name="postId" id="postId" value="" />
                </div>
                <div className="column is-two-thirds has-text-centered">
                  <h2 className="title">Latest Posts</h2>
                  <br />
                  {shimmer ? <Shimmer /> : <Posts data={latestPosts} />}
                  <br />
                  <h2 className="title">Comments</h2>
                  <div className="comments">
                    <DisqusEmbed id={id} title={title} />
                  </div>
                </div>
              </div>
            </div>
            <div className="icon-bar">
              <a className="calm">
                <i className="fab fa-facebook-f" />
              </a>
              <a target="_blank" title="Share on Twitter" className="calm">
                <i className="fab fa-twitter" />
              </a>
              <a className="calm">
                <i className="fab fa-linkedin" />
              </a>
            </div>
          </section>
        )}
      </div>
    );
  }
}

export default ViewPostScreen;
