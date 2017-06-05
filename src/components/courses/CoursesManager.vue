<template lang="pug">
  div.width-flud
    div.loading-div(v-if="loading")
      div.loading
    form
      div.form-group.row
        label.col-sm-1.col-form-label(for="input-name") 名称:
        div.col-sm-3
          input.form-control(type="text" id="input-name" v-model="payload.name")
        label.col-sm-1.col-form-label(for="input-tutor")  讲师:
        div.col-sm-3
          input.form-control(type="text" id="input-tutor" v-model="payload.tutor")
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
        payload: {
            name: '',
            tutor: '',
            categoryId: ''
        },
        tableData: [],
        theadData: [],
        operateList: [],
        pagination: 3
    }
  },
  methods: {
      query () {

      },
      operator () {

      },
      addCourse () {

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
                    let tableData = Object.assign([], res.data)
                    self.tableData = tableData.map((item, index) => {
                        item.index = index
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
            )
        })
    
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

