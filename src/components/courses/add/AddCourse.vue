<template lang="pug">
  div.width_flud
    //- modal(v-on:btnFunc="btnFunc" :header="modal.header" :message="modal.message" :footer="modal.footer")
    form(@submit.prevent="validateBeforeSubmit")
        div.row
            div.col   
                div.form-group.row
                    label.col-sm-3.col-form-label(for="name") 姓名
                    div.col-sm-9
                        input.form-control(type="text" v-model="payload.course_name"  name="name"  v-validate="'required|max:10'" data-vv-as="姓名" :class="{'error': errors.has('name')}")
                        div.error(v-if="errors.has('name')") {{ errors.first('name') }}
                div.form-group.row
                    label.col-sm-3.col-form-label(for="category") 类型
                    div.col-sm-9
                        select.form-control(type="text" v-model="payload.category_id")
                            option(v-for="(cateItem, cateIndex) in categories" :value="cateItem.category_id") {{cateItem.category_name}}
            div.col
                div.form-group.row.height_flud
                    label.col-sm-3.col-form-label(for="img") 封面
                    div.col-sm-9#imageContainer
                        //- img.picrute.form-control(v-if="payload.picture_url" :src="payload.picture_url")
                        common-upload(v-on:getImageUrl="getImageUrl" :accepted-files="acceptedFiles")
                        //- input.form-control.hidden-uploader(type="file" aria-describedby="fileHelp" @change="uploadImg")
            div.w-100
            div.col
                div.form-group.row
                    label.col-sm-3.col-form-label(for="category") 讲师
                    div.col-sm-9
                        select.form-control(type="text" v-model="payload.tutor_id")
                            option(v-for="(tutorItem, tutorIndex) in tutors" :value="tutorItem.tutor_id") {{tutorItem.tutor_name}}
                //- div.form-group.row
                //-     label.col-sm-3.col-form-label(for="category") 上架时间
                //-     div.col-sm-9
                //-         input.form-control(type="datetime-local" v-model="payload.sn")
                //- div.form-group.row
                //-     label.col-sm-3.col-form-label 状态
                //-     div.col-sm-9
                //-         input.form-control(type="text")
            div.col
                div.form-group.row
                    label.col-sm-3.col-form-label(for="img") 课程简介
                    div.col-sm-9
                        textarea.form-control(v-model="payload.depict"  name="depict"  v-validate="'required|min:50|max:500'" data-vv-as="课程简介" :class="{'error': errors.has('depict')}")
                        div.error(v-if="errors.has('depict')") {{ errors.first('depict') }}
        div.row
            div.col.chapter-manager
            div.col.test-uploader
        div.row.center-widget(v-if="payload.course_id")
            div.col-sm-4.border.add-node
                add-node(:course_id="payload.course_id" :node-data-list="nodeData" :primary-name="payload.course_name")
            div.col-sm-8.border
                add-resource(v-if="activedInfo.activedType" :course-id="payload.course_id")
        //- div.row.no-gutters
        //-     label.col-sm-3.col-form-label(for="img") 评分方式： 课程签到
        //-     div.col-sm-1
        //-         input.form-control
        //-     label.col-sm-3.col-form-label(for="img") 课程习题
        //-     div.col-sm-1
        //-         input.form-control
        //-     label.col-sm-3.col-form-label(for="img") 课程考核
        //-     div.col-sm-1
        //-         input.form-control
        div.btn-group.row.margin-top
            button.btn.btn-primary(type="submit") 保存
            button.btn.btn-primary(@click.prevent="exit") 取消
            button.btn.btn-primary(v-if="payload.course_id" @click.prevent="soldInOrOut" disabled) 上架/下架
