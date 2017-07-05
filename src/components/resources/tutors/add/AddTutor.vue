<template lang="pug">
  form
    form(@submit.prevent="validateBeforeSubmit")
        div.row
            div.col
                div.form-group.row
                    label.col-sm-3.col-form-label(for="name") 名称
                    div.col-sm-9
                        input.form-control(type="text" v-model="payload.tutor_name"  name="name"  v-validate="'required|max:10'" data-vv-as="名称" :class="{'error': errors.has('name')}")
                        div.error(v-if="errors.has('name')") {{ errors.first('name') }}
                div.form-group.row
                    label.col-sm-3.col-form-label(for="name") Email
                    div.col-sm-9
                        input.form-control(type="text" v-model="payload.email"  name="email"  v-validate="'required|email'" data-vv-as="Email" :class="{'error': errors.has('email')}")
                        div.error(v-if="errors.has('email')") {{ errors.first('email') }}
            div.col
                div.form-group.row
                    label.col-sm-3.col-form-label(for="name") Logo
                    div.col-sm-9#imageContainer
                        //- img.picrute.form-control(v-if="payload.photo_url" :src="payload.photo_url")
                        upload(v-on:getImageUrl="getImageUrl" :initImageUrl="payload.photo_url")
                div.form-group.row
                    label.col-sm-3.col-form-label(for="name") 简介
                    div.col-sm-9
                        textarea.form-control(type="text" v-model="payload.resume"  name="resume"  v-validate="'required'" data-vv-as="简介" :class="{'error': errors.has('resume')}")
                        div.error(v-if="errors.has('resume')") {{ errors.first('resume') }}
        div.btn-group.row.margin-top
            button.btn.btn-primary(type="submit") 保存
            button.btn.btn-primary(@click.prevent="exit") 取消
</template>
<script>
import Upload from '@/components/common/Uploadimage'
import tutorService from '@/service/tutor.service'
import loadingMixin from '@/config/mixins/loading.mixin'
export default {
  data () {
      return {
        payload: {
            tutor_name: '',
            photo_url: '',
            tutor_id: '',
            resume: '',
            email: ''
        }
      }
  },
  mixins: [
      loadingMixin
  ],
  methods: {
      validateBeforeSubmit () {
        this.$validator.validateAll().then(() => {
            this.save()
        }).catch(() => {
            return
        })
      },

      save () {
        let self = this
        let data = Object.assign({}, self.payload)
        if (!self.payload.tutor_id) {     
            delete data.tutor_id
            tutorService.saveTutor(data).then(
                (res) => {
                    self.hiddenLoading()
                    self.$router.push('/plat/TutorsResources')
                }
            )
        } else {
            tutorService.updateTutor(self.payload.tutor_id, data).then(
                (res) => {
                    self.hiddenLoading()
                    self.$router.push('/plat/TutorsResources')
                }
            )
        }  
      },
      getImageUrl (url) {
          this.payload.photo_url = url
      },
      exit () {
          this.$router.push('/plat/TutorsResources')
      }
  },
  created () {
      let self = this
      // 新增页面  
      if (self.$route.params.id === 'default') {
        
      } else {
        // 编辑页面
        self.payload.tutor_id = self.$route.params.id
        tutorService.getSingleTutor(self.payload.tutor_id).then(
            (res) => {
                self.hiddenLoading()
                self.payload.tutor_name = res.tutor_name ? res.tutor_name : ''
                self.payload.photo_url = res.photo_url ? res.photo_url : ''
                self.payload.resume = res.resume ? res.resume : ''
                self.payload.email = res.email ? res.email : ''
            }
        )
      }
  },
  components: {
      'upload': Upload
  }
}
</script>
<style lang="scss">

</style>
