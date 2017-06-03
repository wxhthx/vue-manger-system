<template lang="pug">
    div.width_flud
        ul.nav.flex-column
            li.nav-item(v-for="(primaryItem, primaryIndex) in navbar" @click="activeNavbar(primaryItem)") 
                span.nav-link(v-if="primaryItem.children" v-bind:class="[selectedIndex === primaryItem.selectedId ? selectedClass : notSelectedClass, 'iconfont-admin']") {{primaryItem.text}}
                router-link.nav-link(v-if="!primaryItem.children" v-bind:to="primaryItem.path") {{primaryItem.text}}
                ul.second-navbar(v-else)
                    li(v-for="(secondItem, secondIndex) in primaryItem.children")
                        //- span(v-if="secondItem.children") {{secondItem.text}}
                        router-link.menu-item.nav-link(v-if="!secondItem.children" v-bind:to="secondItem.path") {{secondItem.text}}
</template>
<script>
import navbarService from '@/service/navbar.service'
export default {
  data () {
      return {
        navbar: [],
        path: '/login',
        selectedIndex: 'privilege',
        selectedClass: 'dirty',
        notSelectedClass: 'dry'
      }
  },
  created: function () {
      this.navbar = navbarService.NavbarService.getData()
  },
  methods: {
      activeNavbar: function (item) {
        if (item.selectedId !== this.selectedIndex) {
            this.$router.push(item.primaryPath)
            this.selectedIndex = item.selectedId
        }
      }
  },
  computed: {
      computedPath () {
          return '/plat/admin/detail/' + this.testId
      }
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
ul.nav {
    & > li {
        cursor: pointer;
    }
    ul.second-navbar {
        margin-left: 15px;
        & > li {
            display: none;
        }
    }
    .dirty + ul.second-navbar {
        & > li {
            display: block;
            & > a.active {
                color: #F17C67;
            } 
        }
    }
}
</style>
