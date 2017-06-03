// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import VeeValidate, {Validator} from 'vee-validate'
import {baseConfig} from './config/validate/validate.config'
import messages from './config/validate/zh_CN'
Vue.config.productionTip = false

Validator.addLocale(messages)

Vue.use(Vuex).use(VeeValidate, baseConfig)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
