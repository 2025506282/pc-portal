<template>
  <!--公共用户信息头部-->
  <div class="user-header">
    <div class="">
      <div class="header-left">
        <span></span></div>
      <p>个人中心</p>
      <div class="header-right">
        <p v-if="isOnline===1" class="danger-color">网络未连接</p>
        <p v-else-if="isOnline===2" class="continue-color">网络已连接</p>
        <p v-else class="light-color">正在检测中...</p>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jQuery'

  export default {
    created: function () {
      let that = this;
      this.isOnlineType();
      setInterval(function () {
        that.isOnlineType();
      }, 1000);
    },
    name: "user-header",
    data: function () {
      return {
        isOnline: 0
      }
    },
    methods: {
      /**
       * 判断在线用户的类型
       */
      isOnlineType: function () {
        let that = this;
        try {
          $.ajaxSetup({
            error: function (x, e) {
              that.isOnline = 1;
              return false;
            }
          });
          $.getJSON('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=a&cb=?', function () {
            that.isOnline = 2;
          });
        } catch (ex) {
          that.isOnline = 1;
        }
      }
    }
  }
</script>

<style scoped>
  @import '../assets/icon/iconfont.css';

  .user-header {
    width: 100%;
    height: 60px;
    background-color: #252c35;
  }

  .user-header > div {
    margin: 0 auto;
    width: 1024px;
    box-sizing: border-box;
    padding-right: 20px;
    height: 60px;
    position: relative;
    line-height: 60px;
    text-align: center;
    color: #ffffff;
  }

  .header-left {
    position: absolute;
    top: 0;
    left: 5px;
    color: #ffffff;
    font-size: 24px;
  }

  .header-left span {
    cursor: pointer;
  }

  .header-right {
    position: absolute;
    top: 0;
    right: 25px;
    color: #ffffff;
    font-size: 12px;
  }

  .header-right p {
    display: inline-block;
  }
</style>
