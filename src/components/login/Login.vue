<template lang="pug">
  div.hotel-container
    div.login-bg
    div.header
        div.btns-div
            button.btn.btn-primary.btn-register(type="submit" @click="register") 注册
    div.login-wrapper
        form.hotel-login
            div.form-group.row.mobile-row
                label.col-4.col-form-label.align-left(for="name") 用户名
                div.col-sm-8
                    input.form-control.hotel-input(type="text" id="name" v-model="name" required maxlength="5")
            div.form-group.row.mobile-row
                label.col-4.col-form-label.align-left(for="password") 密码
                div.col-sm-8
                    input.form-control.hotel-input(type="password" id="password" v-model="password")
            div.form-group.row.mobile-row
                button.btn.btn-primary.col-12.btn-login-submit(type="submit" @click="submit") 登录
    div.login-footer
</template>
<script>
export default {
  data () {
      return {
          name: '',
          password: ''
      }
  },
  methods: {
     submit: function () {
         this.$router.push('/plat/admin')
     },
     register: function () {
        //  this.$router.push('/register')
     }
  }
}
</script>

<style lang="scss" scoped>
$btn-font-color: #757575;
%login-vertical-middle {
    position: absolute;
    top: 20%;
    transform: translate(0, -20%);
    // border-radius:5px;
}
%btn-custom {
    background: #fff;
    border: 1px solid $btn-font-color;
    height: 2em;
    color: $btn-font-color;
    font-size: 1em;
}
.hotel-container {
    margin-top: 100px;
    width: 100%;
    position: absolute;
}
.header {
    width: 100%;
    position: absolute;
    top: -40px;
    right: 20px;
    .btns-div {
        float: right;
    }
}
.login-footer {
    height: 100px;
}
.login-bg {
    width: 100%;
    height: 500px;
    // background: url(../../assets/images/hotel-login.jpg) no-repeat;
    // background-size: cover;
    filter: blur(1px);
}
.login-wrapper {
   @extend %login-vertical-middle;
   right: 80px;
   width: 400px;
   height: 400px;
   background: white;
   .hotel-login {
       margin: 0 30px;
       @extend %login-vertical-middle;
       .align-left {
           text-align: left;
       }
   }
}
.btn-register {
    @extend %btn-custom;
}
@media all and (max-width: 600px), (orientation:portrait){
    %btn-modeia-custom {
        background: #fff;
        border: 1px solid $btn-font-color;
        height: 2em;
        color: $btn-font-color;
        font-size: 1.5em;
        font-weight: 400;
    }
    .login-bg {
        display: none;
    }
    .mobile-row {
        margin-bottom: 4rem;
    }
    .login-wrapper {
        width: 80%;
        transform: translate(0);
        .hotel-login {
            position: relative;
            top: 100%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
    .btn-login-submit {
        width: 100%;
        @extend %btn-modeia-custom;
    }
}
</style>
