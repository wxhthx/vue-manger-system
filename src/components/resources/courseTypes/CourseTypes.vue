<template lang="pug">
<!-- root node-->
  //- primaryMenu
  ul.primary-ul
    li.primary-li
        a.primary-a(href="javascript:void(0)" @click="taggleNode(nodeDataList)") {{primaryName}}
        a.iconfont-node.icon-add-node.node-icon-margin-left(href="javascript:void(0)" @click="addSecondaryLi")
        //- secondNode
        ul.secondary-ul(v-if="nodeDataList && nodeDataList.length" :class="[nodeDataList.hidden ? hiddenClass : showClass]")
            li.secondary-li(v-for="(secItem, secIndex) in nodeDataList")
                input.control-form(v-if="secItem.valid" v-model="secItem.class_name" :placeholder="secItem.placeholder" @blur="secondaryBlur(secItem)")
                a.secondary-a(v-else href="javascript:void(0)" @click="taggleNode(secItem)") {{secItem.class_name}}
                a.iconfont-node.icon-add-node.node-icon-margin-left(v-if="!secItem.valid" href="javascript:void(0)" @click="addThirdaryLi(secItem)")
                a.iconfont-node.icon-delete.node-btn(v-if="!secItem.valid" href="javascript:void(0)" @click="deleteSecondary(secItem, secIndex, nodeDataList)")
                a.iconfont-node.icon-edit.node-btn(v-if="!secItem.valid" href="javascript:void(0)" @click="editSecondary(secItem)")
                //- //- thirdNode
                ul.thirdary-ul(v-if="secItem.children && secItem.children.length" :class="[secItem.hidden ? hiddenClass : showClass]")
                    li.thirdary-li(v-for="(thirdItem, thirdIndex) in secItem.children")
                        input.control-form(v-if="thirdItem.valid" v-model="thirdItem.category_name" @blur="thirdBlur(thirdItem, secItem)")
                        label.third-a(v-else href="javascript:void(0)" @click="taggleNode(thirdItem)") {{thirdItem.category_name}}
                        //- a.iconfont-node.icon-add-node.node-icon-margin-left(v-if="!thirdItem.valid" href="javascript:void(0)" @click="addFourthLi(thirdItem)")
                        a.iconfont-node.icon-delete.node-btn(v-if="!thirdItem.valid" href="javascript:void(0)" @click="deleteThird(thirdItem, thirdIndex, secItem.children)")
                        a.iconfont-node.icon-edit.node-btn(v-if="!thirdItem.valid" href="javascript:void(0)" @click="editThird(thirdItem)")
</template>
<script>
import courseTypeService from '@/service/resources.courses.service'
import loadingMixin from '@/config/mixins/loading.mixin'
export default {
  data () {
      return {
          nodeDataList: {},
          primaryName: '课程类型',
          secondaryItem: {
              class_name: '',
              valid: true
          },
          thirdaryItem: {
              category_name: '',
              valid: true
          },
          validPointer: true,
          hiddenClass: 'hidden',
          showClass: 'show'
      }
  },
  mixins: [
      loadingMixin
  ],
  methods: {
      taggleNode (node) {
        if (node.hidden === undefined) {
            this.$set(node, 'hidden', true)
        } else {
            node.hidden = !node.hidden
        }
      },
      addSecondaryLi () {
          if (!this.validPointer) {
              return
          }
          let secondaryItem = Object.assign({}, this.secondaryItem, {children: []})
          if (!this.nodeDataList) {
            this.nodeDataList = []
          }
          this.nodeDataList.push(Object.assign({}, secondaryItem))
        //   this.nodeDataList.children[this.nodeDataList.children.length - 1].thirdaryList = []
          this.validPointer = false
      },
      secondaryBlur (item) {
          if (!item.class_name) {
            return
          }
          let self = this
          let payload = {class_name: item.class_name, depict: '', is_leaf_node: 0, picture_url: ''}
          if (!item.class_id) {
            // let payload = {class_name: item.class_name, depict: '', is_leaf_node: 0, picture_url: ''}
            courseTypeService.saveClass(payload).then(
                (res) => {
                    self.hiddenLoading()
                    self.validPointer = true
                    item.valid = false
                    item.class_id = res.class_id
                }
            )
          } else {
            // let payload = {class_name: item.class_name, }
            courseTypeService.updateClass(item.class_id, payload).then(
               (res) => {
                   self.hiddenLoading()
                   self.validPointer = true
                   item.valid = false
                } 
            )
          }      
      },

      deleteSecondary (item, index, array) {
          let self = this
          courseTypeService.deleteClass(item.class_id).then(
              (res) => {
                  self.hiddenLoading()
                  array.splice(index, 1)
              }
          )
      },

      editSecondary (item) {
        if (item.valid === undefined) {
            this.$set(item, 'valid', true)
        } else {
            item.valid = true
        }
      },
      taggleChapter () {

      },
      addThirdaryLi (item) {
          if (!this.validPointer) {
              return
          }
          if (!item.children) {
            //   item.children = []
              this.$set(item, 'children', [])
          }
          let thirdaryItem = Object.assign({}, this.thirdaryItem, {children: []})
          item.children.push(Object.assign({}, thirdaryItem))
          this.validPointer = false
      },

      deleteThird (item, index, array) {
        let self = this
        courseTypeService.deleteCategory(item.category_id).then(
            (res) => {
                self.hiddenLoading()
                array.splice(index, 1)
            }
        )
      },

      editThird (item) {
        if (item.valid === undefined) {
            this.$set(item, 'valid', true)
        } else {
            item.valid = true
        }
      },

      thirdBlur (item, chapter) {
        if (!item.category_name) {
            return
        }
        let self = this
        if (!item.category_id) {
            let payload = {
              category_name: item.category_name,
              class_id: chapter.class_id,
              depict: "",
              is_leaf_node: 0,
              picture_url: ""
            }
            courseTypeService.saveCategory(payload).then(
                (res) => {
                    self.hiddenLoading()
                    self.validPointer = true
                    self.$set(item, 'valid', false)
                    item.category_id = res.category_id
                    item.class_id = res.class_id
                }
            )
        } else {
            let payload = {
                category_name: item.category_name,
                class_id: item.class_id,
                depict: "",
                is_leaf_node: 0,
                picture_url: ""
            }
            courseTypeService.updateCategory(item.category_id, payload).then(
                (res) => {
                    self.hiddenLoading()
                    self.validPointer = true
                    item.valid = false
                }
            )
        }
      }
  },
  created () {
    courseTypeService.getAllCourseTypes().then(
      (res) => {
        this.hiddenLoading()
        this.nodeDataList = res
      }
    )
  }
}
</script>
<style lang="scss" scoped>
.primary-ul {
    text-align: left;
    transition: 0.3s;
    & > .primary-li {
        cursor: pointer;
    }
}
.secondary-ul, .thirdary-ul, .fourth-ul{
    margin-left: 15px;
}
.node-btn {
    margin-left: 10px;
}
.node-icon-margin-left {
    margin-left: 8px;
}
.hidden {
    display: none;
}
.show {
    display: block;
}
</style>
