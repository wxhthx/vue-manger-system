<template lang="pug">
    div.width_flud
        ul.navbar
            li(v-for="(primaryItem, primaryIndex) in navbar") 
                span(v-if="primaryItem.children") {{primaryItem.text}}
                router-link.menu-item.nav-link(v-if="!primaryItem.children" v-bind:to="primaryItem.path") {{primaryItem.text}}
                ul(v-else v-bind:class="{'selected': selectedIndex === primaryItem.selectedId}")
                    li(v-for="(secondItem, secondIndex) in primaryItem.children")
                        span(v-if="secondItem.children") {{secondItem.text}}
                        router-link.menu-item.nav-link(v-if="!secondItem.children" v-bind:to="secondItem.path") {{secondItem.text}}
</template>
<script>
import navbarService from '@/service/navbar.service'
export default {
  data () {
      return {
        navbar: [],
        path: '/login',
        selectedIndex: 'privilege'
      }    
  },
  created: function () {
      this.navbar = navbarService.NavbarService.getData()
  }
}
</script>
<style lang="scss">
ul {
    padding-left: 0;
}
li {
    list-style: none;
}
ul.navbar {
    ul {
        & > li {
            display: none;
        }
        &.selected > li {
            display: block;
            & > a.active {
                color: #F17C67;
            }
        }
    }
}
</style>
