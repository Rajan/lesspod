import React, { Component } from 'react';
import dayjs from 'dayjs';
import ReactHtmlParser from 'react-html-parser';
import { view } from 'react-easy-state';

import { getPostWithSlugFromFbase } from '../api/firebase';
import Shimmer from './../components/Shimmer';
import DisqusEmbed from '../components/DisqusEmbed';
import dataStore from '../stores/dataStore';
import LatestPosts from '../components/LatestPosts';
// import Tags from '../components/Tags';
import { SocialActions } from '../components/SocialActions';
import SubscribeBar from '../components/SubscribeBar';

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
      slug: '',
      content: '',
      tags: '',
      author: '',
      createdAt: '',
      isLoading: true,
    };
    dataStore.posts = [];
  }

  componentDidMount() {
    const { state } = this.props.history.location;
    if (state && state.post) {
      const { post } = state;
      this.setState({
        id: post.id,
        title: post.title,
        slug: post.slug,
        content: post.content,
        tags: post.tags,
        author: post.author,
        createdAt: post.createdAt,
        isLoading: false,
      });
    } else {
      this.renderPostFromFbase(this.props.match.params.slug);
    }
  }

  static getDerivedStateFromProps(newProps, prevState) {
    if (newProps.match.params.slug !== prevState.slug) {
      return { slug: newProps.match.params.slug };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.slug !== this.state.slug) {
      this.setState({ isLoading: true });
      this.renderPostFromFbase(this.state.slug);
    }
  }

  renderPostFromFbase = slug => {
    getPostWithSlugFromFbase(slug).then(response => {
      if (response.error) {
        console.log(response.error.message);
      } else {
        const post = response.data;
        if (post) {
          this.setState({
            id: post.id,
            title: post.title,
            slug: post.slug,
            content: post.content,
            tags: post.tags,
            author: post.author,
            createdAt: post.createdAt,
            isLoading: false,
          });
        } else {
          this.setState({ isLoading: false, title: '404 Post Not Found' });
        }
      }
    });
  };

  render() {
    const { title, slug, content, author, createdAt, isLoading } = this.state;
    return (
      <div style={{ backgroundColor: '#FFFFFF', height: '100vh' }}>
        {isLoading ? (
          <div style={styles.loaderContainer}>
            <Shimmer style={{ width: 600, height: 400 }} />
          </div>
        ) : (
          <section className="section" style={{ backgroundColor: '#ffffff' }}>
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
                            {createdAt && (
                              <span>
                                {dayjs(createdAt).format('MMMM D, YYYY')} . {author}
                              </span>
                            )}
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
                  <br />

                  {/* {tags.length > 0 && (
                    <div className="tags">
                      <Tags data={tags.split(' ')} />
                    </div>
                  )} */}
                  <input type="hidden" name="slug" id="slug" value={slug} />
                </div>
                <div className="column is-two-thirds has-text-centered">
                  <h2 className="title">Latest Posts</h2>
                  <LatestPosts />
                  <br />
                  <h2 className="title">Comments</h2>
                  <div className="comments">
                    <DisqusEmbed id={slug} title={title} />
                  </div>
                </div>
              </div>
            </div>
            <SocialActions title={title} />
            <SubscribeBar />
          </section>
        )}
      </div>
    );
  }
}

export default view(ViewPostScreen);
