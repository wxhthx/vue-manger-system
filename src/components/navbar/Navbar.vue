<template lang="pug">
    div.width_flud
        ul.nav.flex-column
            li.nav-item.iconfont-navbar.arrow(v-for="(primaryItem, primaryIndex) in navbar" :class="[selectedIndex === primaryItem.selectedId ? selectedClass : notSelectedClass]" @click="activeNavbar(primaryItem)") 
                span.nav-link(v-bind:class="[primaryItem.id]") {{primaryItem.text}}
                //- router-link.nav-link(v-if="!primaryItem.children" v-bind:to="primaryItem.path") {{primaryItem.text}}
                transition(name="navbar-second" enter-active-class="navbar-enter-active" enter-class="navbar-enter" mode="out-in" leave-active-class="navbar-leave-active" leave-class="navbar-leave")
                    ul.second-navbar(v-if="primaryItem.children && selectedIndex === primaryItem.selectedId")
                        li(v-for="(secondItem, secondIndex) in primaryItem.children")
                            //- span(v-if="secondItem.children") {{secondItem.text}}
                            router-link.menu-item.nav-link(v-if="!secondItem.children" v-bind:to="secondItem.path" :class="[secondItem.id]") {{secondItem.text}}
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
<style lang="scss" scoped>
$navbar-color: #424242;
.nav {
    color: $navbar-color
}
.navbar-enter {
    height: 0;
    opacity: 0;
    transform: translateX(10px);
}
.navbar-enter-active {
    transition: all 0.5s ease;
}
.navbar-leave {
    opacity: 0;
}
.navbar-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    transform: translateX(10px);
    height: 0;   
}

a {
    color: $navbar-color;
    &:active, &:focus, &:hover {
        color: $navbar-color;
    }
}

ul.nav {
    & > li {
        cursor: pointer;
        &:active, &:focus, &:hover {
            background: rgba(0, 0, 0, 0.1);
            & > ul {
                background: #fff;
            }
        }
    }
    .dirty > ul.second-navbar {
        & > li {
            & > a {
                margin-left: 15px;
            }
            & > a.active {
                color: #F17C67;
                transform: translate(-10px, 0) scale(1.02);
                transition: transform 0.2s linear;
            }
            &:active, &:focus, &:hover {
               background: rgba(0, 0, 0, 0.1);
               color: #fff; 
            }
        }
    }
}
</style>
