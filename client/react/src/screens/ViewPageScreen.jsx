import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';

import { getPostFromFBase, getPostWithoutIdFromFbase } from '../api/firebase';
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
    if (state.post) {
      const { post } = state;
      this.renderPostFromFbase(post.id);
    } else {
      const slug = this.props.match.params.pageId;
      getPostWithoutIdFromFbase(slug).then(res => {
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

  handleChange = event => {
    this.setState({ title: event.target.value });
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
    const { title, content, isLoading } = this.state;

    return (
      <div style={{ backgroundColor: '#FFFFFF', height: '100vh' }}>
        {isLoading ? (
          <div style={styles.loaderContainer}>
            <Shimmer style={{ width: 600, height: 400 }} />
          </div>
        ) : (
          <section className="section">
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

export default EditPageScreen;
