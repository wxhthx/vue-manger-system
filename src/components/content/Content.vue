<template lang="pug">
    div.width_flud
        div.col-xl-2.inline-block.text-left
            plat-navbar
        div.col-xl-10.inline-block
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
<style lang="scss">

</style>

