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
        div.row
            div.curses-detail-caontainer(v-if="payload.organization_id")
        div.btn-group.row.margin-top
            button.btn.btn-primary(type="submit") 保存
            button.btn.btn-primary(@click.prevent="exit") 取消
</template>
<script>
import Upload from '@/components/common/Uploadimage'
import organizationService from '@/service/organization.service'
import loadingMixin from '@/config/mixins/loading.mixin'
export default {
  data () {
      return {
        payload: {
            name: '',
            organization_id: ''
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
        if (!self.payload.organization_id) {
            let data = {name: self.payload.name}
            organizationService.saveOrganizaiotn(data).then(
                (res) => {
                    self.$router.push('/plat/schools')
                }
            )
        } else {
            let data = {
                name: self.payload.name
            }
            organizationService.updateOrganizaiotn(self.payload.organization_id, data).then(
                (res) => {
                    self.$router.push('/plat/schools')
                }
            )
        }  
      },

      exit () {
          this.$router.push('/plat/schools')
      }
  },
  created () {
      let self = this
      // 新增页面  
      if (self.$route.params.id === 'default') {
        
      } else {
        // 编辑页面
        self.payload.organization_id = self.$route.params.id
        organizationService.getOrganizationById(self.payload.organization_id).then(
            (res) => {
                self.hiddenLoading()
                self.payload.name = res.name
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
.curses-detail-caontainer {
    height: 300px;
    background: #F3E5F5;
}
</style>
