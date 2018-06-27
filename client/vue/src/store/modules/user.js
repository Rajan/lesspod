// initial state

const state = {
	user: null
}

// getters
const getters = {
	loggedInUser: (state, getters, rootState) => {
		return state.user;
	}
}

// mutations
const mutations = {

	setUser(state, {user}){
		state.user = user;
	}

}

// actions
const actions = {

	login({state, commit}, user){
		commit('setUser', user);
	}

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}