<template lang="pug">
  div.width_flud
    form(@submit.prevent="validateBeforeSubmit")
        div.row
            div.col   
                div.form-group.row
                    label.col-sm-3.col-form-label(for="name") 姓名
                    div.col-sm-9
                        input.form-control(type="text" v-model="payload.name")
                div.form-group.row
                    label.col-sm-3.col-form-label(for="category") 类型
                    div.col-sm-9
                        select.form-control(type="text" v-model="payload.category_id")
                            option(v-for="(cateItem, cateIndex) in categories" :value="cateItem.category_id") {{cateItem.category_name}}
            div.col
                div.form-group.row.height_flud
                    label.col-sm-3.col-form-label(for="img") 封面
                    div.col-sm-9.img-uploader#imageContainer
                        div.img-select#image
                        button.btn.btn-primary#upload-btn upload
                        div#console
                        //- input.form-control.hidden-uploader(type="file" aria-describedby="fileHelp" @change="uploadImg")
            div.w-100
            div.col
                div.form-group.row
                    label.col-sm-3.col-form-label(for="category") 讲师
                    div.col-sm-9
                        select.form-control(type="text" v-model="payload.category_id")
                            option(v-for="(cateItem, cateIndex) in categories" :value="cateItem.category_id") {{cateItem.category_name}}
                div.form-group.row
                    label.col-sm-3.col-form-label(for="category") 上架时间
                    div.col-sm-9
                        input.form-control(type="datetime-local" v-model="payload.sn")
                div.form-group.row
                    label.col-sm-3.col-form-label 状态
                    div.col-sm-9
                        input.form-control(type="text")
            div.col
                div.form-group.row
                    label.col-sm-3.col-form-label(for="img") 课程简介
                    div.col-sm-9
                        textarea.form-control(v-model="payload.depict")
        div.row
            div.col.chapter-manager
            div.col.test-uploader
        div.row.no-gutters
            label.col-sm-3.col-form-label(for="img") 评分方式： 课程签到
            div.col-sm-1
                input.form-control
            label.col-sm-3.col-form-label(for="img") 课程习题
            div.col-sm-1
                input.form-control
            label.col-sm-3.col-form-label(for="img") 课程考核
            div.col-sm-1
                input.form-control
        div.btn-group.row.margin-top
            button.btn.btn-primary(@click="save") 保存
            button.btn.btn-primary(@click="exit") 取消
            button.btn.btn-primary(@click="soldInOrOut") 上架/下架
</template>
<script>
import courseService from '@/service/course.service'
import plupload from 'plupload'

