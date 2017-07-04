<template lang="pug">
  div.width-flud
    div.form-group.row
      label.col-sm-1.col-form-label(for="input-name") 姓名:
      div.col-sm-3
        input.form-control(type="text" id="input-name" v-model="payload.tutor_name")
    div.form-group.row.justify-content-end.padding-right
      button.btn.btn-primary(@click="query") 搜索
    div.width-flud
      admin-details(v-on:operator="operator"
      v-bind:tableData="detailsTable"
      :pagination="pagination"
      v-bind:theadData="detailsThead"
      v-bind:operateList="operateList")
    div.d-flex.justify-content-end.margin-bottom
      button.btn.btn-primary(@click="addAdmin") 添加讲师
</template>
<script>
import CTable from '../../common/CTable'
import tutorService from '@/service/tutor.service'
import loadingMixin from '@/config/mixins/loading.mixin'

export default {
  data () {
      return {
        detailsTable: [],
        detailsThead: [],
        operateList: [],
        addAdminPath: '/plat/addTutor/',
        pagination: 4,
        defaultQuery: false,
        payload: {
          tutor_name: ''
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
      let self = this
      if (operateItem.type === 'delete') {
        this.$modal({
            header: '提示',
            message: '是否要删除该讲师?',
            footer: [
                {type: 'ok', text: '确认', method: this.deleteTutor, argu: [colItem]},
                {type: 'cancel', text: '取消'}
            ]
        })
      }
      if (operateItem.type === 'edit') {
        this.$router.push(this.addAdminPath + colItem.tutor_id)
      }
    },
    deleteTutor (colItem) {
      let self = this
      self.$modal({
        visible: false
      })
      tutorService.deleteTutor(colItem[0].tutor_id).then(
        (res) => {
          self.queryForTable({})
        }
      )
    },
    addAdmin () {
      this.$router.push(this.addAdminPath + 'default')
    },
    tablePromise () {},
    queryForTable (data) {
      let self = this
      self.tablePromise = tutorService.getAllTutors(data).then(
        (res) => {
          self.detailsTable = res.data
          self.hiddenLoading()
        }
      )
    },
    query () {
      let data = {tutor_name: this.payload.tutor_name}
      this.queryForTable(data)
    }
  },
  created () {
    this.queryForTable({})
    this.detailsThead = tutorService.getDetailsTheadData()
    this.operateList = tutorService.getDetailsOprateList()
  }
}
</script>
<style lang="scss" scoped>

</style>
