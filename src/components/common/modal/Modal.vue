<template lang="pug">
div.modal-alex
    div.shadow-container(v-if="visible")
    div.modal-bg
        transition(name="modal" enter-active-class="animated flipInY" leave-active-class="animated flipOutY")
            div.main-container(v-if="visible")
                div.shut-btn
                    a.btn-close(@click="shutModal")
                div.header(v-if="header")
                    span {{header}}
                div.content
                    div.main-content {{message}}
                div.footer(v-if="footer")
                    button.btn.btn-primary(v-for="(btnItem, btnIndex) in footer" @click="handle(btnItem)") {{btnItem.text}}
</template>
<script>
export default {
//   props: ['header', 'footer', 'message'],
  data () {
    return {
        header: '',
        footer: {},
        message: '',
        visible: false
    }
  },
  methods: {
      handle (btnItem) {
        if (btnItem.type === 'cancel' || btnItem.type === 'close') {
            this.visible = false
            return
        }
        btnItem.method(btnItem.argu)
      },
      shutModal () {
          this.visible = false
      }
  }
}
</script>
<style lang="scss" scoped>
$shadow-bg-color: rgba(189, 189, 189, 0.7);
.shadow-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: $shadow-bg-color;
    z-index: 1300;
}
.shut-btn{
    position: absolute;
    right: 5px;
    top: 5px;
    cursor: pointer;
    & > .btn-close {
        width: 0;
        height: 0;
        &:before {
            content: url('/static/img/svg/shutdown.svg');
        }
    }
}
.modal-bg {
    position: fixed;
    top: 50%;
    left: 50%;
    transition: transform 0.3s;
    z-index: 1301;
    transform: translate(-50%, -50%);
}
.main-container {
    min-width: 600px;
    background: #fff;
    // position: absolute;
    // z-index: 1301;
    & > .header {
        height: 40px;
        border-bottom: 1px solid #FAFAFA;
        text-align: center;
        line-height: 40px;
        background: #F5F5F5;
    }
    & > .content {
        min-height: 160px;
        padding: 15px;
    }
    & >.footer {
        // height: 160px;
        display: flex;
        justify-content: flex-end;
        padding: 15px 0;
        margin-right: 5px;
        border-top: 1px solid #FAFAFA;
    }
}
</style>
