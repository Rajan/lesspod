import React, { Component } from 'react';

import Editor from '../components/Editor';
import editorStore from './../stores/editorStore';
import { addPostToFirebase } from '../api/firebase';
import userStore from '../stores/userStore';
import { showAlert } from '../utils/utils';

class NewPostScreen extends Component {
  state = {
    title: '',
    tags: [],
    isSaving: false,
  };

  handleChange = event => {
    this.setState({ title: event.target.value });
  };

  savePost = () => {
    if (this.state.title && this.state.title.length > 1) {
      const postData = {
        title: this.state.title,
        content: editorStore.content,
        tags: this.state.tags.toString(),
        author: `${userStore.profileData.first} ${userStore.profileData.last}`,
      };
      this.setState({ isSaving: true });

      addPostToFirebase(postData).then(res => {
        this.setState({ isSaving: false });
        if (res.error) {
          showAlert(res.error.message, 'error');
        } else {
          this.props.history.push('/home');
        }
      });
    } else {
      showAlert('enter a title');
    }
  };

  render() {
    return (
      <div style={{ backgroundColor: '#FFFFFF', height: '100vh' }}>
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
                <Editor />
                <br />
                <br />
                <br />

                <button
                  href="#"
                  className={`button is-primary ${this.state.isSaving ? 'is-loading' : ''}`}
                  onClick={() => {
                    this.savePost();
                  }}
                >
                  Save Post
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
      </div>
    );
  }
}

export default NewPostScreen;
