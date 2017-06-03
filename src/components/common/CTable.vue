<template lang="pug">
  table.table.table-striped
    thead.table-active
        tr
            th(v-for="(theadItem, theadIndex) in theadData") {{theadItem.text}}
    tbody
        tr(v-for="(rowItem, rowIndex) in tableData")
            th(scope="row") {{rowItem[rowProperty]}}
            td(v-for="(typeItem, typeIndex) in colType")
                span(v-if="typeIndex !== colType.length - 1") {{rowItem[typeItem]}}
                div.btn-group(v-if="ifoperate && typeIndex === colType.length - 1" role="group")
                    button.btn.btn-secondary(v-for="(btnItem, btnIndex) in operateList" @click="operator(rowItem, btnItem)") {{btnItem.text}}
</template>
<script>
/**
 * /@author: wenxinghua
 * 通用型Table组件
 */
export default {
  props: ['operateList', 'theadData', 'tableData'],
  data () {
      return {
        rowProperty: 'index'
      }
  },
  computed: {
      colType () {
          let self = this
          let data = Object.assign([], self.theadData)
          let newArr = []
          for (let index in data) {
            if (self.rowProperty !== data[index].id) {
                  newArr.push(data[index].id)
              }
          }
          return newArr
      },
      ifoperate () {
          return this.operateList.length
      }
  },
  created () {
    this.operateList = !this.operateList ? [] : this.operateList
  },
  methods: {
    operator (rowItem, operateItem) {
        // 父组件触发该事件
        this.$emit('operator', rowItem, operateItem)
    }
  }
}
</script>
<style lang="scss">

</style>
