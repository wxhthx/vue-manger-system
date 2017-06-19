import * as types from '../types'
const state = {
  adminUserId: '100',
  adminToken: '691c5e1be0f1a556198d5e65766b65a7' 
}

const getters = {
  adminUser: state => ({'admin_user_id': state.adminUserId, 'admin_token': state.adminToken})
}

const actions = {
    updateAdminUser ({commit, state}, id, token) {
        commit(types.UPDATE_ADMIN_USER, {id, token})
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
