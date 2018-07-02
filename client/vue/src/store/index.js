import Vue from 'vue';
import Vuex from 'vuex';

import App from '../App';
import router from '../router';

// import firebase, {auth, GoogleProvider} from '@/services/fireinit.js';

import initialState from './initialState';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';



Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default () => new Vuex.Store({

  state: initialState,
  getters: getters,
  actions,
  mutations,
  strict: debug,
  plugins: debug ? [] : [] // some plugins are for dev and others prod.
});

