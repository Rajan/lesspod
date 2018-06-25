// initial state

const state = {
	menus: []
}

// getters
const getters = {
	getMenus: (state, getters, rootState) => {
		return state.latestPosts;
	}
}

// mutations
const mutations = {

	setMenus(state, {menus}){
		state.menus = menus;
	}

}

// actions
const actions = {

	latestPostsFetched({state, commit}, menus){
		commit('setMenus', menus);
	}

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}