export default {
  data () {
    return {
        payload: {
            name: '',
            category_id: '',
            depict: '',
            tutor_id: '',
            picture_url: '',
            sn: ''
        },
        categories: [],
        image: '',
        now: null,
        expire: 0,
        timestamp: null,
        host: '',
        policyBase64: '',
        accessid: '',
        signature: '',
        callbackbody: '',
        key: '',
        g_object_name_type: '',
        g_object_name: ''
    }
  },
  methods: {
      validateBeforeSubmit () {

      },
      save () {

      },
      exit () {

      },
      soldInOrOut () {

      },
      uploadImg (e) {
        let files = e.target.files || e.dataTransfre.files
        if (!files.length) {
            return
        }
        this.createImage(files[0])
      },
      createImage (file) {
        let image = new Image()
        let reader = new FileReader()
        var self = this
        reader.onload = (e) => {
            self.image = e.target.result
        }
        reader.readAsDataURL(file)
      },
      set_upload_param (up, filename, ret) {
        let self = this
        self.now = self.timestamp = Date.parse(new Date()) / 1000
        if (self.expire < self.now + 3) {
            courseService.getOssSign().then((res) => {
                self.host = res['host']
                self.policyBase64 = res['policy']
                self.accessid = res['accessid']
                self.signature = res['signature']
                self.expire = parseInt(res['expire'])
                self.callbackbody = res['callback'] 
                self.key = res['dir']
                self.upStart(up, filename)
            })
            return
        }
        self.upStart(up, filename)
      },
      upStart (up, filename) {
        this.g_object_name = this.key
        if (filename != '') {
            let suffix = this.get_suffix(filename)
            this.calculate_object_name(filename)
        }
        let new_multipart_params = {
            'key': this.g_object_name,
            'policy': this.policyBase64,
            'OSSAccessKeyId': this.accessid, 
            'success_action_status': '200', // 让服务端返回200,不然，默认会返回204
            'callback': this.callbackbody,
            'signature': this.signature
        }
        up.setOption({
            'url': this.host,
            'multipart_params': new_multipart_params
        })
        up.start()
      },
      get_signature (up, filename) {
          let self = this
          self.now = self.timestamp = Date.parse(new Date()) / 1000
          if (self.expire < self.now + 3) {
              courseService.getOssSign().then((res) => {
                self.host = res['host']
                self.policyBase64 = res['policy']
                self.accessid = res['accessid']
                self.signature = res['signature']
                self.expire = parseInt(res['expire'])
                self.callbackbody = res['callback'] 
                self.key = res['dir']
                self.upStart(up, filename)
            })
            return true
          }
          return false
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
        if (this.g_object_name_type == 'local_name') {
            this.g_object_name += "{{filename}}"
        } else if (this.g_object_name_type == 'random_name') {
            let suffix = this.get_suffix(filename)
            this.g_object_name = this.key + this.random_string(10) + suffix
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
    var self = this
    self.now = this.timestamp = Date.parse(new Date()) / 1000
    courseService.getCategories().then(
        (res) => {
            this.categories = res.data
            this.payload.category_id = this.categories[0].category_id
        }
    )
  },
  mounted () {
    var vm = this
    var uploader = new plupload.Uploader({
        runtimes: 'html5,flash,silverlight,html4',
        browse_button: 'image',
        container: 'imageContainer',
        flash_swf_url: '../moxie/Moxie.swf',
        silverlight_xap_url: '../moxie/Moxie.xap',
        // url: 'http://cdoss.oss-cn-beijing.aliyuncs.com',
        filters: {
            mime_types: [ // 只允许上传图片和zip,rar文件
                { title: "Image files", extensions: "jpg,gif,png,bmp" }, 
                { title: "Zip files", extensions: "zip,rar" }
            ],
            max_file_size: '10mb', // 最大只能上传10mb的文件
            prevent_duplicates: true // 不允许选取重复文件
        },
        init: {
            PostInit: function () {
                // document.getElementById('ossfile').innerHTML = ''
                document.getElementById('upload-btn').onclick = function () {
                    vm.set_upload_param(uploader, '', false)
                return false
                }
            },

            FilesAdded: function (up, files) {
                // plupload.each(files, function (file) {
                //     document.getElementById('ossfile').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ')<b></b>'
                //     +'<div class="progress"><div class="progress-bar" style="width: 0%"></div></div>'
                //     +'</div>'
                // })
            },

            BeforeUpload: function (up, file) {
                // check_object_radio()
                // set_upload_param(up, file.name, true)
            },

            UploadProgress: function (up, file) {
                // var d = document.getElementById(file.id)
                // d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>"
                // var prog = d.getElementsByTagName('div')[0]
                // var progBar = prog.getElementsByTagName('div')[0]
                // progBar.style.width= 2*file.percent+'px'
                // progBar.setAttribute('aria-valuenow', file.percent)
            },

            FileUploaded: function (up, file, info) {
                // if (info.status == 200)
                // {
                //     document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = 'upload to oss success, object name:' + get_uploaded_object_name(file.name)
                // }
        //  else
                // {
                //     document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response
                // } 
            },

            Error: function (up, err) {
                if (err.code == -600) {
                    document.getElementById('console').appendChild(document.createTextNode("\n选择的文件太大了,可以根据应用情况，在upload.js 设置一下上传的最大大小"))
                } else if (err.code == -601) {
                    document.getElementById('console').appendChild(document.createTextNode("\n选择的文件后缀不对,可以根据应用情况，在upload.js进行设置可允许的上传文件类型"))
                } else if (err.code == -602) {
                    document.getElementById('console').appendChild(document.createTextNode("\n这个文件已经上传过一遍了"))
                } else {
                    document.getElementById('console').appendChild(document.createTextNode("\nError xml:" + err.response))
                }
            }
        }
    })
    uploader.init()
  }
}
</script>
<style lang="scss">

</style>
