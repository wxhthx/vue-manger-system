import Vue from 'vue'
/*! 
 * platform-admin
 * @author:Alex Wen
 * @email: xinghua.wen@istuaty.com
 * @Data: 16/06/2017
 */
import axios from 'axios'
import App from './App'
import router from './config/router'
import store from './config/store'
import toast from 'vue-awesome-toast'
import modal from './components/common/modal/js/modal'
import VeeValidate, {Validator} from 'vee-validate'
import {baseConfig} from './config/validate/validate.config'
import messages from './config/validate/zh_CN'
Vue.config.productionTip = false
axios.interceptors.request.use(function (config) {
    store.commit('SHOW_LOADING')
    // 这里的config包含每次请求的内容
    if (config.url !== '/college/users/webLogin') {
        if (!store.getters.adminUser.admin_user_id) {
          store.commit('UPDATE_ADMIN_NAME', {admin_id: localStorage.getItem('admin_id'), token: localStorage.getItem('token'), adminUserName: localStorage.getItem('adminUserName')})
        }
        config.headers.admin_user_id = store.getters.adminUser.admin_user_id
        config.headers.admin_token = store.getters.adminUser.admin_token
    }
    return config
}, function (err) {
    return Promise.reject(err)
})
axios.interceptors.response.use(
  (res) => {
    return res.data
  }, () => {
    router.push('/login')
  }
)
// Vue.prototype.$http = axios
Validator.addLocale(messages)

Vue.use(VeeValidate, baseConfig).use(toast, {container: 'app'}).use(modal)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
