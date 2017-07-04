<template lang="pug">
  div.hotel-container
    div.login-bg
    div.header
        div.btns-div
    div.login-wrapper
        form.hotel-login(@submit.prevent="validateBeforeSubmit")
            div.form-group.row.mobile-row
                label.col-4.col-form-label.align-left(for="name") 用户名
                div.col-sm-8
                    input.form-control.hotel-input(@focus="clearError" type="text" id="name" v-model="payload.admin_name" name="name"  v-validate="'required|max:10'" data-vv-as="名称" :class="{'error': errors.has('name')}")
                    div.error(v-if="errors.has('name')") {{ errors.first('name') }}
            div.form-group.row.mobile-row
                label.col-4.col-form-label.align-left(for="password") 密码
                div.col-sm-8
                    input.form-control.hotel-input(@focus="clearError" v-if="!showPassword" type="password" id="password" v-model="payload.password" name="password"  v-validate="'required|min:6'" data-vv-as="密码" :class="{'error': errors.has('password')}")
                    input.form-control.hotel-input(@focus="clearError" v-else type="text" id="password" v-model="payload.password" name="password"  v-validate="'required|min:6'" data-vv-as="密码" :class="{'error': errors.has('password')}")
                    a.eye.iconfont-admin(href="javascript:void(0)" v-if="!showPassword" @click="togglePasswordDisplay")
                    a.brow.iconfont-admin(href="javascript:void(0)" v-if="showPassword" @click="togglePasswordDisplay")
                    div.error(v-if="errors.has('password')") {{ errors.first('password') }}
            div.form-group.row.mobile-row
                div.error(v-if="errorMsg") {{errorMsg}}
                button.btn.btn-primary.col-12.btn-login-submit(type="submit") 登录
    div.login-footer
</template>
<script>
import loginService from '@/service/login.service'
import { mapActions } from 'vuex'

export default {
  data () {
      return {
          payload: {
              admin_name: '',
              password: ''
          },
          showPassword: false,
          errorMsg: ''
      }
  },
  methods: {
      validateBeforeSubmit: function () {
        this.$validator.validateAll().then(() => {
            loginService.login(this.payload).then(
                (res) => {
                    if (res.error_code) {
                        this.errorMsg = res.error_msg
                        return
                    }
                    this.errorMsg = ''
                    this.submit(res)
                }
            )           
        }).catch(() => {
            return
        })
      },
      clearError () {
          this.errorMsg = ''
      },
      submit: function (res) {
        this.$store.commit('UPDATE_ADMIN_NAME', {admin_id: res.user_id, token: res.token, adminUserName: res.user_name})
        localStorage.setItem('admin_id', res.user_id)
        localStorage.setItem('token', res.token)
        localStorage.setItem('adminUserName', res.user_name)
        this.$router.push('/plat/users')
      },
      togglePasswordDisplay () {
          this.showPassword = !this.showPassword
      },
      ...mapActions([
          'updateAdminUser'
      ])
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
    background: url("../../assets/img/login.jpg") no-repeat;
    background-size: cover;
    filter: blur(1px);
}
.login-wrapper {
   @extend %login-vertical-middle;
   right: 80px;
   width: 400px;
   height: 400px;
   background: white;
   .hotel-login {
       width: 100%;
       padding: 0 30px;
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
.eye, .brow {
    position: absolute;
    top: 0.5rem;
    right: 1.3rem;
}
.eye:before {
    content: '\e700';
}
.brow:before {
    content: '\e641';
}
</style>
