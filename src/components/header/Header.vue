<template lang="pug">
  div.row.no-gutters.width_flud.plat-header.iconfont-admin
    div.row.col-12.col-sm-6.col-md-8
      h1.plat-logo.inline-block.text-hide logo
      h1.plat-title.inline-block 书院管理运营平台
    div.col-6.col-md-4.d-flex.flex-row-reverse.align-items-stretch
      div.p-2.user-info
        div.admin-info
          div.info-left.inline-block 您好，管理员
          div.info-right.inline-block {{adminName}}
        div.cur-time
          div.info-left.inline-block {{cur_data}}
          div.info-right.inline-block
            button.btn.btn-secondary(@click="exit") 退出
      div.p-2.message.d-flex.flex-column-reverse
        div.message-text 消息
        div.icon-message
</template>
<script>
import moment from 'moment'
export default {
  data () {
    return {
      adminName: '张三',
      cur_data: '',
      timeIntervl: null
    }     
  },
  methods: {
    exit: function () {
      clearInterval(this.timeIntervl)
      this.$router.push('/login')
      console.log('exit')
    },
    getData: function () {
      this.cur_data = moment().format('L')
    }
  },
  created: function () {
    this.cur_data = moment().format('L')
    this.timeIntervl = setInterval(this.getData, 1000)
  }
}
</script>
<style lang="scss" scoped>
.plat-header {
  color: white;
}
.row {
  padding: 0 15px;
}
.plat-logo {
  width: 160px;
  margin: auto 0;
}
.plat-title {
  margin: auto 0;
}
.message {
  font-size: 50px;
  & > .message-text {
    font-size: 16px;
  }
}
.user-info {
  width: 200px;
  & > .admin-info, & > .cur-time {
    width: inherit;
    height: 50%;
  }
  .info-left {
    width: 120px;
    text-align: right;
    padding-right: 20px;
  }
  .info-right {
    width: 80px;
    text-align: left;
  }
}
</style>

