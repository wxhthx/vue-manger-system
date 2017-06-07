import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import admin from './modules/admin'
import system from './modules/system'
import upload from './modules/upload'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
      system,
      admin,
      upload
  },
  strict: debug,
  plugins: []
})
