// initial state

const state = {
  latestPosts: []
}

// getters
const getters = {
  getLatestPosts: (state, getters, rootState) => {
    return state.latestPosts
  }
}

// mutations
const mutations = {

  setLatestPosts (state, {posts}) {
    state.latestPosts = posts
  }

}

// actions
const actions = {

  latestPostsFetched ({state, commit}, posts) {
    commit('setLatestPosts', posts)
  }

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
