// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VueQuill from "vue-quill";
import VModal from 'vue-js-modal';
import InputTag from 'vue-input-tag';
import Notify from 'vue2-notify';


Vue.use(VueQuill);

Vue.use(VModal);

Vue.use(Notify, {
  itemClass: 'notification',
  position: 'bottom-left'
})
const types = {
  info: { itemClass: 'is-info', },
  error: { itemClass: 'is-danger' },
  warning: { itemClass: 'is-warning' },
  success: { itemClass: 'is-success', iconClass: 'fa fa-lg fa-check-circle' }
}

// db calls are made based on this deploymentTarget's value
// fbase deploy script will change it's value
export const globalVariables = new Vue({
  data: {
    deploymentTarget: 'localhost',
    LOCALHOST: 'localhost',
    FBASE: 'firebase'
  }
})

Vue.$notify.setTypes(types);

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
