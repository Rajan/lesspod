import React, { Component } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { view } from 'react-easy-state';
import alertify from 'alertify.js';
import ImageResize from 'quill-image-resize-module-react';

import editorStore from './../stores/editorStore';
import { showAlert } from './../utils/utils';
import { uploadImageToFbase } from '../api/firebase';

import { Video } from './../libs/quill-video-resize/main';
import './../libs/quill-video-resize/main.css';

// import VideoResize from 'quill-video-resize-module';

class Editor extends Component {
  constructor(props) {
    super(props);

    this.editorRef = React.createRef();
    Quill.register({ 'formats/video': Video });
    Quill.register('modules/imageResize', ImageResize);
    // Quill.register('modules/VideoResize', VideoResize);
  }

  modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', { align: [] }], // 'underline', { align: [] }, 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image', 'video'],
      ],
      handlers: {
        image: () => this.imageHandler(),
        video: () => this.videoHandler(),
      },
    },
    imageResize: {
      parchment: Quill.import('parchment'),
    },
    // videoResize: {
    //   // See optional "config" below
    // }
  };

  imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = event => {
      const file = event.target.files[0];
      if (file) {
        showAlert('Uploading Image...');
        uploadImageToFbase(file).then(res => {
          const { error, data } = res;
          if (error) {
            showAlert(error.message, 'error');
          } else {
            const editor = this.editorRef.current.getEditor();
            const range = editor.getSelection();
            editor.insertEmbed(range.index, 'image', data.publicURL);
          }
        });
      }
    };
  };

  videoHandler = () => {
    const editor = this.editorRef.current.getEditor();
    const range = editor.getSelection();
    alertify.prompt('Enter video url', (value, event) => {
      const videoURL = value.replace('watch?v=', 'embed/');
      editor.insertEmbed(range.index, 'video', videoURL, 'user');
    });
  };

  render() {
    return (
      <ReactQuill
        ref={this.editorRef}
        value={this.props.value}
        onChange={val => {
          editorStore.content = val;
        }}
        modules={this.modules}
      >
        <div style={{ height: '20rem', fontSize: '1.3rem' }} />
      </ReactQuill>
    );
  }
}

export default view(Editor);
