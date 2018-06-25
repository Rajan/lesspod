import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import posts from './modules/posts';
import menus from './modules/menus';

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    user,
    posts,
    menus
  },
  strict: debug,
  plugins: debug ? [] : [] // some plugins are for dev and others prod.
})