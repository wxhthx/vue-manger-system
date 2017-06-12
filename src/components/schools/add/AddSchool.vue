<template lang="pug">
  form
    form(@submit.prevent="validateBeforeSubmit")
        div.row
            div.col
                div.form-group.row
                    label.col-sm-3.col-form-label(for="name") 名称
                    div.col-sm-9
                        input.form-control(type="text" v-model="payload.name"  name="name"  v-validate="'required|max:10'" data-vv-as="名称" :class="{'error': errors.has('name')}")
                        div.error(v-if="errors.has('name')") {{ errors.first('name') }}
            div.col
                div.form-group.row
                    label.col-sm-3.col-form-label(for="name") Logo
                    div.col-sm-9
                        upload
        div.btn-group.row.margin-top
            button.btn.btn-primary(type="submit") 保存
            button.btn.btn-primary(@click.prevent="exit") 取消
</template>
<script>
import Upload from '@/components/common/Upload'
export default {
  data () {
      return {
        payload: {
            name: '',
            organization_id: ''
        }
      }
  },
  methods: {
      validateBeforeSubmit () {
        this.$validator.validateAll().then(() => {
            this.save()
        }).catch(() => {
            return
        })
      },

      save () {

      },

      exit () {
          console.log('exit')
      }
  },
  created () {
      let self = this
      // 新增页面  
      if (self.$route.params.id !== 'default') {
        
      } else {
        // 编辑页面

      }
  },
  components: {
      'upload': Upload
  }
}
</script>
<style lang="scss">

</style>
