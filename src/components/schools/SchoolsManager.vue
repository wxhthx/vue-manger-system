<template lang="pug">
  div.width-flud
    div.form-group.row
      label.col-sm-1.col-form-label(for="input-name") 名称:
      div.col-sm-3
        input.form-control(type="text" id="input-name" v-model="payload.name")
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
import loadingMixin from '@/config/mixins/loading.mixin'
export default {
  data () {
      return {
        detailsTable: [],
        detailsThead: [],
        operateList: [],
        addAdminPath: '/plat/addSchool/',
        pagination: 4,
        payload: {
          name: ''
        },
        btnQuery: false
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
        this.$router.push(this.addAdminPath + colItem.id)
        return
      }
      if (operateItem.type === 'delete') {
        this.$modal({
          header: '提示',
          message: '确认删除该学校？',
          footer: [
            {type: 'ok', text: '确认', method: this.deleteOrganization, argu: [colItem]},
            {type: 'cancel', text: '取消', method: this.quit}
          ]
        })
        return
      }
    },
    deleteOrganization (colItem) {
      this.$modal({
        visible: false
      })
      Service.deleteOrganization(colItem[0].id).then(
        (res) => {
          this.btnQuery = true
          this.initQuery()
        }
      )
    },
    addAdmin () {
      this.$router.push(this.addAdminPath + 'default')
    },
    query () {
      this.btnQuery = true
      let data = {name: this.payload.name}
      this.initQuery(data)
    },
    getAllPromise () {},
    initQuery (data) {
      this.getAllPromise = Service.getAll(data).then(
        (res) => {
            if (this.btnQuery) {
              this.hiddenLoading()
              this.btnQuery = false
            }
            this.detailsTable = res.organizations
            this.$toast({
              message: ' 成功加载学校数据',
              theme: 'success'
            })
        }
      )
    }
  },
  created () {
    let self = this
    self.initQuery()
    self.detailsThead = Service.getTheadData()
    self.operateList = Service.getOperateList()
    Promise.all([this.getAllPromise]).then(
      (res) => {
        self.hiddenLoading()
      }
    )
  }
}
</script>
<style lang="scss" scoped>

</style>
