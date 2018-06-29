import ActionTypes from '../actionTypes';
import MutationTypes from '../mutationTypes';
// import config from '../'
import {DEP_TARGET} from '../../config'
import adapter from './adapter';
console.log('DEP_TARGET: ' + DEP_TARGET);
const actions = adapter(DEP_TARGET);
// const actions = adapter('firebase');
export default {
  [ActionTypes.FETCH_MENUS]: ({ commit }) => {
    // adapter.
    return actions.fetchMenus()
      .then(menus => {
        return commit(MutationTypes.SET_MENUS, { menus })
      })
  },
  [ActionTypes.FETCH_POSTS]: ({commit}) => {
    actions.fetchPosts()
      .then(posts => {
        commit(MutationTypes.SET_POSTS, { posts })
      })
  }
}
