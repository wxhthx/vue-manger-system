import Vue from 'vue'
import Router from 'vue-router'
import { RouterData } from '../mock/router'

Vue.use(Router)

export default new Router({
  routes: RouterData,
  linkActiveClass: 'active'
})

