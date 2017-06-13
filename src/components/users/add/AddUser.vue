<template lang="pug">
  div.width-flud
    form(@submit.prevent="validateBeforeSubmit")
        div.form-group.row
            label.col-sm-2.col-form-label(for="input-photo") 照片:
            div.col-sm-4
                input.form-control-file(type="file" aria-describedby="fileHelp" @change="uploadImg")
                small#fileHelp.form-text.text-muted {{fileInfo}}
        div.form-group.row
            label.col-sm-2.col-form-label(for="input-name") 姓名:
            div.col-sm-4
                input.form-control(type="text" id="input-name" v-model="payload.user_name" name="name"  v-validate="'required|max:10'" data-vv-as="姓名" :class="{'error': errors.has('name')}")
                div.error(v-show="errors.has('name')") {{ errors.first('name') }}
            label.col-sm-2.col-form-label(for="input-phone" )  手机:
            div.col-sm-4
                input.form-control(type="text" id="input-phone" v-model="payload.phone" name="phone" v-validate="{ rules: {required: true, regex:/^1[0-9]{10}$/}}" data-vv-as="手机" :class="{'error': errors.has('phone')}")
                div.error(v-show="errors.has('phone')") {{ errors.first('phone') }}
        div.form-group.row
            label.col-sm-2.col-form-label(for="input-school") 学校/单位:
            div.col-sm-4
                input.form-control(id="input-school" type="text" v-model="payload.organization" name="school" v-validate="'required|min:6|max:20'" data-vv-as="学校/单位" :class="{'error': errors.has('school')}")
                div.error(v-show="errors.has('school')") {{ errors.first('school') }}
            label.col-sm-2.col-form-label(for="input-number")  学号/工号:
            div.col-sm-4
                input.form-control(id="input-number" type="text" v-model="payload.sno" name="number" v-validate="'required|min:6|max:20'" data-vv-as="学号/工号" :class="{'error': errors.has('number')}")
                div.error(v-if="errors.has('number')") {{errors.first('number')}}
        div.form-group.row
            //- label.col-sm-2.col-form-label(for="input-college") 学院:
            //- div.col-sm-4
            //-     input.form-control(type="text" id="input-college" v-model="payload.college" name="college" v-validate="'required|min:6|max:20'" data-vv-as="学院" :class="{'error': errors.has('college')}")
            //-     div.error(v-if="errors.has('college')") {{errors.first('college')}}
            label.col-sm-2.col-form-label(for="input-major") 专业:
            div.col-sm-4
                input.form-control(type="major" id="input-major" v-model="payload.major" name="major" v-validate="'required|min:6|max:20'" data-vv-as="专业" :class="{'error': errors.has('major')}")
                div.error(v-if="errors.has('major')") {{errors.first('major')}}
        div.form-group.row
            label.col-sm-2.col-form-label(for="input-email") 邮箱:
            div.col-sm-4
                input.form-control(type="email" id="input-email" v-model="payload.email" name="email" v-validate="'required|email'" data-vv-as="邮箱" :class="{'error': errors.has('email')}")
                div.error(v-if="errors.has('email')") {{errors.first('email')}}
            label.col-sm-2.col-form-label(for="input-password") 密码:
            div.col-sm-4
                input.form-control(type="password" id="input-password" v-model="payload.password" name="password" v-validate="'required|min:6|max:20'" data-vv-as="密码" :class="{'error': errors.has('password')}")
                div.error(v-if="errors.has('password')") {{errors.first('password')}}
        div.btn-group(role="group")
            button.btn.btn-primary(type="checkCourses") 查看课程
            button.btn.btn-primary(type="checkCollects") 查看收藏
            button.btn.btn-primary(type="submit") 保存
            button.btn.btn-primary(@click="quit") 取消
</template>
<script>
import Service from '@/service/users.service'
export default {
  data () {
      return {
          payload: {
              user_id: '',
              user_name: '',
              phone: '',
              organization: '',
              sno: '',
              major: '',
              email: '',
              password: ''
          },
          exitPath: '/plat/users',
          fileInfo: 'This is some placeholder block-level help text for the above input.'
      }
  },
  methods: {
      save () {
        let data = Object.assign({}, this.payload)     
        if (!this.payload.user_id) {
            delete data.user_id
            Service.saveUser(data).then(
                (res) => {
                    this.$toast('用户保存成功')
                    this.$router.push(this.exitPath)
                }
            )
        } else {
            Service.updateUser(data).then(
                (res) => {
                    this.$toast('用户保存成功')
                    this.$router.push(this.exitPath)
                }
            )
        }
      },
      quit () {
          this.$router.push(this.exitPath)
      },
      validateBeforeSubmit () {
          console.log('validateBeforeSubmit')
        this.$validator.validateAll().then(() => {
            this.save()
        }).catch(() => {
            return
        })
      },
      checkCourses () {

      },
      checkCollects () {

      },
      uploadImg () {
          console.log('upload img')
      }
  },
  created () {
      if (this.$router.params.id) {
        this.payload.user_id = this.$router.params.id
        // 查询用户信息
      }
  }
}
</script>
<style lang="scss">

</style>

