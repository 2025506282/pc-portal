<template>
  <div class="package-box">
    <div class="package-header">
      充值状态
    </div>

    <div class="status-box">
      <div v-if="isSuccess" class="status-item">
        <div class="icon-box">
          <i class="iconfont icon-xiaolian1 smile-color"></i>
        </div>
        <p>成功充值</p>
        <div class="nav-box">
          <a @click="toUser">个人中心</a>
          <a @click="sufferInternet">立即上网</a>
        </div>
      </div>
      <div v-else class="status-item">
        <div class="icon-box">
          <i class="iconfont icon-kulian-line danger-color"></i>
        </div>
        <p>充值失败</p>
        <div class="nav-box">
          <a @click="toUserService">联系客服</a>
          <a @click="toPay">再次充值</a>
        </div>
      </div>
    </div>
    <div class="header-title">
      <div>订单信息</div>
    </div>
    <div class="item-box">
      <div class="item">
        <div class="item-section1">
          <i :class="package.package_companyType!==3?timeLogoClass:liuliangLogoClass" class="pay-image"></i>
          <span class="pay-description">{{package.package_name}}</span>
        </div>
        <div class="item-section2">
          <span>购买类型 : </span>
          <span class="light-color">续费 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   </span>
          <span> 流量套餐数量  </span>
          <span class="light-color">{{item.pay_num}}</span>
        </div>
        <div class="item-section3">
          <div class="item-section1-left">
            <span class="pay-time">{{item.order_addTime}}</span>
          </div>
          <div class="item-section1-right">
            <span class="continue-color">合计:￥</span>
            <span class="danger-color">{{item.pay_total_price}}</span>
          </div>
        </div>
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
      $.ajax({
        url: that.CommonConst.BASE_URL + 'demo/pays/result',
        type: 'get',
        data: {
          "order_no": id
        },
        success: function (response) {
          if(response.error==='5005') {
            that.$message('该订单不存在');
            that.isSuccess = false;
            return false;
          }
          that.item = response.data;
          that.package = response.data.package_info;
          that.userInfo = response.data.user_info;
          that.mobile =  that.userInfo.mobile;
          that.mac =  that.userInfo.mac;
          that.isSuccess = response.data.pay_state == 1 ? true : false;
          that.$cookies.set('mobile', that.userInfo.mobile);
          that.$cookies.set('mac', that.userInfo.mac);
        },
        error: function (response) {
          that.isSuccess = false;
        }
      })
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
  .status-box {
    text-align: center;
  }
  .status-item .icon-box {
    margin-top: 40px;
  }
  .status-item .icon-box .iconfont {
    font-size: 60px;
  }
  .status-item p {
    font-size: 18px;
    margin-top: 20px;
    margin-bottom: 15px;
  }
  .status-item .nav-box {
    margin-bottom: 30px;
  }
  .status-item .nav-box a {
    padding: 0 15px;
    font-size: 14px;
    cursor: pointer;
  }
  .status-item .nav-box a:last-child {
    color: #00aaff;
    border-left: 1px solid #444444;
  }
  .package-box {
    color: #444;
    font-size: 12px;
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

  .item-box {
    height: 308px;
    overflow-x: hidden;
  }

  .package-box {
    float: left;
    margin-left: 12px;
    width: 757px;
    border-radius: 5px;
    background-color: #f8f8f8;
  }

  .header-title, .item-box {
    border-top: 1px solid #e9e9e9;
    margin: 0 38px;
    background-color: #f8f8f8;
  }

  .header-title {
    height: 43px;
    line-height: 43px;

  }

  .item-box > .item {
    border: 1px solid #bbbbbb;
    padding: 12px 24px;
    border-radius: 5px;
    font-size: 12px;
  }

  .item-section1 {
    font-size: 14px;
    line-height: 23px;
    height: 23px;
    margin-bottom: 15px;
  }

  .item-section1 .pay-image {
    font-size: 18px;
    vertical-align: -3px;
  }
  .item-section1 .pay-description {
    border-bottom: 1px solid #999999;
    display: inline-block;
  }
  .item-section3 {
    height: 30px;
    line-height: 30px;
  }
  .item-section3 .item-section1-left {
    float: left;
  }
  .item-section3 .item-section1-right {
    float: right;
  }
  .item-section3 .item-section1-right .danger-color {
    font-size: 24px;
  }

</style>
