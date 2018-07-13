import React, { Component } from 'react';

import NavBar from '../components/Navbar';
import Editor from '../components/Editor';
import editorStore from './../stores/editorStore';

class NewPostScreen extends Component {
  render() {
    return (
      <div style={{ backgroundColor: '#FFFFFF', height: '100vh' }}>
        <NavBar />
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

                <button href="#" className="button is-primary" onClick={() => console.log(editorStore.content)}>
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
