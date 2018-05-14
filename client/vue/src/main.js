// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueQuill from "vue-quill";
import VModal from 'vue-js-modal'
import InputTag from 'vue-input-tag'


Vue.use(VueQuill);

Vue.use(VModal);

Vue.component('input-tag', InputTag);

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:1234/';
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
