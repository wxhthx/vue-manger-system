<template lang="pug">
  div.width-flud
    form(@submit.prevent="validateBeforeSubmit")
        div.form-group.row
            label.col-sm-2.col-form-label(for="input-name") 姓名:
            div.col-sm-4
                input.form-control(type="text" id="input-name" v-model="admin.name" name="name"  v-validate="'required|max:10'" data-vv-as="姓名" :class="{'error': errors.has('name')}")
                div.error(v-show="errors.has('name')") {{ errors.first('name') }}
            label.col-sm-2.col-form-label(for="input-phone" )  手机:
            div.col-sm-4
                input.form-control(type="text" id="input-phone" v-model="admin.phone" name="phone" v-validate="{ rules: {required: true, regex:/^1[0-9]{10}$/}}" data-vv-as="手机" :class="{'error': errors.has('phone')}")
                div.error(v-show="errors.has('phone')") {{ errors.first('phone') }}
        div.form-group.row
            label.col-sm-2.col-form-label(for="input-type") 类型:
            div.col-sm-4
                select.form-control(id="input-type" v-model="admin.type")
                    option(v-for="(typeItem, typeIndex) in typesData" :value="typeItem.id") {{typeItem.text}}
            label.col-sm-2.col-form-label(for="input-status")  状态:
            div.col-sm-4
                select.form-control(id="input-status" v-model="admin.status")
                    option(v-for="(statusItem, statusIndex) in statusData" :value="statusItem.id") {{statusItem.text}}
        div.form-group.row
            label.col-sm-2.col-form-label(for="input-password") 密码:
            div.col-sm-4
                input.form-control(type="password" id="input-password" v-model="admin.password" name="password" v-validate="'required|min:6|max:20'" data-vv-as="密码" :class="{'error': errors.has('password')}")
                div.error(v-if="errors.has('password')") {{errors.first('password')}}
        div.btn-group(role="group")
            button.btn.btn-primary(@click="startOrStopUsing") 启用/停用
            button.btn.btn-primary(type="submit") 保存
            button.btn.btn-primary(@click="quit") 取消
</template>
<script>
import Service from '@/service/admin.service'
export default {
  data () {
      return {
          admin: {
              name: '',
              phone: '',
              type: '1',
              status: '1',
              password: ''
          },
          statusData: [],
          typesData: []
      }
  },
  methods: {
      startOrStopUsing () {
        this.$validator.validateAll().then(() => {
            // this.save()
        }).catch(() => {
            return
        })
      },
      submit () {

      },
      quit () {
          this.$router.push('/plat/admin')
      },
      validateBeforeSubmit () {
          console.log('validateBeforeSubmit')
        this.$validator.validateAll().then(() => {
            this.save()
        }).catch(() => {
            return
        })
      }
  },
  created () {
      this.statusData = Service.AdminService.getStatus()
      this.typesData = Service.AdminService.getTypes()
  }
}
</script>
<style lang="scss">

</style>

