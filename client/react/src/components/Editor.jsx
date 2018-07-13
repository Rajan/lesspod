import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { view } from 'react-easy-state';

import editorStore from './../stores/editorStore';

class Editor extends Component {
  render() {
    return (
      <ReactQuill
        value={this.props.value}
        onChange={val => {
          editorStore.content = val;
        }}
      >
        <div style={{ height: '20rem', fontSize: '1.3rem' }} />
      </ReactQuill>
    );
  }
}

export default view(Editor);