</template>
<script>
import courseService from '@/service/course.service'
import Upload from '@/components/common/Upload'
import AddNode from './AddNode'
import Modal from '@/components/common/modal/Modal'
import loadingMixin from '@/config/mixins/loading.mixin'
import AddResource from './AddResource'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
        payload: {
            course_id: '',
            course_name: '',
            category_id: '',
            depict: '',
            tutor_id: '1',
            picture_url: '',
            icon_url: '/icon/a.icon',
            is_leaf_node: true,
            learning_target_number: 1,
            recommended_level: 0
        },
        categories: [],
        tutors: [],
        nodeData: [],
        modal: {
            header: '提示',
            footer: {
                btns: [
                    {text: '确认', type: 'confirm'},
                    {text: '取消', type: 'quit'}
                ]
            },
            message: '确定要增加'
        },
        acceptedFiles: 'image/*',
        maxFilesize: 1
    }
  },
  mixins: [
      loadingMixin
  ],
  methods: {
      btnFunc (type) {
          console.log(type)
      },
      validateBeforeSubmit () {
        this.$validator.validateAll().then(() => {
            this.save()
        }).catch(() => {
            return
        })
      },
      save () {
        let self = this
        let successToast = {
            message: '成功保存课程',
            theme: 'success'
        }
        let failedToast = {
            message: '保存课程失败',
            theme: 'warning'
        }
        // 修改用PUT保存数据,新增用POST保存数据
        if (this.payload.course_id) {
            let payload = Object.assign({}, this.payload)
            delete payload.course_id
            courseService.saveEditedCourse(this.payload.course_id, payload).then(
                (res) => {
                    self.$toast(successToast)
                    self.$router.push('/plat/courses')
                }, () => {
                    self.$toast(failedToast)
                }
            )
        } else {
            courseService.saveCourse(this.payload).then(
                (res) => {
                    self.$toast(successToast)
                    self.$router.push('/plat/courses')
                }, () => {
                    self.$toast(failedToast)
                }
            )
        }
      },
      exit () {
        this.$router.push('/plat/courses')
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
  computed: {
      ...mapGetters({
          activedInfo: 'courseNodeActived'
      })
  },
  created () {
    let self = this
    let couserPromise = null
    let nodePromise = null
    if (self.$route.params.id !== 'default') {
        self.payload.course_id = self.$route.params.id
        couserPromise = courseService.getSimpleCourse(self.payload.course_id).then(
            (res) => {
                self.payload.course_name = res.course_name
                self.payload.category_id = res.category_id
                self.payload.depict = res.depict
                self.payload.tutor_id = res.tutor_id
                self.payload.picture_url = res.picture_url
                self.payload.is_leaf_node = res.is_leaf_node
                self.payload.learning_target_number = res.learning_target_number
                self.payload.recommended_level = res.recommended_level
            }
        )
        nodePromise = courseService.getCoursesDetails(self.payload.course_id).then(
            (res) => {
                self.nodeData = res
            }
        )
    }
    self.now = self.timestamp = Date.parse(new Date()) / 1000
    let categoryPromise = courseService.getCategories().then(
        (res) => {
            self.categories = res.data
            self.payload.category_id = self.categories[0].category_id
            self.hiddenLoading()
        }
    )
    let tutorPromise = courseService.getAllTutors().then(
        (res) => {
            self.tutors = res.data
            self.payload.tutor_id = self.tutors[0].tutor_id
            self.hiddenLoading()
        }
    )
    let toast = {
        message: '数据加载完成',
        theme: 'success'
    }
    if (couserPromise) {
        Promise.all([couserPromise, categoryPromise, tutorPromise]).then(

            self.$toast(toast)
        )
    } else {
        Promise.all([categoryPromise, tutorPromise]).then(

            self.$toast(toast)
        )
    }
  },
  mounted () {
  },
  components: {
    'common-upload': Upload,
    'add-node': AddNode,
    'add-resource': AddResource,
    'modal': Modal
  }
}
</script>
<style lang="scss" scoped>
.center-widget {
    height: 400px;
}

.add-node {
    overflow: auto;
}
</style>
