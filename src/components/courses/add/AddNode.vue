<template lang="pug">
<!-- root node-->
  //- primaryMenu
  ul.primary-ul
    li.primary-li
        a.primary-a(href="javascript:void(0)" @click="taggleNode(nodeDataList)") {{primaryName}}
        a.iconfont-node.icon-add-node.node-icon-margin-left(href="javascript:void(0)" @click="addSecondaryLi")
        //- secondNode
        ul.secondary-ul(v-if="nodeDataList.children && nodeDataList.children.length" :class="[nodeDataList.hidden ? hiddenClass : showClass]")
            li.secondary-li(v-for="(secItem, secIndex) in nodeDataList.children")
                input.control-form(v-if="secItem.valid" v-model="secItem.chapter_name" :placeholder="secItem.placeholder" @blur="secondaryBlur(secItem)")
                a.secondary-a(v-else href="javascript:void(0)" @click="taggleNode(secItem)") {{secItem.chapter_name}}
                a.iconfont-node.icon-add-node.node-icon-margin-left(v-if="!secItem.valid" href="javascript:void(0)" @click="addThirdaryLi(secItem)")
                a.iconfont-node.icon-delete.node-btn(v-if="!secItem.valid" href="javascript:void(0)" @click="deleteSecondary(secItem, secIndex, nodeDataList.children)")
                a.iconfont-node.icon-edit.node-btn(v-if="!secItem.valid" href="javascript:void(0)" @click="editSecondary(secItem)")
                //- //- thirdNode
                ul.thirdary-ul(v-if="secItem.children && secItem.children.length" :class="[secItem.hidden ? hiddenClass : showClass]")
                    li.thirdary-li(v-for="(thirdItem, thirdIndex) in secItem.children")
                        input.control-form(v-if="thirdItem.valid" v-model="thirdItem.section_name" @blur="thirdBlur(thirdItem, secItem)")
                        a.third-a(v-else href="javascript:void(0)" @click="taggleNode(thirdItem)") {{thirdItem.section_name}}
                        a.iconfont-node.icon-add-node.node-icon-margin-left(v-if="!thirdItem.valid" href="javascript:void(0)" @click="addFourthLi(thirdItem)")
                        a.iconfont-node.icon-delete.node-btn(v-if="!thirdItem.valid" href="javascript:void(0)" @click="deleteThird(thirdItem, thirdIndex, secItem.children)")
                        a.iconfont-node.icon-edit.node-btn(v-if="!thirdItem.valid" href="javascript:void(0)" @click="editThird(thirdItem)")
                        //- fourthNode
                        ul.fourth-ul(v-if="thirdItem.children && thirdItem.children.length" :class="[thirdItem.hidden ? hiddenClass : showClass]")
                            li.fourth-li(v-for="(fourthItem, fourthIndex) in thirdItem.children")
                                input.control-form(v-if="fourthItem.valid" v-model="fourthItem.unit_name" @blur="fourthBlur(fourthItem, thirdItem)")
                                label.fourth-a.iconfont-node.icon-add-node(v-else) {{fourthItem.unit_name}}
                                a.iconfont-node.icon-delete.node-btn(v-if="!fourthItem.valid" href="javascript:void(0)" @click="deleteFourth(fourthItem, fourthIndex, thirdItem.children)")
                                a.iconfont-node.icon-edit.node-btn(v-if="!fourthItem.valid" href="javascript:void(0)" @click="editFourth(fourthItem)")
