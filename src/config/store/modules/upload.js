import * as types from '../types'
const state = {
    expire: 0,
    host: 'www.baidu.com',
    policyBase64: '',
    accessid: '',
    signature: '',
    key: '',
    g_object_name_type: 'random_name'
}

const getters = {
    uploadData: state => ({
      'expire': state.expire,
      'host': state.host,
      'policyBase64': state.policyBase64,
      'accessid': state.accessid,
      'signature': state.signature,
      'key': state.key,
      'g_object_name_type': state.g_object_name_type
    })
}

const actions = {
    updateUploadData ({commit, state}, data) {
        commit(types.UPDATE_UPLOAD_DATA, data)
    }
}

// mutations
const mutations = {
    [types.UPDATE_UPLOAD_DATA] (state, data) {
        state.expire = data.expire ? data.expire : state.expire
        state.host = data.host ? data.host : state.host
        state.policyBase64 = data.policyBase64 ? data.policyBase64 : state.policyBase64
        state.accessid = data.accessid ? data.accessid : state.accessid
        state.signature = data.signature ? data.signature : state.signature
        state.key = data.key ? data.key : state.key
        state.g_object_name_type = data.g_object_name_type ? data.g_object_name_type : state.g_object_name_type
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
