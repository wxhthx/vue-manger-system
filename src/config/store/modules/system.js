import * as types from '../types'
const state = {
  systemName: '前端管理平台'
}

const getters = {
  systemName: state => state.systemName
}

const actions = {
    updateSystemName ({commit, state}, name) {
        commit('ypes.UPDATE_SYSTEM_NAME', {name})
    }
}

// mutations
const mutations = {
    [types.UPDATE_SYSTEM_NAME] (state, name) {
        state.systemName = name
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
