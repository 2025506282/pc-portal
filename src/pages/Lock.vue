<template>
  <div class="package-box">
    <div class="package-header">
      风险提示
    </div>
    <div class="item-box">
      <div class="item1">
        <img src="../assets/images/lock.png"/>
        <p>啊哦！您的帐户可能存在风险</p>
      </div>
      <div class="item2">
        <p>锁定将于 <span class="light-color">08:01:52</span> 小时后解除</p>
      </div>
      <div class="item3">
        <p>为保证您的账户安全系统将暂时锁定您的账号</p>
        <p>系统检测到您的帐户在24小时内，在多个不</p>
        <p>同终端上登录，建议修改密码。</p>
      </div>
      <div class="item4">
        <a>
          联系客服
        </a>
        <a class="light-color">
          修改密码
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jQuery'

  export default {
    name: "record",
    created: function () {

    },

    data: function () {
      return {

      }
    },
    methods: {
      chooseIndex: function (index) {
        for (let i = 0; i < this.list.length; i++) {
          this.list[i].iconCheckClass = 'iconfont icon-yuanquanweixuanfuben';
        }
        this.list[index].iconCheckClass = 'iconfont icon-gou';
        this.index = index;
      },
      /***
       * 点击我要上网，让用户知道可以上网
       */
      sufferInternet: function () {
        location.href = 'http://1.0.0.0/logout';
      },
      toUser: function () {
        this.$router.push({
          path: '/user',
          query: {
            "mobile": this.mobile,
            "mac": this.mac
          }
        });
      },
      toUserService: function () {
        this.$router.push({
          path: '/user/service',
          query: {
            "mobile": this.mobile,
            "mac": this.mac
          }
        });
      },
      toPay: function () {
        this.$router.push({
          path: '/pay',
          query: {
            "mobile": this.mobile,
            "mac": this.mac
          }
        });
      }
    }
  }
</script>

<style scoped>
  @import '../assets/icon/iconfont.css';

  .package-header {
    width: 100%;
    height: 57px;
    line-height: 57px;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom: 1px solid #f5f3f3;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    font-size: 16px;
    text-align: center;
  }

  .package-box {
    float: left;
    margin-left: 12px;
    width: 757px;
    border-radius: 5px;
    background-color: #f8f8f8;
  }

  .item-box {
    text-align: center;
    height: 567px;
    box-sizing: border-box;
    padding: 36px;
  }
  .item1 p {
    margin: 13px auto 40px;
    font-size: 16px;
    color: #252c35;
  }
  .item2 p {
    font-size: 16px;
    color: #252c35;
  }
  .item2 span{
    font-size: 22px;
    color: #fa9f1d;
    text-decoration: underline;
  }
  .item3 {
    border: 1px dashed #bfbfbf;
    width: 400px;
    box-sizing: border-box;
    padding: 20px;
    border-radius: 5px;
    margin: 18px auto;
    color: #b5b5b6;
    font-size: 12px;
    line-height: 20px;
  }
  .item3 p:first-child {
    font-size: 14px;
    color: #888888;
  }
  .item4 {
    margin-top: 189px;
  }
  .item4 a {
    padding: 0 18px;
    font-size: 14px;
    cursor: pointer;
  }
  .item4 a:last-child {
    color: #00aaff;
    border-left: 1px solid #bbbbbb;
  }
</style>
