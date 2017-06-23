<template lang="pug">
  div.width_flud
    div.row.form-group
        div.col-sm-2
            label 名称
        div.col-sm-10
            input.form-control(v-model="resourceName" :placeholder="resourcePlaceholder")
    div.row.form-group
        div.col-sm-2
            label 视频
        div.col-sm-10
            resource-upload(v-on:getVideoId="getVideoId")
</template>
<script>
import Uploadvideo from '@/components/common/Uploadvideo'
import { mapActions, mapGetters } from 'vuex'
import courseService from '@/service/course.service'
import moment from 'moment'
export default {
  props: ['courseId'],
  data () {
      return {
          resourceName: '',
          resourcePlaceholder: '请输入资源名称',
          video_id: ''
      }
  },
  watch: {
      video_id: function () {
          if (this.video_id !== '') {
            this.saveVideoAndRelateCourse(this.video_id)
          }
      }
  },
  methods: {
      ...mapActions([
          'hiddenLoading'
      ]),
      getVideoId (video_id) {
        this.video_id = video_id
      },
      saveVideoAndRelateCourse (video_id) {
        let self = this
        let payload = {
            create_id: 0,
            created: moment().format(),
            resource_id: 0,
            resource_name: self.resourceName,
            resource_summary: self.resourceName,
            resource_type: "video",
            resource_url: "/",
            third_id: video_id,
            update_user_id: 0,
            updated: moment().format()
        }
        courseService.insertVideoResource(payload).then(
            (res) => {
                let data = {
                    chapter_id: self.activedInfo.activedChapterId,
                    course_id: self.courseId,
                    depict: "string",
                    part_name: self.resourceName,
                    part_type: 0,
                    picture_url: "string",
                    resource_id: res.resource_id,
                    section_id: self.activedInfo.activedSectionId,
                    unit_id: self.activedInfo.activedUnitId
                }
                courseService.relateVideoCourse(data).then(
                    (res) => {
                        self.hiddenLoading()
                        self.$toast({
                            message: '视频上传成功',
                            theme: 'success'
                        })
                    }
                )
            }
        )
      }
  },
  computed: {
      ...mapGetters({
          activedInfo: 'courseNodeActived'
      })
  },
  created () {
      this.resourceName = this.activedInfo.activedName
  },
  components: {
      'resource-upload': Uploadvideo
  }
}
</script>

<style lang="scss">

</style>
