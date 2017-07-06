<template lang="pug">
  div.Upload-container.dropzone(:id="generatedId")
</template>
<script>
import courseService from '@/service/course.service'
import Dropzone from '@/assets/lib/dropzone'
import { mapGetters, mapActions } from 'vuex'
export default {
  props: ['acceptedFiles', 'initImageUrl', 'existInit'],
  data () {
    return {
        idProperty: '',
        now: '',
        fileName: '',
        host: '',
        uploadedFile: null,
        downloadImage: true,
        preloader: {}
    }
  },
  methods: {
      ...mapActions([
          'updateUploadData',
          'hiddenLoading'
      ]),
      resetDropZone () {},
      set_upload_param (myDropzone, filename) {
        let self = this
        self.getOrdinarySign(myDropzone, filename)
      },
      getOrdinarySign (myDropzone, filename) {
          let self = this
          courseService.getOssSign().then((res) => {
            let uploadData = {}
            // uploadData.host = res['host']
            if (process.env.NODE_ENV !== 'development') {
                let hostArr = res['host'].split(':')
                hostArr[0] += 's'
                uploadData.host = hostArr[0] + ':' + hostArr[1]
                self.host = uploadData.host
            } else {
                uploadData.host = res['host']
            }
            this.host = uploadData.host
            uploadData.policyBase64 = res['policy']
            uploadData.accessid = res['accessid']
            uploadData.signature = res['signature']
            uploadData.expire = parseInt(res['expire'])
            uploadData.callbackbody = res['callback'] 
            uploadData.key = res['dir']
            this.updateUploadData(uploadData)
            self.upStart(myDropzone, filename)
        })
      },
      upStart (myDropzone, filename) {
        if (filename != '') {
            this.fileName = this.calculate_object_name(filename)
        }
        let new_multipart_params = {
            'key': this.fileName,
            'policy': this.uploadData.policyBase64,
            'OSSAccessKeyId': this.uploadData.accessid, 
            'success_action_status': '200', // 让服务端返回200,不然，默认会返回204
            'signature': this.uploadData.signature
        }
        myDropzone.options.url = this.uploadData.host
        myDropzone.options.params = new_multipart_params
        myDropzone.processQueue()
      },
      get_suffix (filename) {
        let pos = filename.lastIndexOf('.')
        let suffix = ''
        if (pos != -1) {
            suffix = filename.substring(pos)
        }
        return suffix
      },
      calculate_object_name (filename) {
        if (this.uploadData.g_object_name_type == 'local_name') {
            return "{{filename}}"
        } else if (this.uploadData.g_object_name_type == 'random_name') {
            let suffix = this.get_suffix(filename)
            return this.uploadData.key + this.random_string(10) + suffix
        }
        return ''
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
    callbackbody () {
        console.log('callbackbody')
    }
  },
  watch: {
      initImageUrl: function () {
          if (this.initImageUrl && this.downloadImage && this.existInit) {
            let iamgeUrlArr = this.initImageUrl.split('/')
            let mockFile = { name: iamgeUrlArr[iamgeUrlArr.length - 1], size: 12345, download: true }
            this.preloader.emit("addedfile", mockFile)
            this.preloader.emit('thumbnail', mockFile, this.initImageUrl)
            this.preloader.files.push(mockFile)
            this.preloader.emit('complete', mockFile)
            this.downloadImage = false
          }
      }
  },
  created () {
    this.idProperty = this.random_string(6)
  },
  mounted () {
    var vm = this
    // vm.idProperty = vm.random_string()
    Dropzone.autoDiscover = false
    vm.preloader = new Dropzone("#" + vm.generatedId, {
        url: "/file/post",
        autoProcessQueue: false,
        acceptedFiles: vm.acceptedFiles || 'image/*',
        maxFiles: 1,
        maxFilesize: 1024,
        dictDefaultMessage: '拖拽文件到此上传',
        init: function () {
            let myDropzone = this
            let files = myDropzone.files 
            myDropzone.on('addedfile', function () {
                if (myDropzone.files.length > 1) {
                    myDropzone.removeFile(myDropzone.files[0])
                }
                if (!vm.initImageUrl || !vm.downloadImage) {
                    vm.set_upload_param(myDropzone, files[files.length - 1].name)
                }
            })
            myDropzone.on('maxfilesexceeded', function (file) {
                myDropzone.removeFile(file)
                vm.hiddenLoading()
            })
            
            myDropzone.on('complete', function (file) {
                if (file.download) {
                    return
                }
                vm.downloadImage = false
                vm.uploadedFile = file
                vm.$toast({
                    message: '封面图片上传成功',
                    theme: 'success'
                })
                vm.$emit('getImageUrl', vm.host + '/' + vm.fileName)
                vm.hiddenLoading()
            })
        }
    })
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
<style lang="scss">
</style>
