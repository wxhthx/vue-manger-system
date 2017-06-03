<template lang="pug">
  div.container {{title}}
    div.title {{showId}}
</template>
<script>
export default {
  data () {
      return {
          title: 'details'
      }
  },
  computed: {
      showId () {
          return this.$route.params.id + ' is the required property'
      }
  }
}
</script>
<style lang="scss">

</style>
