import MutationTypes from '../mutationTypes'

export default {
  [MutationTypes.SET_MENUS]: (state, {menus}) => {
    state.menus = menus
  },
  [MutationTypes.SET_POSTS]: (state, {posts}) => {
    state.posts = posts
  },
  [MutationTypes.SET_USER]: (state, {user}) => {
    state.user = user
  },
  [MutationTypes.GET_USER]: (state) => {
    return state.user
  }
}
