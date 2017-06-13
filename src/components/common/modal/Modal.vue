<template lang="pug">
div.modal-alex
    div.shadow-container
    div.modal-bg
        div.main-container
                div.header(v-if="header")
                    span {{header}}
                div.content
                    div.main-content {{message}}
                div.footer(v-if="footer.btns")
                    button.btn.btn-primary(v-for="(btnItem, btnIndex) in footer.btns" @click="handle(btnItem.type)") {{btnItem.text}}
</template>
<script>
export default {
  props: ['header', 'footer', 'message'],
  data () {
    return {
        // header: '',
        // footer: {},
        // message: ''
    }
  },
  methods: {
      handle (type) {
        this.$emit('btnFunc', type)
      }
  }
}
</script>
<style lang="scss" scoped>
$shadow-bg-color: rgba(189, 189, 189, 0.7);
.shadow-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: $shadow-bg-color;
    z-index: 1300;
}
.modal-bg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);transition: 4s linear;
    z-index: 1301;
}
.main-container {
    width: 600px;
    background: #fff;
    // position: absolute;
    // z-index: 1301;
    & > .header {
        height: 80px;
        border-bottom: 1px solid #FAFAFA;
    }

    & >.footer {
        // height: 160px;
        display: flex;
        justify-content: flex-end;
        margin: 15px 0;
        border-top: 1px solid #FAFAFA;
    }
}
</style>
