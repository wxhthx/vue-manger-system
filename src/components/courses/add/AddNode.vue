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
                a.iconfont-node.icon-delete.node-btn(v-if="secItem.valid && !secItem.chapter_id" href="javascript:void(0)" @click="backup(nodeDataList.children)")
                a.secondary-a(v-if="!secItem.valid" href="javascript:void(0)" @click="taggleNode(secItem, 'chapter')" :class="[activedInfo.activedType === 'chapter' && activedInfo.activedId === secItem.chapter_id ? 'active' : '']") {{secItem.chapter_name}}
                a.iconfont-node.icon-add-node.node-icon-margin-left(v-if="!secItem.valid" href="javascript:void(0)" @click="addThirdaryLi(secItem)")
                a.iconfont-node.icon-delete.node-btn(v-if="!secItem.valid" href="javascript:void(0)" @click="deleteSecondary(secItem, secIndex, nodeDataList.children)")
                a.iconfont-node.icon-edit.node-btn(v-if="!secItem.valid" href="javascript:void(0)" @click="editSecondary(secItem)")
                //- //- thirdNode
                ul.thirdary-ul(v-if="secItem.children && secItem.children.length" :class="[secItem.hidden ? hiddenClass : showClass]")
                    li.thirdary-li(v-for="(thirdItem, thirdIndex) in secItem.children")
                        input.control-form(v-if="thirdItem.valid" v-model="thirdItem.section_name" :placeholder="thirdItem.placeholder" @blur="thirdBlur(thirdItem, secItem)")
                        a.iconfont-node.icon-delete.node-btn(v-if="thirdItem.valid && !thirdItem.section_id" href="javascript:void(0)" @click="backup(secItem.children)")
                        a.third-a(v-if="!thirdItem.valid" href="javascript:void(0)" @click="taggleNode(thirdItem, 'section')" :class="[activedInfo.activedType === 'section' && activedInfo.activedId === thirdItem.section_id ? 'active' : '']") {{thirdItem.section_name}}
                        a.iconfont-node.icon-add-node.node-icon-margin-left(v-if="!thirdItem.valid" href="javascript:void(0)" @click="addFourthLi(thirdItem)")
                        a.iconfont-node.icon-delete.node-btn(v-if="!thirdItem.valid" href="javascript:void(0)" @click="deleteThird(thirdItem, thirdIndex, secItem.children)")
                        a.iconfont-node.icon-edit.node-btn(v-if="!thirdItem.valid" href="javascript:void(0)" @click="editThird(thirdItem)")
                        //- fourthNode
                        ul.fourth-ul(v-if="thirdItem.children && thirdItem.children.length" :class="[thirdItem.hidden ? hiddenClass : showClass]")
                            li.fourth-li(v-for="(fourthItem, fourthIndex) in thirdItem.children")
                                input.control-form(v-if="fourthItem.valid" v-model="fourthItem.unit_name" :placeholder="fourthItem.placeholder" @blur="fourthBlur(fourthItem, thirdItem)")
                                a.iconfont-node.icon-delete.node-btn(v-if="fourthItem.valid && !thirdItem.unit_id" href="javascript:void(0)" @click="backup(thirdItem.children)")
                                label.fourth-a(v-if="!fourthItem.valid" @click="activedLabel(fourthItem)" :class="[activedInfo.activedType === 'unit' && activedInfo.activedId === fourthItem.unit_id ? 'active' : '']") {{fourthItem.unit_name}}
                                a.iconfont-node.icon-delete.node-btn(v-if="!fourthItem.valid" href="javascript:void(0)" @click="deleteFourth(fourthItem, fourthIndex, thirdItem.children)")
                                a.iconfont-node.icon-edit.node-btn(v-if="!fourthItem.valid" href="javascript:void(0)" @click="editFourth(fourthItem)")
