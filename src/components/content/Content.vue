<template lang="pug">
    div.d-flex.justify-content-start
        div.col-xl-2.text-left
            plat-navbar
        div.col-xl-10.margin-top
            router-view
</template>
<script>
import Navbar from '../navbar/Navbar'
export default {
  data () {
    return {
        content: 'hello'
    }
  },
  components: {
      'plat-navbar': Navbar
  }
}
</script>
<style lang="scss" scoped>
.margin-top {
    margin-top: 15px;
}
</style>

