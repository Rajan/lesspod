import React, { Component } from 'react';

import Editor from '../components/Editor';
import editorStore from './../stores/editorStore';
import { getPostFromFBase, updatePostOnFbase, getPageWithSlugFromFbase } from '../api/firebase';
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

class EditPageScreen extends Component {
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
      const slug = this.props.match.params.pageId;
      getPageWithSlugFromFbase(slug).then(res => {
        if (res.error) {
          showAlert(res.error.message);
        } else {
          const post = res.data;
          this.setState({
            id: post.id,
            title: post.title,
            content: post.content,
            tags: post.tags,
            isLoading: false,
          });
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

  handleChange = event => {
    this.setState({ title: event.target.value });
  };

  savePost = () => {
    if (this.state.title && this.state.title.length > 1) {
      const postData = {
        id: this.state.id,
        title: this.state.title,
        content: editorStore.content,
        tags: this.state.tags.toString(),
      };

      updatePostOnFbase(postData).then(res => {
        this.setState({ isSaving: false });
        if (res.error) {
          showAlert(res.error.message, 'error');
        } else {
          showAlert('Post saved successfully!', 'success');
        }
      });
    } else {
      console.log('enter a title');
    }
  };

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
    const { title, content, isLoading, isSaving } = this.state;

    return (
      <div style={{ backgroundColor: '#FFFFFF', height: '100vh' }}>
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
                            onChange={event => {
                              this.handleChange(event);
                            }}
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column is-two-thirds">
                  <Editor value={content} />
                  <br />
                  <br />
                  <br />

                  <button
                    href="#"
                    className={`button is-primary ${isSaving ? 'is-loading' : ''}`}
                    onClick={() => {
                      this.setState({ isSaving: true });
                      this.savePost();
                    }}
                  >
                    Save Page
                  </button>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <input type="hidden" name="postId" id="postId" value="" />
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    );
  }
}

export default EditPageScreen;
