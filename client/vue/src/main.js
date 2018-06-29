// The Vue build version to load with the `import` command (runtime-only or
// standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import {DEP_TARGET} from './config';

import axios from 'axios';

// import App from './App';
import router from './router';
import store from './store';

import InputTag from 'vue-input-tag';

// import VueGitHubButtons from 'vue-github-buttons';

import vueUpload from '@websanova/vue-upload';



import VueCookie from 'vue-js-cookie';

// var VueCookie = require('vue-cookie');

VueCookie.install(Vue);

// Vue.use(VueQuillEditor /* { default global options } */)

Vue.use(vueUpload);


// import Loading from 'vue-loading-overlay';
// // Import stylesheet
// import 'vue-loading-overlay/dist/vue-loading.min.css';
// // Init plugin
// Vue.use(Loading);


// // db calls are made based on this deploymentTarget's value fbase deploy script
// // will change it's value
export const globalVariables = new Vue({
  data: {
    deploymentTarget: DEP_TARGET,
    LOCALHOST: 'localhost',
    FBASE: 'firebase'
  }

});


Vue.component('input-tag', InputTag)
// Vue.component('gh-btns-star', VueGitHubButtons);
Vue.http = axios
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:1234/'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCoffee);

Vue.component('font-awesome-icon', FontAwesomeIcon);


/* eslint-disable no-new */
// export default () => new Vue({
//   // el: '#app',
//   store,
//   router
// });
