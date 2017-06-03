<template lang="pug">
  div.container
    header.row.plat-header
      plat-header
    plat-content
</template>
<script>
import Header from '../header/Header'
import Content from '../content/Content'
export default {
  data () {
    return {
        overview: 'overview coming'
    }
  },
  components: {
    'plat-header': Header,
    'plat-content': Content
  }
}
</script>
<style lang="scss">
.plat-header {
  height: 100px;
  background: #30373b;
}
</style>

