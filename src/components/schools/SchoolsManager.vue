<template lang="pug">
  div.width-flud
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
import loadingMixin from '@/config/mixins/loading.mixin'
export default {
  data () {
      return {
        detailsTable: [],
        detailsThead: [],
        operateList: [],
        addAdminPath: '/plat/addSchool/',
        pagination: 4,
        loading: true
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
        this.$router.push(this.addAdminPath + colItem.organization_id)
        return
      }
      if (operateItem.type === 'delete') {
        Service.deleteOrganization().then(
          (res) => {
            this.initQuery()
          }
        )
        return
      }
    },
    addAdmin () {
      this.$router.push(this.addAdminPath + 'default')
      // this.$modal({
      //   message: '请确认继续',
      //   header: '提示',
      //   footer: {
      //     btns: [
      //       {text: '确认', type: 'confirm'},
      //       {text: '取消', type: 'exit'}
      //     ]
      //   }
      // })
    },
    query () {
    },
    getAllPromise () {},
    initQuery () {
      this.getAllPromise = Service.getAll().then(
        (res) => {
            this.detailsTable = res.school
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
