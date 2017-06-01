<template lang="pug">
    div.full-container
        div.col-xl-6
            plat-navbar
        router-view
</template>
<script>
import Navbar from './navbar/Navbar'
export default {
  data () {
    return {
        content: 'hello'
    }
  },
  component: {
      'plat-navbar': Navbar
  }
}
</script>
<style lang="scss">

</style>

