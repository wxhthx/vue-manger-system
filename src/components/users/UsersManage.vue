<template lang="pug">
  div.width-flud
    div.loading-div(v-if="loading")
      div.loading
    form
      div.form-group.row
        label.col-sm-1.col-form-label(for="input-name") 姓名:
        div.col-sm-2
          input.form-control(type="text" id="input-name" v-model="payload.user_name")
        label.col-sm-1.col-form-label(for="input-phone")  手机:
        div.col-sm-2
          input.form-control(type="text" id="input-phone" v-model="payload.phone")
        label.col-sm-1.col-form-label(for="input-school")  学校/单位:
        div.col-sm-2
          input.form-control(type="text" id="input-school" v-model="payload.organization_name")
        label.col-sm-1.col-form-label(for="input-number")  学号/工号:
        div.col-sm-2
          input.form-control(type="text" id="input-number" v-model="payload.sno")
      div.form-group.row.justify-content-end.padding-right
        button.btn.btn-primary(@click="query") 搜索
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
import Service from '@/service/users.service'
export default {
  data () {
      return {
        hello: 'hello world',
        detailsTable: [],
        detailsThead: [],
        operateList: [],
        addAdminPath: '/plat/addUser/',
        pagination: 4,
        loading: true,
        payload: {
          user_name: '',
          phone: '',
          organization_name: '',
          sno: ''
        }
      }
  },
  components: {
    'admin-details': CTable
  },
  methods: {
    operator (colItem, operateItem) {
      if (operateItem.type === 'edit') {
        this.$router.push(this.addAdminPath + colItem.user_id)
        return
      }
      if (operateItem.type === 'delete') {
        Service.deleteUser(colItem.user_id).then(
          (res) => {
            this.$toast('用户删除成功')
            this.initQuery()
          }
        )
        return
      }
    },
    query () {
      let data = {}
      if (this.payload.user_name) {
        data.user_name = this.payload.user_name
      }
      if (this.payload.phone) {
        data.phone = this.payload.phone
      }
      if (this.payload.organization_name) {
        data.organizationName = this.payload.organization_name
      }
      if (this.payload.sno) {
        data.sno = this.payload.sno
      }
      this.initQuery(data)
    },
    addAdmin () {
      this.$router.push(this.addAdminPath + 'default')
    },
    hideLoading () {
      this.loading = false
    },
    initQuery (data) {
      Service.getAllUsers(data).then(
        (res) => {
          this.detailsTable = res.users
          this.$toast('用户数据加载完成')
          this.hideLoading()
        }
      )
    }
  },
  created () {
    this.initQuery({})
    this.detailsThead = Service.getDetailsTheadData()
    this.operateList = Service.getDetailsOprateList()
  }
}
</script>
<style lang="scss">

</style>

