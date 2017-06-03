<template lang="pug">
  div.container
    header.row.plat-header
      plat-header
    div.d-flex.justify-content-start
        div.col-xl-2.text-left
            router-view.plat-navbar(name="navbar")
        div.col-xl-10.margin-top
            router-view.main(name="main")
</template>
<script>
import Header from '../header/Header'
// import Content from '../content/Content'
export default {
  data () {
    return {
        overview: 'overview coming'
    }
  },
  components: {
    'plat-header': Header
    // 'plat-content': Content
  }
}
</script>
<style lang="scss">
.plat-header {
  height: 100px;
  background: #30373b;
}
</style>