</template>
<script>
import courseService from '@/service/course.service'
import loadingMixin from '@/config/mixins/loading.mixin'
import { mapActions, mapGetters } from 'vuex'
export default {
  props: ['course_id', 'primaryName', 'nodeDataList'],
  data () {
      return {
        //   nodeDataList.children: [],
          secondaryItem: {
              chapter_name: '',
              valid: true,
              placeholder: '请输入chapter内容'
          },
          thirdaryItem: {
              section_name: '',
              valid: true,
              placeholder: '请输入section内容'
          },
          fourthItem: {
              unit_name: '',
              valid: true,
              placeholder: '请输入unit内容'
          },
          validPointer: true,
          hiddenClass: 'hidden',
          showClass: 'show'
      }
  },
  mixins: [
      loadingMixin
  ],
  computed: {
      commonPayload () {
          return {
              course_id: this.course_id,
              depict: 'add',
              is_leaf_node: true,
              picture_url: 'none'
          }
      },
      ...mapGetters({
          activedInfo: 'courseNodeActived'
      })
  },
  methods: {
      taggleNode (node, typeName) {
        if (node.hidden === undefined) {
            this.$set(node, 'hidden', true)
        } else {
            node.hidden = !node.hidden
        }
        if (typeName === this.activedInfo.activedType && node[typeName + '_id'] === this.activedInfo.activedId) {
            return
        }
        this.updateActived({
            activedType: typeName,
            activedId: node[typeName + '_id'],
            activedChapterId: node.chapter_id ? node.chapter_id : 0,
            activedSectionId: node.section_id ? node.section_id : 0,
            activedUnitId: node.unit_id ? node.unit_id : 0,
            activedName: node[typeName + '_name']
        })
      },
      activedLabel (node) {
        if (this.activedInfo.activedType === 'unit' && node['unit_id'] === this.activedInfo.activedId) {
            return
        }
        this.updateActived({
            activedType: 'unit',
            activedChapterId: 0,
            activedId: node.unit_id,
            activedSectionId: node.section_id,
            activedUnitId: node.unit_id,
            activedName: node.unit_name
        })
      },
      ...mapActions({
          updateActived: 'updateCourseNodeActived'
      }),
      addSecondaryLi () {
          if (!this.validPointer) {
              return
          }
          let secondaryItem = Object.assign({}, this.secondaryItem, {children: []})
          if (!this.nodeDataList.children) {
            this.nodeDataList.children = []
          }
          this.nodeDataList.children.push(Object.assign({}, secondaryItem))
        //   this.nodeDataList.children[this.nodeDataList.children.length - 1].thirdaryList = []
          this.validPointer = false
      },
      backup (arrayArgu) {
          arrayArgu.pop()
          this.validPointer = true
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
                    self.hiddenLoading()
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
                   self.hiddenLoading()
                   self.validPointer = true
                   item.valid = false
                   console.log(res)
                } 
            )
          }      
      },
      modalComfirm (item, index, array, func, message) {
        this.$modal({
            header: '提示',
            message,
            footer: [
                {type: 'ok', text: '确认', method: func, argu: [item, index, array]},
                {type: 'cancel', text: '取消'}
            ]
        })
      },

      deleteSecondary (item, index, array) {
          this.modalComfirm(item, index, array, this.realDeleteSecondary, '是否要删除目前课程当前章内容?')
      },

      realDeleteSecondary (item) {
          let self = this
          self.$modal({
              visible: false
          })
          courseService.deleteChapters(item[0].chapter_id).then(
              (res) => {
                  self.hiddenLoading()
                  item[2].splice(item[1], 1)
                  this.$toast('删除目前课程当前章内容成功')
              }, () => {
                  self.hiddenLoading()
                  this.$toast({
                      message: '删除目前课程当前章内容失败',
                      theme: 'error'
                  })
              }
          )
      },

      editSecondary (item) {
        if (!this.validPointer) {
            return
        }
        if (item.valid === undefined) {
            this.$set(item, 'valid', true)
        } else {
            item.valid = true
        }
        this.validPointer = false
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
        this.modalComfirm(item, index, array, this.realDeleteThird, '是否要删除目前课程当前节内容?')
      },

      realDeleteThird (item) {
        let self = this
        self.$modal({
            visible: false
        })
        courseService.deleteSections(item[0].section_id).then(
            (res) => {
                self.hiddenLoading()
                item[2].splice(item[1], 1)
                self.$toast('删除目前课程当前节内容成功')
            }, () => {
                self.hiddenLoading()
                this.$toast({
                    message: '删除目前课程当前节内容失败',
                    theme: 'error'
                })
            }
        )
      },

      editThird (item) {
        if (!this.validPointer) {
            return
        }
        if (item.valid === undefined) {
            this.$set(item, 'valid', true)
        } else {
            item.valid = true
        }
        this.validPointer = false
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
                    self.hiddenLoading()
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
                    self.hiddenLoading()
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
                    self.hiddenLoading()
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
                    self.hiddenLoading()
                    self.validPointer = true
                    item.valid = false
                    console.log(res)
                }
            )
        }
      },

      deleteFourth (item, index, array) {
        this.modalComfirm(item, index, array, this.realDeleteFourth, '是否要删除目前课程当前单元内容?')
      },

      realDeleteFourth (item) {
        let self = this
        self.$modal({
            visible: false
        })
        courseService.deleteUnits(item[0].unit_id).then(
            (res) => {
                self.hiddenLoading()
                item[2].splice(item[1], 1)
                self.$toast('删除目前课程当前单元内容成功')
            }, () => {
                self.hiddenLoading()
                self.$toast({
                    message: '删除目前课程当前单元内容失败',
                    theme: 'error'
                })
            }
        )
      },

      editFourth (item) {
        if (!this.validPointer) {
            return
        }
        if (item.valid === undefined) {
            this.$set(item, 'valid', true)
        } else {
            item.valid = true
        }
        this.validPointer = false
      }
  }
}
</script>
<style lang="scss" scoped>
$actived_color: #F17C67;
.primary-ul {
    text-align: left;
    transition: 0.3s;
    & > .primary-li {
        cursor: pointer;
        & > .primary-a {
            font-size: 18px;
            &:before {
                font-family: "iconfont-admin" !important;
                font-size:18px;
                content: '\e637';
                margin-right: 5px;
            }
        }
    }
}
.secondary-ul, .thirdary-ul, .fourth-ul{
    margin-left: 15px;
}
.secondary-a {
    font-size: 16px;
    &:before {
        font-family: "iconfont-admin" !important;
        font-size:16px;
        content: '\e605';
        margin-right: 5px;
    }
}
.third-a {
    font-size: 14px;
    &:before {
        font-family: "iconfont-admin" !important;
        font-size:14px;
        content: '\e6fc';
        margin-right: 5px;
    }
}
.fourth-a {
    font-size: 12px;
    &:before {
        font-family: "iconfont-admin" !important;
        font-size:12px;
        content: '\e602';
        margin-right: 5px;
    }
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
a:active, a.active {
    color: $actived_color;
}
label.active {
    color: $actived_color;
}
</style>
