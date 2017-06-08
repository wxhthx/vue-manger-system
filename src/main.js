import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './config/router'
import store from './config/store'
import VeeValidate, {Validator} from 'vee-validate'
import {baseConfig} from './config/validate/validate.config'
import messages from './config/validate/zh_CN'
Vue.config.productionTip = false
axios.interceptors.request.use(function (config) {
    // 这里的config包含每次请求的内容
    if (store.getters.adminUser) {
        config.headers.admin_user_id = store.getters.adminUser.admin_user_id
        config.headers.admin_token = store.getters.adminUser.admin_token
    }
    return config
}, function (err) {
    return Promise.reject(err)
})
axios.interceptors.response.use(
  (res) => {
    if (res.status === 401) {
      router.push('/login')
    } else {
      return res.data 
    }
  }, (err) => {
    console.log(err)
  }
)
// Vue.prototype.$http = axios
Validator.addLocale(messages)

Vue.use(VeeValidate, baseConfig)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
