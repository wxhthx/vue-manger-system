<template lang="pug">
  div.Upload-container.dropzone(:id="generatedId")
</template>
<script>
import courseService from '@/service/course.service'
import Dropzone from '@/assets/lib/dropzone'
import { mapGetters, mapActions } from 'vuex'
export default {
  props: ['acceptedFiles'],
  data () {
    return {
        idProperty: '',
        now: '',
        fileName: '',
        host: ''
    }
  },
  methods: {
      ...mapActions([
          'updateUploadData',
          'hiddenLoading'
      ]),
      set_upload_param (myDropzone, filename) {
        let self = this
        self.now = Date.parse(new Date()) / 1000
        // if (self.uploadData.expire < self.now + 3) {
            courseService.getOssSign().then((res) => {
                let uploadData = {}
                uploadData.host = res['host']
                self.host = res['host']
                uploadData.policyBase64 = res['policy']
                uploadData.accessid = res['accessid']
                uploadData.signature = res['signature']
                uploadData.expire = parseInt(res['expire'])
                uploadData.callbackbody = res['callback'] 
                uploadData.key = res['dir']
                self.updateUploadData(uploadData)
                self.upStart(myDropzone, filename)
                // self.$emit('getImageUrl', uploadData.host + '/' + self.fileName)
            })
            // return
        // }
        // self.upStart(myDropzone, filename)
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
  created () {
    this.idProperty = this.random_string(6)
  },
  mounted () {
    var vm = this
    // vm.idProperty = vm.random_string()
    Dropzone.autoDiscover = false
    let preloader = new Dropzone("#" + vm.generatedId, {
        url: "/file/post",
        autoProcessQueue: false,
        acceptedFiles: vm.acceptedFiles,
        init: function () {
            let myDropzone = this
            let files = myDropzone.files 
            this.on('addedfile', function () {
                vm.set_upload_param(myDropzone, files[files.length - 1].name)
            })
            this.on('complete', function () {
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
