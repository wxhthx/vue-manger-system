import Vue from 'vue'
import Router from 'vue-router'
import { RouterData } from './router'

Vue.use(Router)

export default new Router({
  routes: RouterData,
  linkActiveClass: 'active'
})

