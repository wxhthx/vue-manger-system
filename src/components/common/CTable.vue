<template lang="pug">
div.width_flud
    table.table.table-striped
        thead.table-active
            tr
                th 序号
                th(v-for="(theadItem, theadIndex) in theadData") {{theadItem.text}}
        tbody
            tr(v-for="(rowItem, rowIndex) in pagiTableData")
                th(scope="row") {{rowIndex + 1}}
                td(v-for="(typeItem, typeIndex) in colType")
                    span(v-if="typeIndex !== colType.length - 1 || !ifoperate") {{rowItem[typeItem]}}
                    div.btn-group(v-if="ifoperate && typeIndex === colType.length - 1" role="group")
                        button.btn.btn-secondary(v-for="(btnItem, btnIndex) in operateList" :disabled="btnItem.disabled" @click="operator(rowItem, btnItem)") {{btnItem.text}}
    nav(aria-label="Page navigation example")
        ul.pagination.justify-content-end(v-if="pagination !== -1")
            li.page-item.first-page(:class="{'disabled': curPageIndex === 0}")
                a.page-link(href="javascript:void(0)" @click="toFirst") <<
            li.page-item.pre-page(:class="{'disabled': curPageIndex === 0}")
                a.page-link(href="javascript:void(0)" @click="toPre") <
            li.page-item(v-for="pagi in pageSize" :class="{'active': pagi === curPageIndex + 1}")
                a.page-link(href="void:javascript(0)"  @click="toCur(pagi)") {{pagi}}
            li.page-item.next-page(:class="{'disabled': curPageIndex === pageSize -1}")
                a.page-link(href="javascript:void(0)" @click="toNext") >
            li.page-item.last-page(:class="{'disabled': curPageIndex === pageSize -1}")
                a.page-link(href="javascript:void(0)" @click="toLast") >>
</template>
<script>
/**
 * /@author: wenxinghua
 * 通用型Table组件
 */
export default {
  props: ['operateList', 'theadData', 'tableData', 'pagination'],
  data () {
      return {
        rowProperty: 'index',
        curPageIndex: 0
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
      /**
       * judge the table contains any operated methods
       */
      ifoperate () {
          return this.operateList.length
      },

      /**
       * caculate the data of pagination table
       */
      pagiTableData () {
        let allTableData = Object.assign([], this.tableData)
        let startIndex = this.curPageIndex * this.pagination
        return allTableData.splice(startIndex, this.pagination)
      },
      
      pageSize () {
          return Math.ceil(this.tableData.length / this.pagination)
      }
  },
  created () {
    this.operateList = !this.operateList ? [] : this.operateList
    this.pagination = !this.pagination ? this.tableData.length : parseInt(this.pagination)
  },
  methods: {
    operator (rowItem, operateItem) {
        this.$emit('operator', rowItem, operateItem)
    },
    /**
     * back to the first page 
     */
    toFirst () {
        this.curPageIndex = 0
    },
    /**
     * back to the previous page 
     */
    toPre () {
        if (this.curPageIndex === 0) {
            return
        }
        this.curPageIndex --
    },
    /**
     * turn to the appointed page 
     */
    toCur (index) {
        this.curPageIndex = index - 1
    },
     /**
     * turn to the next page 
     */
    toNext () {
        if (this.curPageIndex === this.pageSize - 1) {
            return
        }
        this.curPageIndex ++
    },
    /**
     * turn to the last page 
     */
    toLast () {
        this.curPageIndex = this.pageSize - 1
    }
  }
}
</script>
<style lang="scss">

</style>
