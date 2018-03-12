<template>
  <div class="package-box">
    <div class="package-header">
      选择支付
    </div>
    <div class="header-title">
      <div>订单信息</div>
    </div>
    <div class="item-box">
      <div class="item">
        <div class="item-section1">
          <i :class="item.package_companyType!==3?timeLogoClass:liuliangLogoClass" class="pay-image"></i>
          <span class="pay-description">{{item.package_name}}</span>
        </div>
        <div class="item-section2">
          <span>购买类型 : </span>
          <span class="light-color">续费 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   </span>
          <span> 流量套餐数量  </span>
          <span class="light-color">{{item.package_num}}</span>
        </div>
        <div class="item-section3">
          <div class="item-section1-left">
            <span class="pay-time">{{item.order_time}}</span>
          </div>
          <div class="item-section1-right">
            <span class="continue-color">合计:￥</span>
            <span class="danger-color">{{item.package_total_price}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="pay-box">
      <h5>请选择支付方式</h5>
      <div class="pay-item" v-for="(item,index) in list">
        <div class="pay-left f-left">
          <i :class="item.iconClass"></i>
        </div>
        <div class="pay-right f-right">
          <span class="f-left">{{item.payName}}</span>
          <i class="f-right" :class="item.iconCheckClass" @click="chooseIndex(index)"></i>
        </div>
      </div>
      <div>
        <div class="button-box">
          <button @click="submit">立即支付</button>
        </div>
        <p class="bottom">点击充值，即代表阅读并同意<span class="danger-color">充值协议</span></p>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jQuery'

  export default {
    name: "record",
    created: function () {
      if (this.$route.query.packageId) {
        this.packageId = this.$route.query.packageId;
        this.placeId = this.$route.query.placeId;
        this.userId = this.$route.query.userId;
        this.deviceId = this.$route.query.deviceId;
        this.packageNum = this.$route.query.packageNum;
        this.mobile = this.$route.query.mobile;
        this.mac = this.$route.query.mac;
        let that = this;
        $.ajax({
          type: 'post',
          url: this.CommonConst.BASE_URL + 'demo/Package/packageInfo',
          data: {
            "id": that.packageId,
            "package_num": that.packageNum,
          },
          success: function (response) {
            that.item = response.data;
            that.form['user_id'] = that.userId;
            that.form['place_id'] = that.placeId;
            that.form['package_id'] = that.item.id;
            that.form['pay_price'] = that.item.package_price;
            that.form['pay_num'] = that.item.package_num;
            that.form['total_price'] = that.item.package_total_price;
            that.form['package_name'] = that.item.package_name;
          },
          error: function () {
            that.$message('请求出错');
          }
        })
      }
    },

    data: function () {
      return {
        packageId: '',
        placeId: '',
        packageNum: '',
        deviceId: '',
        index: -1,
        item: {},
        form: {},
        list: [
          {
            iconClass: 'iconfont icon-wechat',
            payName: '微信支付',
            iconCheckClass: 'iconfont icon-yuanquanweixuanfuben'
          },
          {
            iconClass: 'iconfont icon-zhifubao',
            payName: '支付宝支付',
            iconCheckClass: 'iconfont icon-yuanquanweixuanfuben'
          },
          {
            iconClass: 'iconfont icon-yinxingqia-copy',
            payName: '银行卡支付',
            iconCheckClass: 'iconfont icon-yuanquanweixuanfuben'
          }
        ],
        index: -1,
        timeLogoClass: 'iconfont icon-shijian',
        liuliangLogoClass: 'iconfont icon-chongliuliang',
        timeUrl: '../../static/images/item1.png',
        timeLogoUrl: '../../static/images/item1_logo.png',
        liuliangUrl: '../../static/images/item2.png',
        liuliangLogoUrl: '../../static/images/item2_logo.png',
        checkedArr: [],
        numberArr: []
      }
    },
    methods: {
      /***
       * 改变选中状态的样式
       * @param index选中的索引
       */
      chooseIndex: function(index){
        for(let i=0;i<this.list.length;i++){
          this.list[i].iconCheckClass = 'iconfont icon-yuanquanweixuanfuben';
        }
        this.list[index].iconCheckClass = 'iconfont icon-gou';
        this.index = index;
      },
      /**t
       * 提交
       */
      submit: function(){
        this.form.device_id = this.deviceId;
        this.form.pay_type = '1';
        if(this.index===0){
          this.pay('demo/pays/wxscanpay')
        } else if(this.index===1){
          this.pay('demo/pays/alipay');
        }
      },
      /**
       * 请求支付接口
       */
      pay: function(url){
        let that = this;
        $.ajax({
          type: 'post',
          url: that.CommonConst.BASE_URL + url,
          data: that.form,
          success: function(response){
            if(response.error === 0){
              that.isLoading = false;
              if(that.index===1){
                location.href = response.data.url;
              }
              if(that.index===0){
                that.$router.push({
                  path: '/weixin',
                  query: {
                    order_no: response.data.order_no,
                    url: response.data.url
                  }
                })
              }
            }
          },
          error: function(){
            that.isLoading = false;
            that.$message('请求支付接口出现错误，请稍后再试');
          }
        })
      }
    }
  }
</script>

<style scoped>
  @import '../assets/icon/iconfont.css';

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
    height: 217px;
    overflow-x: hidden;
  }

  .package-box {
    float: left;
    margin-left: 12px;
    width: 757px;
    border-radius: 5px;
  }

  .header-title, .item-box {
    padding: 0 38px;
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
  .pay-box {
    background-color: #ffffff;
  }
  .pay-box h5 {
    padding: 0 38px;
    line-height: 46px;
    color: #444444;
    font-size: 14px;
    border-bottom: 1px solid #dfdfdf;
  }
  .pay-item {
    padding: 0 38px;
    height: 60px;
    line-height: 60px;
    overflow: hidden;
    box-sizing: border-box;
  }
  .f-left {
    float: left;
  }
  .pay-left {
    width: 74px;

  }
  .pay-right {
    width: calc(100% - 74px);
    font-size: 14px;
    box-sizing: border-box;
    height: 100%;
    border-bottom: 1px solid #efefef;
  }

  .pay-left .iconfont {
    font-size: 48px;
    color: #41b035;
  }
  .pay-left .icon-zhifubao {
    font-size: 48px;
    color: #3c98e3;
  }
  .pay-left .icon-yinxingqia-copy {
    font-size: 48px;
    color: #00508e;
  }


  .pay-right .iconfont {

    font-size: 24px;
    cursor: pointer;
    color: #a5a5a5;
  }
  .pay-right .icon-gou {

    font-size: 24px;
    cursor: pointer;
    color: #d81e06;
  }
  .f-right {
    float: right;
  }
  .button-box {
    margin-top: 15px;
    text-align: center;
  }
  .button-box button {
    width: 100px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    color: #fff;
    background-color: #447ed9;
    outline: none;
    cursor: pointer;
    border: none;
    border-radius: 5px;
  }
  .button-box button:hover {
    opacity: 0.9;
  }
  .bottom {
    text-align: center;
    margin: 10px auto 0;
    padding-bottom: 8px;

  }
  .bottom .danger-color {
    cursor: pointer;
  }
</style>
