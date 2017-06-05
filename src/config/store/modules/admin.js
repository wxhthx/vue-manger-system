import * as types from '../types'
const state = {
  adminUserId: 'admin',
  adminToken: '1234567890' 
}

const getters = {
  adminUser: state => ({'admin_user_id': state.adminUserId, 'admin_token': state.adminToken})
}

const actions = {
    updateAdminUser ({commit, state}, id, token) {
        commit('ypes.UPDATE_ADMIN_USER', {id, token})
    }
}

// mutations
const mutations = {
    [types.UPDATE_ADMIN_USER] (state, id, token) {
        state.adminUserId = id
        state.adminToken = token
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
