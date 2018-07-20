import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { withRouter } from 'react-router-dom';

import { getPostFromFBase, getPageWithSlugFromFbase } from '../api/firebase';
import Shimmer from '../components/Shimmer';
import { showAlert } from '../utils/utils';

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

class ViewPageScreen extends Component {
  state = {
    id: '',
    title: '',
    content: '',
    tags: '',
    isLoading: true,
  };

  componentDidMount() {
    const { state } = this.props.history.location;
    if (state && state.post) {
      const { post } = state;
      this.renderPostFromFbase(post.id);
    } else {
      const slug = this.props.history.location.pathname.replace('/', '');
      getPageWithSlugFromFbase(slug).then(res => {
        if (res.error) {
          showAlert(res.error.message);
        } else if (res.data) {
          const post = res.data;
          this.setState({
            id: post.id,
            title: post.title,
            content: post.content,
            tags: post.tags,
            isLoading: false,
          });
        } else {
          this.setState({ isLoading: false, title: '404 Page Not Found' });
        }
      });
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const nextState = nextProps.location.state;

    if (nextState && nextState.post) {
      if (nextState.post.id !== prevState.id) {
        return nextState.post;
      }
    }

    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.id !== this.state.id) {
      this.setState({ isLoading: true });
      this.renderPostFromFbase(this.state.id);
    }
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
          isLoading: false,
        });
      }
    });
  };

  render() {
    const { title, content, isLoading } = this.state;

    return (
      <div style={{ backgroundColor: '#ffffff', height: '100vh' }}>
        {isLoading ? (
          <div style={styles.loaderContainer}>
            <Shimmer style={{ width: 600, height: 400 }} />
          </div>
        ) : (
          <section className="section" style={{ backgroundColor: '#ffffff' }}>
            <div className="container">
              <div className="columns is-centered is-multiline has-text-centered">
                <div className="column is-two-thirds">
                  <div className="field is-horizontal">
                    <div className="field-body">
                      <div className="field">
                        <p className="control">
                          <input
                            className="input has-text-centered is-medium"
                            id="title"
                            type="text"
                            value={title}
                            placeholder="Post Title"
                            style={{ fontWeight: 'bold', fontSize: '2rem' }}
                            readOnly
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column is-two-thirds">
                  <span className="has-text-left" style={{ fontSize: '1.3rem' }}>
                    {ReactHtmlParser(content)}
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    );
  }
}

export default withRouter(ViewPageScreen);
