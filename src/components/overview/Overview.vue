<template lang="pug">
  div.container#container
    header.row.plat-header
      plat-header
    transition-group.row.container-bg(name="navbar" tag="div" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave")
      div.col-xl-2.text-left.navbar-admin(v-if="visible" v-bind:key="ccc")
        router-view.plat-navbar(name="navbar")
      div.width_flud.margin-top.container-view(v-bind:key="aaa" :class="{'no-margin-left': !visible}")
        div.loading-div(v-if="loading")
          div.loading
        div.switchBtn
          a.toggle-navbar(href="javascript:void(0)" @click="switchVisible")
        transition(name="main-fade" mode="in-out")
          router-view.main(name="main")
</template>
<script>
import Header from '../header/Header'
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
        overview: 'overview coming',
        visible: true,
        aaa: 'aaa',
        ccc: 'ccc',
        colXl12: false,
        colXl10: true,
        animatedOut: false,
        animatedIn: false
    }
  },
  components: {
    'plat-header': Header
    // 'plat-content': Content
  },
  computed: {
    ...mapGetters({
      loading: 'loading'
    })
  },
  methods: {
    switchVisible () {
      this.visible = !this.visible
    },
    beforeEnter () {
      console.log('beforeEnter')
    },
    enter () {
      console.log('enter')
      if (this.visible) {
        this.colXl12 = false
        this.colXl10 = true
        this.animatedIn = true
      } else {
        this.colXl10 = false
        this.colXl12 = true
        this.animatedOut = true
      }
    },
    leave () {
      this.animated = false
      if (this.visible) {
        this.colXl12 = false
        this.colXl10 = true
        this.animatedIn = false
      } else {
        this.colXl10 = false
        this.colXl12 = true
        this.animatedOut = false
      }
    }
  }
}
</script>
<style lang="scss">
.plat-header {
  height: 100px;
  background: #283048;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #283048, #859398);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, #283048, #859398); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.container-bg {
  background: #ECE9E6;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #FFFFFF, #ECE9E6);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, #FFFFFF, #ECE9E6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  padding: 15px 15px 15px 0;
  min-height: 600px;
}
.main-fade-enter-active, .main-fade-leave-active {
  transition: all 0.16s;
}
.main-fade-leave-active {
  transform: translateY(-100%);
}
.main-fade-enter-active {
  transform: translateY(-100%);
  position: absolute;
}
.main-fade-leave {
  transform: translateY(0);
}
.main-fade-enter, .main-fade-leave {
  opacity: 0;
}
.navbar-leave-active, .navbar-enter, .router-view-leave-active, .router-view-enter {
  transform: translateX(-240px);
}
.navbar-enter {
  opacity: 0;
}

.router-view-active {
  position: absolute;
}
.navbar-leave-active, .navbar-enter-active, .router-view-leave-active, .router-view-enter-active {
  transition: all 0.3s;
}
.switchBtn {
  position: absolute;
  top: -30px;
  left: 0;
  & > .toggle-navbar {
    text-decoration: none;
    &:before {
      font-family: 'iconfont-admin' !important;
      font-size: 23px;
      background: #CB356B;  /* fallback for old browsers */
      background: -webkit-linear-gradient(to right, #BD3F32, #CB356B);  /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(to right, #BD3F32, #CB356B); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      color: #fff;
      border-radius: 5px;
      content: '\e603';
    }
  }
}
</style>
<style lang="scss" scoped>
.navbar-admin {
  position: absolute;
}
.container-view {
  margin-left: 16.7%;
  transition: all 0.2s;
  position: relative;
  top: 15px;
  &.no-margin-left {
    margin-left: 0;
  }
}
</style>
