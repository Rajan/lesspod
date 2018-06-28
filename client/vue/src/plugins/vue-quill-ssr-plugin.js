import Vue from 'vue';

import VueQuillEditor, { Quill } from 'vue-quill-editor/dist/ssr';

// import VueQuillEditor, { Quill } from 'vue-quill-editor/dist/ssr';
import { ImageDrop } from 'quill-image-drop-module';

// import ImageResize from 'quill-image-resize-module';
// import VueQuill1 from 'vue-quill-editor';
// require styles
// import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css';
// import 'quill/dist/quill.bubble.css'



Vue.use(VueQuillEditor);
window.Quill = Quill;
// window.Quill = Quill;
require('../assets/quill/quill-video-resize.css')


// register with Quill
// Import the format
// import { Video } from '../assets/quill/quill-video-resize.js'
// Quill.register({ 'formats/video': Video })

const ImageResize = require('quill-image-resize-module')

Quill.register('modules/imageResize', ImageResize)
Quill.register('modules/imageDrop', ImageDrop)

/// ///////////////////////////
const toolbar = [ [ 'image' ] ]
const modules = {
  toolbar,
  imageResize: true
}



import firebase from 'firebase';
import {FBASE_CONFIG, DEP_TARGET} from '../config';
// Initialize Firebase

firebase.initializeApp(FBASE_CONFIG);

import VModal from 'vue-js-modal';
Vue.use(VModal);

import Notify from 'vue2-notify';

Vue.use(Notify, {
  itemClass: 'notification',
  position: 'bottom-left'
});

const types = {
  info: {
    itemClass: 'is-info'
  },
  error: {
    itemClass: 'is-danger'
  },
  warning: {
    itemClass: 'is-warning'
  },
  success: {
    itemClass: 'is-success',
    iconClass: 'fa fa-lg fa-check-circle'
  }
};
Vue.$notify.setTypes(types);

import VueGitHubButtons from 'vue-github-buttons';

// Stylesheet
import 'vue-github-buttons/dist/vue-github-buttons.css';

Vue.use(VueGitHubButtons, { useCache: false });