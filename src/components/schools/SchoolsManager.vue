<template lang="pug">
  div.width-flud
    div.loading-div(v-if="loading")
      div.loading
    form
      div.form-group.row
        label.col-sm-1.col-form-label(for="input-name") 姓名:
        div.col-sm-3
          input.form-control(type="text" id="input-name")
      div.form-group.row.justify-content-end.padding-right
        button.btn.btn-primary(@click="query") 搜索
    div.width-flud
      admin-details(v-on:operator="operator"
      v-bind:tableData="detailsTable"
      :pagination="pagination"
      v-bind:theadData="detailsThead"
      v-bind:operateList="operateList")
    div.d-flex.justify-content-end.margin-bottom
      button.btn.btn-primary(@click="addAdmin") 添加学校
</template>
<script>
import CTable from '../common/CTable'
import Service from '@/service/organization.service'
export default {
  data () {
      return {
        detailsTable: [],
        detailsThead: [],
        operateList: [],
        addAdminPath: '/plat/addAdmin',
        pagination: 4,
        loading: true
      }
  },
  components: {
    'admin-details': CTable
  },
  methods: {
    operator (colItem, operateItem) {
      console.log(colItem['name'])
      console.log(operateItem.type)
    },
    addAdmin () {
      this.$router.push(this.addAdminPath)
    },
    hideLoading () {
      this.loading = false
    },
    query () {
    }
  },
  created () {
    Service.getAll().then(
        (res) => {
            this.detailsTable = res.school
            this.hideLoading()
        }
    )
    this.detailsThead = Service.getTheadData()
    this.operateList = Service.getOperateList()
  }
}
</script>
<style lang="scss" scoped>

</style>
