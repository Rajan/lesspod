import ActionTypes from '../actionTypes'
import MutationTypes from '../mutationTypes'
import adaptor from './adaptor'
const actions = adaptor('localhost')

export default {
  [ActionTypes.FETCH_MENUS]: ({ commit }) => {
    // adaptor.
    actions.fetchMenus()
      .then(menus => {
        commit(MutationTypes.SET_MENUS, { menus })
      })
  },
  [ActionTypes.FETCH_POSTS]: ({commit}) => {
    actions.fetchPosts()
      .then(posts => {
        commit(MutationTypes.SET_POSTS, { posts })
      })
  }
}
