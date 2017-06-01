<template lang="pug">
    div.width_flud
        ul.navbar
            li(v-for="(primaryItem, primaryIndex) in navbar") {{primaryItem.text}}
                router-link.menu-item.nav-link(v-if="!primaryItem.children" v-bind:to="path") 管理员
                ul(v-else)
                    li(v-for="(secondItem, secondIndex) in primaryItem.children") {{secondItem.text}}
</template>
<script>
import navbarService from '@/service/navbar.service'
export default {
  data () {
      return {
        navbar: [],
        path: '/login'
      }    
  },
  created: function () {
      this.navbar = navbarService.NavbarService.getData()
  }
}
</script>
<style lang="scss">
ul, li {
    list-style: none;
}
</style>
