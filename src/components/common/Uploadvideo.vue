<template lang="pug">
  div.Upload-container.dropzone(ref="box")
    label.uploader-label(for="videoUploader") {{tip}}
    input.form-control#videoUploader(type="file" accept="video/*" @change="filechange")
    div.message
        div.progress(v-if="percent" :style="{width: percent + '%'}")
            //- span.error {{percent}}
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
        percent: 0,
        err: ''
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
      preventDefaultEvent (eventName) {
        document.addEventListener(eventName, function (e) {
            e.preventDefault()
        }, false)
      },
      addDropSupport () {
          let Box = this.$refs.box
          Box.addEventListener('drop', (e) => {
              this.err = ''
              let filelist = e.dataTransfer.files
              if (!filelist.length) {
                  return
              }
              // 格式限制
            if (filelist[0].type.indexOf('video') === -1) {
                this.errText = '请选择视频文件'
                return false
            }
            this.initUploader(filelist)
          })
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
                        // self.emptyFile()
                        uploader.setUploadAuthAndAddress(uploadInfo, res.upload_auth, res.upload_address)
                    },
                    // 文件上传成功
                    'onUploadSucceed': function (uploadInfo) {
                        self.hiddenLoading()
                        self.tip += '  已经完成上传'
                        self.percent = 0
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
      ['dragleave', 'drop', 'dragenter', 'dragover'].forEach(e => {
          this.preventDefaultEvent(e)
    })
    this.addDropSupport()
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
    min-height: 80px;
    margin: 15px 0;
    & > .progress {
        width: 100%;
        height: 25px;
        border-radius: 5px;
        position: relative;
        top: 50px;
        background: #ff9966;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #ff5e62, #ff9966);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #ff5e62, #ff9966); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        transition: width 0.3s linear;
    }
}
.dropzone {
    padding: 0;
    & > .uploader-label {
        position: absolute;
        top: 0;left: 0;right: 0;bottom: 0;
        z-index: 10;
        line-height: 100px;
    }
}
#videoUploader {
    position: absolute;
    left: -9999px;
}
</style>
