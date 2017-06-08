<template lang="pug">
  div.width-flud
    div.loading-div(v-if="loading")
      div.loading
    form
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
  methods: {
      query () {
        let self = this
        let payload = Object.assign({}, this.payload)
        if (!payload.curseName) {
            delete payload.curseName
        }
        delete payload.tutor_id
        courseService.getSelectedCourses(payload).then(
            (res) => {
                console.log(res)
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
            self.loading = true
            courseService.deleteSimpleCourse(item.course_id).then(
                (res) => {
                    courseService.getCourses().then(
                        (getres) => {
                            self.initData(getres)
                        }
                    )
                } 
            )
        }
        if (btn.type === 'soldOut') {
            console.log('下架功能暂不支持')
        }
      },
      addCourse () {
        this.$router.push(this.addCoursePath + 'default')
      },
      initData (res) {
        let tableData = Object.assign([], res.data)
        let self = this
        self.tableData = tableData.map((item, index) => {
            item.date = '2017.05.05'
            item.status = '正常'
            self.categories.forEach((cateItem) => {
                if (item.category_id === cateItem.category_id) {
                    item.category_name = cateItem.category_name
                }
            })
            return item
        })
        self.loading = false
      }
  },
  created () {
    var self = this
    courseService.getCategories().then(
        (res) => {
            self.categories = res.data
            self.payload.categoryId = self.categories[0].category_id
            courseService.getCourses().then(
                (res) => {
                    this.initData(res)
                }
            )
        })
    courseService.getAllTutors().then(
        (res) => {
            this.tutors = res.data
            this.payload.tutor_id = this.tutors[0].tutor_id
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