</template>
<script>
import courseService from '@/service/course.service'
export default {
  props: ['course_id', 'primaryName', 'nodeDataList'],
  data () {
      return {
        //   nodeDataList.children: [],
          secondaryItem: {
              chapter_name: '',
              valid: true
          },
          thirdaryItem: {
              section_name: '',
              valid: true
          },
          fourthItem: {
              unit_name: '',
              valid: true
          },
          validPointer: true,
          hiddenClass: 'hidden',
          showClass: 'show'
      }
  },
  computed: {
      commonPayload () {
          return {
              course_id: this.course_id,
              depict: 'add',
              is_leaf_node: true,
              picture_url: 'none'
          }
      }
  },
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
          let secondaryItem = Object.assign({}, this.secondaryItem, {thirdaryList: []})
          if (!this.nodeDataList.children) {
            this.nodeDataList.children = []
          }
          this.nodeDataList.children.push(Object.assign({}, secondaryItem))
        //   this.nodeDataList.children[this.nodeDataList.children.length - 1].thirdaryList = []
          this.validPointer = false
      },
      secondaryBlur (item) {
          if (!item.chapter_name) {
            return
          }
          let self = this
          if (!item.chapter_id) {
            let payload = Object.assign({}, this.commonPayload, {chapter_name: item.chapter_name})
            courseService.addChapters(payload).then(
                (res) => {
                    self.validPointer = true
                    item.valid = false
                    item.chapter_id = res.chapter_id
                    item.part_id_list = res.part_id_list
                }
            )
          } else {
            let payload = Object.assign({}, this.commonPayload, {chapter_name: item.chapter_name, part_id_list: item.part_id_list})
            courseService.updateChapters(item.chapter_id, payload).then(
               (res) => {
                   self.validPointer = true
                   item.valid = false
                   console.log(res)
                } 
            )
          }      
      },

      deleteSecondary (item, index, array) {
          courseService.deleteChapters(item.chapter_id).then(
              (res) => {
                  array.splice(index, 1)
                  console.log('chapter deleted')
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
        courseService.deleteSections(item.section_id).then(
            (res) => {
                array.splice(index, 1)
                console.log('section deleted')
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
        if (!item.section_name) {
            return
        }
        let self = this
        if (!item.section_id) {
            let payload = Object.assign({}, this.commonPayload, {section_name: item.section_name, chapter_id: chapter.chapter_id})
            courseService.addSections(payload).then(
                (res) => {
                    self.validPointer = true
                    // item.valid = false
                    self.$set(item, 'valid', false)
                    item.section_id = res.section_id
                    item.chapter_id = res.chapter_id
                    item.part_id_list = res.part_id_list
                }
            )
        } else {
            let payload = Object.assign({}, this.commonPayload,
            {
                section_name: item.section_name,
                part_id_list: item.part_id_list,
                chapter_id: item.chapter_id
            })
            courseService.updateSections(item.section_id, payload).then(
                (res) => {
                    self.validPointer = true
                    item.valid = false
                    console.log(res)
                }
            )
        }
      },

      addFourthLi (item) {
        if (!this.validPointer) {
            return
        }
        if (!item.children) {
            // item.children = []
            this.$set(item, 'children', [])
        }
        item.children.push(Object.assign({}, this.fourthItem))
        this.validPointer = false
      },

      fourthBlur (item, unit) {
        if (!item.unit_name) {
            return
        }
        let self = this
        if (!item.unit_id) {
            let payload = Object.assign({}, this.commonPayload, {unit_name: item.unit_name, chapter_id: unit.chapter_id, section_id: unit.section_id})
            courseService.addUnits(payload).then(
                (res) => {
                    self.validPointer = true
                    // item.valid = false
                    self.$set(item, 'valid', false)
                    item.unit_id = res.unit_id
                    item.section_id = res.section_id
                    // item.chapter_id = res.chapter_id
                    item.part_id_list = res.part_id_list
                    item.unit_type = res.unit_type
                }
            )
        } else {
            let payload = Object.assign({}, this.commonPayload, {
                unit_name: item.unit_name,
                section_id: item.section_id,
                unit_type: item.unit_type,
                part_id_list: item.part_id_list
            })
            courseService.updateUnits(item.unit_id, payload).then(
                (res) => {
                    self.validPointer = true
                    item.valid = false
                    console.log(res)
                }
            )
        }
      },

      deleteFourth (item, index, array) {
        courseService.deleteUnits(item.unit_id).then(
            (res) => {
                array.splice(index, 1)
                console.log('section deleted')
            }
        )
      },

      editFourth (item) {
        if (item.valid === undefined) {
            this.$set(item, 'valid', true)
        } else {
            item.valid = true
        }
      }
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
