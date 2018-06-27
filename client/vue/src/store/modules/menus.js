// initial state

const state = {
  menus: []
}

// getters
const getters = {
  getMenus: (state, getters, rootState) => {
    // console.log('getting stored menus: ' + JSON.stringify(state.menus));
    return state
  }
}

// mutations
const mutations = {

  setMenus (state, menus) {
    // console.log('setting menus ...' + JSON.stringify(menus));
    state = menus
  }

}

// actions
const actions = {

  latestMenusFetched ({state, commit}, menus) {
    // console.log('latestMenusFetched ...' + JSON.stringify(menus));
    commit('setMenus', menus)
  }

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
