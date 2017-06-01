<template lang="pug">
  div#app
    router-view
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
/**
* 引入css基础框架bootstrap和自定义css基础框架
*/
@import './assets/sass/bootstrap/bootstrap.scss';
@import './assets/sass/custommade/main.scss';
</style>
