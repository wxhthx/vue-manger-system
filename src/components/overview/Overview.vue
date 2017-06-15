<template lang="pug">
  div.container#container
    header.row.plat-header
      plat-header
    div.row
        div.col-xl-2.text-left
          router-view.plat-navbar(name="navbar")
        div.col-xl-10.margin-top
          div.loading-div(v-if="loading")
            div.loading
          transition(name="main-fade" mode="out-in" enter-active-class="animated fadeInUpBig")
            router-view.main(name="main")
</template>
<script>
import Header from '../header/Header'
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
        overview: 'overview coming'
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
  }
}
</script>
<style lang="scss">
.plat-header {
  height: 100px;
  background: #30373b;
}
</style>

