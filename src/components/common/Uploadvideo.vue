<template lang="pug">
  div.Upload-container.dropzone(@drop.prevent="filechange")
    label.uploader-label(for="uploader") {{tip}}
    input.form-control#uploader(type="file" accept="video/*" @change="filechange")
    div.message
        div.progress(v-if="percent" :style="{width: percent + '%'}")
            span.error {{percent}}
</template>
<script>
import courseService from '@/service/course.service'
import { mapGetters, mapActions } from 'vuex'
export default {
//   props: ['video_id'],
  data () {
    return {
        tip: '请点击选择或者把视频文件拖拽到此处',
        uploader: null,
        video_id: '',
        uploadedSize: '',
        percent: 0
    }
  },
  methods: {
      filechange (e) {
        let files = e.target.files && e.target.files.length ? e.target.files : e.dataTransfer.files
        if (!files.length) {
            return
        }
        this.initUploader(files)
      },
      emptyFile () {
          this.tip = '请点击选择或者把视频文件拖拽到此处'
          this.percent = 0
      },
      initUploader (files) {
        let self = this
        self.tip = files[files.length - 1].name
        this.get_oss_sign(files[files.length - 1].name, files[files.length - 1].size).then(
            (res) => {
                this.video_id = res.video_id
                let uploader = new window.VODUpload({
                    // 开始上传
                    'onUploadstarted': function (uploadInfo) {
                    //   log("onUploadStarted:" + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object)
                        uploader.setUploadAuthAndAddress(uploadInfo, res.upload_auth, res.upload_address)
                    },
                    // 文件上传成功
                    'onUploadSucceed': function (uploadInfo) {
                        self.hiddenLoading()
                        self.emptyFile()
                        self.$emit('getVideoId', self.video_id)
                        console.log("onUploadSucceed: " + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object)
                    },
                    // 文件上传失败
                    'onUploadFailed': function (uploadInfo, code, message) {
                        console.log("onUploadFailed: file:" + uploadInfo.file.name + ",code:" + code + ", message:" + message)
                    },
                    // 文件上传进度，单位：字节
                    'onUploadProgress': function (uploadInfo, totalSize, uploadedSize) {
                        self.uploadedSize = uploadedSize
                        self.percent = Math.ceil(uploadedSize * 100 / totalSize)
                        // console.log("onUploadProgress:file:" + uploadInfo.file.name + ", fileSize:" + totalSize + ", percent:" + self.percent + "%")
                    },
                    // 上传凭证超时
                    'onUploadTokenExpired': function () {
                        console.log("onUploadTokenExpired")
                        self.getUpdateVideoSign(files[files.length - 1].name).then(
                            (res) => {
                                self.video_id = res.video_id
                                self.uploader.resumeUploadWithAuth(res.upload_auth)
                            }
                        )
                    }
                })
                this.uploader = uploader
                let userData = '{"Vod":{"UserData":"{"IsShowWaterMark":"false","Priority":"7"}"}}'
                this.uploader.addFile(files[files.length - 1], null, null, null, userData)
                this.uploader.startUpload()
            }
        )
      },
      ...mapActions([
          'hiddenLoading'
      ]),
      get_oss_sign (filename, fileSize) {
        return courseService.getVideoOssSign({file_name: filename, file_size: fileSize})
      },
      getUpdateVideoSign (filename) {
          return courseService.getUpdateVideoOssSign(this.video_id)
      },
      random_string (len) {
        len = len || 32
        let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'   
        let maxPos = chars.length
        let pwd = ''
        for (let i = 0; i < len; i++) {
            pwd += chars.charAt(Math.floor(Math.random() * maxPos))
        }
        return pwd
    },
    uploadFile () {}
  },
  created () {
    this.idProperty = this.random_string(6)
  },
  mounted () {
  },
  computed: {
      ...mapGetters({
         uploadData: 'uploadData'
      }),
      generatedId () {
          return 'image' + this.idProperty
      }
  }
}
</script>
<style lang="scss" scoped>
.message {
    width: 100%;
    margin: 15px 0;
    & > .progress {
        width: 100%;
        height: 25px;
        border-radius: 5px;
        background: green;
        transition: width 0.3s linear;
    }
}
.dropzone {
    padding: 0;
    & > .uploader-label {
        width: 100%;
        height: 100%;
        padding: 20px;
        cursor: pointer;
    }
}
#uploader {
    position: absolute;
    left: -9999px;
}
</style>
