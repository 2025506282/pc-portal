<template>
  <div class="package-box">
    <div class="package-header">
      支付详情
    </div>
    <div class="wait-box">
      <div class="loading-box">
        <line-spin-fade-loader color="#00aaff" size="12px"></line-spin-fade-loader>
        <p>正在获取充值结果...</p>
        <p><span>{{time}}</span>s</p>
      </div>

    </div>
  </div>
</template>

<script>
  import $ from 'jQuery'

  export default {
    name: "record",
    created: function () {
      let that = this;
      let id = this.$route.query.out_trade_no;
      var timer = setInterval(function(){
        if(that.time===1){
          clearInterval(timer);
          that.$router.push({
            path: '/pay-status',
            query: {
              "out_trade_no":id
            }
          });
        } else {
          that.time--;
        }
      },1000)
    },

    data: function () {
      return {
        packageId: '',
        placeId: '',
        packageNum: '',
        mobile: '',
        mac: '',
        package: {},
        userInfo: {},
        isSuccess: true,
        deviceId: '',
        item: {},
        form: {},
        time: 3,
        index: -1,
        timeLogoClass: 'iconfont icon-shijian',
        liuliangLogoClass: 'iconfont icon-chongliuliang',
      }
    },
    methods: {
      chooseIndex: function(index){
        for(let i=0;i<this.list.length;i++){
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
          path: '/service',
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

  .loading-box {
    display: inline-block;
    margin: 175px auto 0;
  }
  .loading-box p {
    margin-top: 20px;
  }
  .loading-box p span {
    color: #00aaff;
  }
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
    color: #444;
    font-size: 12px;
    background-color: #f8f8f8;
  }

  .wait-box {
    width: 100%;
    height: 566px;
    background-color: #f8f8f8;
    text-align: center;
  }


</style>
