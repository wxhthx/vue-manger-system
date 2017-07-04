<template lang="pug">
  div.width-flud
    div.form-group.row
      label.col-sm-1.col-form-label(for="input-name") 姓名:
      div.col-sm-2
        input.form-control(type="text" id="input-name" v-model="payload.user_name")
      label.col-sm-1.col-form-label(for="input-phone")  手机:
      div.col-sm-2
        input.form-control(type="text" id="input-phone" v-model="payload.phone")
      label.col-sm-1.col-form-label(for="input-school")  学校/单位:
      div.col-sm-2
        select.form-control(type="text" id="input-school" v-model="payload.organization_id")
          option(v-for="(orgaItem, orgaIndex) in payload.organizations" :value="orgaItem.id") {{orgaItem.name}}
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
      button.btn.btn-primary(@click="addAdmin") 添加用户
</template>
<script>
import CTable from '../common/CTable'
import Service from '@/service/users.service'
import OrganizationService from '@/service/organization.service'
import loadingMixin from '@/config/mixins/loading.mixin'

export default {
  data () {
      return {
        hello: 'hello world',
        detailsTable: [],
        detailsThead: [],
        operateList: [],
        addAdminPath: '/plat/addUser/',
        pagination: 4,
        defaultQuery: false,
        payload: {
          user_name: '',
          phone: '',
          organizations: '',
          organization_id: '',
          sno: ''
        }
      }
  },
  mixins: [
    loadingMixin
  ],
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
        this.$modal({
          header: '提示',
          message: '确认删除该用户？',
          footer: [
            {type: 'ok', text: '确认', method: this.deleteUser, argu: [colItem]},
            {type: 'cancel', text: '取消'}
          ]
        })
        
        return
      }
    },
    deleteUser (colItem) {
      this.defaultQuery = true
      this.$modal({
        visible: false
      })
        Service.deleteUser(colItem[0].user_id).then(
          (res) => {
            this.$toast('用户删除成功')
            this.initQuery()
          }
        )
    },
    query () {
      this.defaultQuery = true
      let data = {}
      if (this.payload.user_name) {
        data.user_name = this.payload.user_name
      }
      if (this.payload.phone) {
        data.phone = this.payload.phone
      }
      if (this.payload.organization_id) {
        data.organizationId = this.payload.organization_id
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
    getAllPromise () {},
    orgaPromise () {},
    initQuery (data) {
      this.getAllPromise = Service.getAllUsers(data).then(
        (res) => {
          if (this.defaultQuery) {
            this.hiddenLoading()
            this.defaultQuery = false
          }
          this.detailsTable = res.users
          console.log('getAllPromise resolved')
        }
      )
      this.orgaPromise = OrganizationService.getAll().then(
        (res) => {
          let resData = Object.assign([], res.organizations)
          resData.unshift({id: 0, name: 'All'})
          this.payload.organizations = resData
          if (!this.payload.organization_id) {
            this.payload.organization_id = this.payload.organizations[0].id
          }
        }
      )
      Promise.all([this.getAllPromise, this.orgaPromise]).then(
        (res) => {
            if (this.defaultQuery) {
              this.hiddenLoading()
              this.getAllPromise = null
              this.orgaPromise = null
              this.defaultQuery = false
            }
            console.log('init all Promise resolved')
        }
      )
      // return [getAllPromise, orgaPromise]
    },

    getOrganizations () {
      return OrganizationService.getAll().then(
        (res) => {
          this.payload.organizations = res.organizations
          // this.payload.organization_id = this.payload.organizations[0].id
        }
      )
    }
  },
  created () {
    this.initQuery({})
    this.detailsThead = Service.getDetailsTheadData()
    this.operateList = Service.getDetailsOprateList()
    Promise.all([this.getAllPromise, this.orgaPromise]).then(
      (res) => {
          console.log('all Promise resolved')
          this.hiddenLoading()
          this.$toast('用户数据加载完成')
          this.getAllPromise = null
          this.orgaPromise = null
      }
    )
  }
}
</script>
<style lang="scss">

</style>

