<template lang="pug">
  div.container-fluid
    header.row.plat-header
    div.content {{overview}}
</template>
<script>
export default {
  data () {
    return {
        overview: 'overview coming'
    }
  }
}
</script>
<style lang="scss">
.plat-header {
  height: 100px;
  background: #30373b;
}
</style>

