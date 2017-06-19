import * as types from '../types'
const state = {
  systemName: '书院管理运营平台',
  loading: false
}

const getters = {
  systemName: state => state.systemName,
  loading: state => state.loading
}

const actions = {
    updateSystemName ({commit, state}, name) {
        commit(types.UPDATE_SYSTEM_NAME, {name})
    },
    showLoading ({commit, state}) {
        commit(types.SHOW_LOADING)
    },
    hiddenLoading ({commit, state}) {
        commit(types.HIDDEN_LOADING)
    }
}

// mutations
const mutations = {
    [types.UPDATE_SYSTEM_NAME] (state, name) {
        state.systemName = name
    },
    [types.SHOW_LOADING] (state) {
        state.loading = true
    },
    [types.HIDDEN_LOADING] (state) {
        state.loading = false
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
