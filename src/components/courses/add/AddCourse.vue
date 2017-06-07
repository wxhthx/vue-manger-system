<template lang="pug">
  div.width_flud
    form(@submit.prevent="validateBeforeSubmit")
        div.row
            div.col   
                div.form-group.row
                    label.col-sm-3.col-form-label(for="name") 姓名
                    div.col-sm-9
                        input.form-control(type="text" v-model="payload.name")
                div.form-group.row
                    label.col-sm-3.col-form-label(for="category") 类型
                    div.col-sm-9
                        select.form-control(type="text" v-model="payload.category_id")
                            option(v-for="(cateItem, cateIndex) in categories" :value="cateItem.category_id") {{cateItem.category_name}}
            div.col
                div.form-group.row.height_flud
                    label.col-sm-3.col-form-label(for="img") 封面
                    div.col-sm-9#imageContainer
                        common-upload(v-on:getImageUrl="getImageUrl")
                        //- input.form-control.hidden-uploader(type="file" aria-describedby="fileHelp" @change="uploadImg")
            div.w-100
            div.col
                div.form-group.row
                    label.col-sm-3.col-form-label(for="category") 讲师
                    div.col-sm-9
                        select.form-control(type="text" v-model="payload.category_id")
                            option(v-for="(cateItem, cateIndex) in categories" :value="cateItem.category_id") {{cateItem.category_name}}
                div.form-group.row
                    label.col-sm-3.col-form-label(for="category") 上架时间
                    div.col-sm-9
                        input.form-control(type="datetime-local" v-model="payload.sn")
                div.form-group.row
                    label.col-sm-3.col-form-label 状态
                    div.col-sm-9
                        input.form-control(type="text")
            div.col
                div.form-group.row
                    label.col-sm-3.col-form-label(for="img") 课程简介
                    div.col-sm-9
                        textarea.form-control(v-model="payload.depict")
        div.row
            div.col.chapter-manager
            div.col.test-uploader
        div.row.no-gutters
            label.col-sm-3.col-form-label(for="img") 评分方式： 课程签到
            div.col-sm-1
                input.form-control
            label.col-sm-3.col-form-label(for="img") 课程习题
            div.col-sm-1
                input.form-control
            label.col-sm-3.col-form-label(for="img") 课程考核
            div.col-sm-1
                input.form-control
        div.btn-group.row.margin-top
            button.btn.btn-primary(@click="save") 保存
            button.btn.btn-primary(@click="exit") 取消
            button.btn.btn-primary(@click="soldInOrOut") 上架/下架
</template>
<script>
import courseService from '@/service/course.service'
import Upload from '@/components/common/Upload'
export default {
  data () {
    return {
        payload: {
            name: '',
            category_id: '',
            depict: '',
            tutor_id: '',
            picture_url: '',
            sn: ''
        },
        categories: []
    }
  },
  methods: {
      validateBeforeSubmit () {

      },
      save () {

      },
      exit () {

      },
      soldInOrOut () {

      },
      uploadImg (e) {
        let files = e.target.files || e.dataTransfre.files
        if (!files.length) {
            return
        }
        this.createImage(files[0])
      },
      createImage (file) {
        let image = new Image()
        let reader = new FileReader()
        var self = this
        reader.onload = (e) => {
            self.image = e.target.result
        }
        reader.readAsDataURL(file)
      },
      getImageUrl (url) {
          this.payload.picture_url = url
      }
  },
  created () {
    var self = this
    self.now = this.timestamp = Date.parse(new Date()) / 1000
    courseService.getCategories().then(
        (res) => {
            this.categories = res.data
            this.payload.category_id = this.categories[0].category_id
        }
    )
  },
  mounted () {
  },
  components: {
    'common-upload': Upload
  }
}
</script>
<style lang="scss">

</style>
