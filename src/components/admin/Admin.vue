<template lang="pug">
  div.width-flud
    form
      div.form-group.row
        label.col-sm-1.col-form-label(for="input-name") 姓名:
        div.col-sm-3
          input.form-control(type="text" id="input-name")
        label.col-sm-1.col-form-label(for="input-phone")  手机:
        div.col-sm-3
          select.form-control(id="input-phone")
        label.col-sm-1.col-form-label(for="input-status")  状态:
        div.col-sm-3
          input.form-control(type="text" id="input-status")
      div.form-group.row.justify-content-end.padding-right
        button.btn.btn-primary 搜索
    div.width-flud
      admin-details(v-on:operator="operator"
      v-bind:tableData="detailsTable"
      :pagination="pagination"
      v-bind:theadData="detailsThead"
      v-bind:operateList="operateList")
    div.d-flex.justify-content-end.margin-bottom
      button.btn.btn-primary(@click="addAdmin") 添加管理员
</template>
<script>
import CTable from '../common/CTable'
import Service from '@/service/admin.service'
export default {
  data () {
      return {
        hello: 'hello world',
        detailsTable: [],
        detailsThead: [],
        operateList: [],
        addAdminPath: '/plat/addAdmin',
        pagination: 4
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
    }
  },
  created () {
    this.detailsTable = Service.AdminService.getDetailsTableData()
    this.detailsThead = Service.AdminService.getDetailsTheadData()
    this.operateList = Service.AdminService.getDetailsOprateList()
  }
}
</script>
<style lang="scss" scoped>
.padding-right {
  padding-right: 15px;
}
</style>
