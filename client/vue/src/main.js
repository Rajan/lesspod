// The Vue build version to load with the `import` command (runtime-only or
// standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import {DEP_TARGET} from './config';

import App from './App';
import router from './router';
// import store from './store';

import InputTag from 'vue-input-tag';

import vueUpload from '@websanova/vue-upload';


import VueGitHubButtons from 'vue-github-buttons';

// Stylesheet
import 'vue-github-buttons/dist/vue-github-buttons.css';



import VueDisqus from 'vue-disqus';
import VueCookie from 'vue-js-cookie';

import axios from 'axios';

// var VueCookie = require('vue-cookie');

Vue.use(require('vue-moment'));

VueCookie.install(Vue)

// Vue.use(VueQuillEditor /* { default global options } */)

Vue.use(VueDisqus)

Vue.use(vueUpload)

Vue.use(VueGitHubButtons, { useCache: false })

import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.min.css';
// Init plugin
Vue.use(Loading);


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
Vue.http = axios
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:1234/'

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   store,
//   router,
//   components: {
//     App
//   },
//   template: '<App/>' });
