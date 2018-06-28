import Vue from 'vue';
import Vuex from 'vuex';
// import user from './modules/user'
// import posts from './modules/posts'
// import menus from './modules/menus'
import App from '../App';
import router from '../router';

import initialState from './initialState';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default () => new Vuex.Store({
  // modules: {
  //   user,
  //   posts,
  //   menus
  // },
  actions,
  state: initialState,
  mutations,
  strict: debug,
  plugins: debug ? [] : [] // some plugins are for dev and others prod.
});
// export default store;
/* eslint-disable no-new */
// export default new Vue({
//   el: '#app',
//   store,
//   router,
//   components: {
//     App
//   },
//   template: '<App/>' });
