<template lang="pug">
  div.width-flud
    div.form-group.row
        label.col-sm-1.col-form-label(for="input-name") 名称:
        div.col-sm-3
            input.form-control(type="text" id="input-name" v-model="payload.courseName")
        label.col-sm-1.col-form-label(for="input-tutor")  讲师:
        div.col-sm-3
            select.form-control(type="text" v-model="payload.tutor_id")
                option(v-for="(tutorItem, tutorIndex) in tutors" :value="tutorItem.tutor_id") {{tutorItem.tutor_name}}
        label.col-sm-1.col-form-label(for="input-categories")  类型:
        div.col-sm-3
            select.form-control(id="input-categories" v-model="payload.categoryId")
                option(v-for="(cateItem, cateIndex) in categories" :value="cateItem.category_id") {{cateItem.category_name}}
    div.form-group.row.justify-content-end.padding-right
        button.btn.btn-primary(@click="query") 搜索
    common-table(v-on:operator="operator"
      v-bind:tableData="tableData"
      :pagination="pagination"
      v-bind:theadData="theadData"
      :operateList="operateList")
    div.d-flex.justify-content-end.margin-bottom
        button.btn.btn-primary(@click="addCourse") 添加课程
</template>
<script>
import courseService from '@/service/course.service'
import CTable from '@/components/common/CTable'
import loadingMixin from '@/config/mixins/loading.mixin'
export default {
  data () {
    return {
        loading: true,
        categories: [],
        tutors: [],
        payload: {
            courseName: '',
            tutor_id: '',
            categoryId: ''
        },
        tableData: [],
        theadData: [],
        operateList: [],
        pagination: 3,
        addCoursePath: '/plat/addCourse/'
    }
  },
  mixins: [
      loadingMixin
  ],
  methods: {
      query () {
        let self = this
        let payload = Object.assign({}, this.payload)
        if (!payload.courseName) {
            delete payload.courseName
        }
        if (!payload.tutor_id) {
            delete payload.tutor_id
        } else {
            delete payload.tutor_id
            payload.tutorId = this.payload.tutor_id
        }
        if (!payload.categoryId) {
            delete payload.categoryId
        }
        courseService.getSelectedCourses(payload).then(
            (res) => {
                self.initData(res)
            }
        )
      },
      operator (item, btn) {
        let self = this
        if (btn.type === 'edit') {
            this.$router.push(this.addCoursePath + item.course_id)
            return
        }
        if (btn.type === 'delete') {
            this.$modal({
                header: '提示',
                message: '是否要删除该课程?',
                footer: [
                    {type: 'ok', text: '确认', method: this.deleteCourse, argu: [item]},
                    {type: 'cancel', text: '取消'}
                ]
            })
        }
        if (btn.type === 'soldOut') {
            console.log('下架功能暂不支持')
        }
      },
      deleteCourse (item) {
        let self = this
        self.loading = true
        self.$modal({
            visible: false
        })
        let successToast = {
            message: '成功删除该课程',
            theme: 'success'
        }
        let failedToast = {
            message: '删除该课程失败',
            theme: 'warning'
        }
        courseService.deleteSimpleCourse(item[0].course_id).then(
            (res) => {
                self.$toast(successToast)
                courseService.getCourses().then(
                    (getres) => {
                        self.initData(getres) 
                    }
                )
            }, () => {
                self.$toast(failedToast)
            }
        )
      },
      addCourse () {
        this.$router.push(this.addCoursePath + 'default')
      },
      initData (res) {
        let tableData = Object.assign([], res.data)
        let self = this
        let successToast = {
            message: '成功加载课程数据',
            theme: 'success'
        }
        let failedToast = {
            message: '加载课程数据失败，请检查网络设备',
            theme: 'warning'
        }
        let func = tableData.map((item, index) => {
            return courseService.getTutorNameByIdList(item.tutor_id).then(
                (res) => {
                    let tutordata = res.data
                    let tutorNameArr = tutordata.map((tutorItem) => {
                        return tutorItem.tutor_name
                    })
                    item.tutor_id = tutorNameArr.join(',')
                    self.categories.forEach((cateItem) => {
                        if (item.category_id === cateItem.category_id) {
                            item.category_name = cateItem.category_name
                        }
                    })
                    return item
                }
            )
        })
        Promise.all(func).then(
            (res) => {
                self.tableData = res
                self.hiddenLoading()
                self.$toast(successToast)
            }, () => {
                self.$toast(failedToast)
            }
        )
      }
  },
  created () {
    var self = this
    courseService.getCategories().then(
        (res) => {
            let resData = Object.assign([], res.data)
            resData.unshift({category_id: 0, category_name: 'All'})
            self.categories = resData
            if (!self.payload.categoryId) {
                 self.payload.categoryId = self.categories[0].category_id
            }
            courseService.getCourses().then(
                (res) => {
                    this.initData(res)
                }
            )
        })
    courseService.getAllTutors().then(
        (res) => {
            let resData = Object.assign([], res.data)
            resData.unshift({tutor_id: 0, tutor_name: 'All'})
            this.tutors = resData
            if (!this.payload.tutor_id) {
                this.payload.tutor_id = this.tutors[0].tutor_id
            }    
        }
    )
    this.theadData = courseService.getTheadData()
    this.operateList = courseService.getOperateList()
  },
  components: {
      'common-table': CTable
  }
}
</script>
<style lang="scss">

</style>

