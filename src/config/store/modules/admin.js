import * as types from '../types'
const state = {
  adminUserId: '',
  adminToken: '',
  adminUserName: ''
}

const getters = {
  adminUser: state => ({'admin_user_id': state.adminUserId, 'admin_token': state.adminToken, 'admin_user_name': state.adminUserName})
}

const actions = {
    updateAdminUser ({commit, state}, data) {
        commit(types.UPDATE_ADMIN_USER, data)
    }
}

// mutations
const mutations = {
    [types.UPDATE_ADMIN_USER] (state, data) {
        state.adminUserId = data.admin_id
        state.adminToken = data.token
        state.adminUserName = data.adminUserName
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
