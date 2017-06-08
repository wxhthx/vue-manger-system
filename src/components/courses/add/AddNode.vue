<template lang="pug">
<!-- root node-->
  //- primaryMenu
  ul.primary-ul
    li.primary-li
        a.primary-a.iconfont-node.icon-add-node.node-icon-margin-right(href="javascript:void(0)" @click="addSecondaryLi") {{primaryName}}
        //- secondNode
        ul.secondary-ul(v-if="secondaryList.length")
            li.secondary-li(v-for="(secItem, secIndex) in secondaryList")
                input.control-form(v-if="secItem.valid" v-model="secItem.value" :placeholder="secItem.placeholder" @blur="secondaryBlur(secItem)")
                a.secondary-a.iconfont-node.icon-add-node(v-else href="javascript:void(0)" @click="addThirdaryLi(secItem)") {{secItem.value}}
                a.iconfont-node.icon-delete.node-btn(v-if="!secItem.valid" @click="deleteSecondary(secItem, secIndex, secondaryList)")
                a.iconfont-node.icon-edit.node-btn(v-if="!secItem.valid" @click="editSecondary(secItem)")
                //- thirdNode
                ul.thirdary-ul(v-if="secItem.thirdaryList.length")
                    li.thirdary-li(v-for="(thirdItem, thirdIndex) in secItem.thirdaryList")
                        input.control-form(v-if="thirdItem.valid" v-model="thirdItem.value" :placeholder="thirdItem.placeholder" @blur="thirdBlur(thirdItem, secItem)")
                        a.third-a.iconfont-node.icon-add-node(v-else href="javascript:void(0)" @click="addFourthLi(thirdItem)") {{thirdItem.value}}
                        a.iconfont-node.icon-delete.node-btn(v-if="!thirdItem.valid" @click="deleteThird(thirdItem, thirdIndex, secItem.thirdaryList)")
                        a.iconfont-node.icon-edit.node-btn(v-if="!thirdItem.valid" @click="editThird(thirdItem)")
                        //- fourthNode
                        ul.fourth-ul(v-if="thirdItem.fourthList.length")
                            li.fourth-li(v-for="(fourthItem, fourthIndex) in thirdItem.fourthList")
                                input.control-form(v-if="fourthItem.valid" v-model="fourthItem.value" :placeholder="fourthItem.placeholder" @blur="fourthBlur(fourthItem, thirdItem)")
                                label.fourth-a.iconfont-node.icon-add-node(v-else) {{fourthItem.value}}
                                a.iconfont-node.icon-delete.node-btn(v-if="!fourthItem.valid" @click="deleteFourth(fourthItem, fourthIndex, thirdItem.fourthList)")
                                a.iconfont-node.icon-edit.node-btn(v-if="!fourthItem.valid" @click="editFourth(fourthItem)")
</template>
<script>
import courseService from '@/service/course.service'
export default {
  props: ['course_id', 'primaryName'],
  data () {
      return {
          secondaryList: [],
          secondaryItem: {
              value: '',
              valid: true,
              placeholder: '请填入二级目录相关信息'
          },
          thirdaryItem: {
              value: '',
              valid: true,
              placeholder: '请填入三级目录相关信息'
          },
          fourthItem: {
              value: '',
              valid: true,
              placeholder: '请填入四级目录相关信息'
          },
          validPointer: true
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
      addSecondaryLi () {
          if (!this.validPointer) {
              return
          }
          let secondaryItem = Object.assign({}, this.secondaryItem, {thirdaryList: []})
          this.secondaryList.push(Object.assign({}, secondaryItem))
        //   this.secondaryList[this.secondaryList.length - 1].thirdaryList = []
          this.validPointer = false
      },
      secondaryBlur (item) {
          if (!item.value) {
            return
          }
          let self = this
          if (!item.chapter_id) {
            let payload = Object.assign({}, this.commonPayload, {chapter_name: item.value})
            courseService.addChapters(payload).then(
                (res) => {
                    self.validPointer = true
                    item.valid = false
                    item.chapter_id = res.chapter_id
                    item.part_id_list = res.part_id_list
                }
            )
          } else {
            let payload = Object.assign({}, this.commonPayload, {chapter_name: item.value, part_id_list: item.part_id_list})
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
          item.valid = !item.valid
      },

      addThirdaryLi (item) {
          if (!this.validPointer) {
              return
          }
          let thirdaryItem = Object.assign({}, this.thirdaryItem, {fourthList: []})
          item.thirdaryList.push(Object.assign({}, thirdaryItem))
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
        item.valid = !item.valid
      },

      thirdBlur (item, chapter) {
        if (!item.value) {
            return
        }
        let self = this
        if (!item.section_id) {
            let payload = Object.assign({}, this.commonPayload, {section_name: item.value, chapter_id: chapter.chapter_id})
            courseService.addSections(payload).then(
                (res) => {
                    self.validPointer = true
                    item.valid = false
                    item.section_id = res.section_id
                    item.chapter_id = res.chapter_id
                    item.part_id_list = res.part_id_list
                }
            )
        } else {
            let payload = Object.assign({}, this.commonPayload,
            {
                chapter_name: item.value,
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
        item.fourthList.push(Object.assign({}, this.fourthItem))
        this.validPointer = false
      },

      fourthBlur (item, unit) {
        if (!item.value) {
            return
        }
        let self = this
        if (!item.unit_id) {
            let payload = Object.assign({}, this.commonPayload, {unit_name: item.value, chapter_id: unit.chapter_id, section_id: unit.section_id})
            courseService.addUnits(payload).then(
                (res) => {
                    self.validPointer = true
                    item.valid = false
                    item.unit_id = res.unit_id
                    item.section_id = res.section_id
                    // item.chapter_id = res.chapter_id
                    item.part_id_list = res.part_id_list
                    item.unit_type = res.unit_type
                }
            )
        } else {
            let payload = Object.assign({}, this.commonPayload, {
                unit_name: item.value,
                section_id: unit.section_id,
                unit_type: unit.unit_type,
                part_id_list: unit.part_id_list
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
        item.valid = !item.valid
      }
  }
}
</script>
<style lang="scss" scoped>
.primary-ul {
    text-align: left;
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
.node-icon-margin-right {
    margin-right: 8px;
}
</style>
