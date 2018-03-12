<template>
  <div class="record-box">
    <div class="record-header">
      充值记录
    </div>
    <div v-if="list.length!==0">
      <div class="item-box first-item" >
        <div class="item" v-for="(item,index) in list">
          <div class="item-top">
            <div class="item-top1">
              <i :class="item.pay_mode=='0'?weixinIcon:aliIcon"/>
            </div>
            <div class="item-top2">
              {{item.pay_mode=='0'?'微信支付':'支付宝支付'}}
              <span class="light-color">{{item.order_no}}</span>
            </div>
            <div class="item-top3 danger-color">
              -￥{{item.pay_total_price}}
            </div>
          </div>
          <div class="item-middle">
            <span class="light-color">购买</span>
            <span>{{item.package_name}}  </span>
            <span class="light-color">{{item.pay_num}}（{{item.package_companyType}}）</span>
          </div>
          <div class="item-bottom">
            <div class="item-bottom-left">
              <span>{{item.order_addTime}}</span>
              <span>&nbsp;{{item.pay_state=='0'?'未支付':'已支付'}}&nbsp;</span>
            </div>
            <div class="item-bottom-right">
              <span class="continue-color">{{item.pay_state=='0'?'继续支付':''}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="page-box">
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-count="lastPage"
          :page-size="pageSize"
          v-show="lastPage>1"
        >
        </el-pagination>
      </div>
    </div>

    <div class="item-box" v-else>
      <div class="img-box">
        <img src="../assets/images/no_record.png"/>
        <p>该场所暂无充值记录</p>
        <p>请耐心等待...</p>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jQuery'
  export default {
    name: "record",
    data: function(){
      return {
        mobile: '',
        mac: '',
        pageSize: 5,
        page: 1,
        lastPage: 1,
        list: {},
        weixinIcon: 'iconfont icon-wechat',
        aliIcon: 'iconfont icon-zhifubao',
      }
    },
    methods: {
      handleCurrentChange(val){

        let that = this;
        if(val) {
          that.page = val;
        }
        $.get(this.CommonConst.BASE_URL + "demo/user/userOrderlist", {
          "mobile": that.mobile,
          "pageSize": that.pageSize,
          "page": that.page
        }, function (response) {
          if(response.error==='5005'){
            that.list = [];
          }else {
            that.lastPage = response.data.last_page;
            that.list = response.data.data;
          }

        })
      }
    },
    created: function () {
      let that = this;
      if(this.$route.query.mobile){
        this.mobile = this.$route.query.mobile;
        this.mac = this.$route.query.mac;
      } else {
        this.mac = that.$cookies.get('mac');
        this.mobile = that.$cookies.get('mobile');
      }
      that.handleCurrentChange();
    },
  }
</script>

<style scoped>
  @import '../assets/icon/iconfont.css';
  .record-box .first-item {
    height: 480px;
    overflow: hidden;
    background-color: #fff;
  }
  .page-box {
    height: 87px;
    background-color: #fff;
    padding-top: 17px;
    box-sizing: border-box;
  }
  .img-box {
    text-align: center;
    margin: 120px auto;
    color: #999999;
    font-size: 14px;
  }
  .img-box img {
    margin-bottom: 25px;
  }
  .item-box {
    position: relative;
    background-color: #f8f8f8;
    height: 567px;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .item {
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid #f5f3f3;
    background-color: #fff;
    padding: 15px 33px 10px 33px;
  }
  .item>div {
    overflow: hidden;
    color: #444444;
  }
  .item>.item-top {
    height: 25px;

    line-height: 25px;
  }
  .item-top1 {
    width: 30px;
    height: 100%;
    font-size: 24px;

  }
  .item-top1 .iconfont {
    font-size: 24px;
  }
  .item-top1,.item-top2 {
    float: left;
  }
  .item-top1 img {
    width: 25px;
    height: 25px;
    margin-right: 5px;
  }
  .item-top3 {
    float: right;
  }
  .item-bottom-left {
    float: left;
    font-size: 12px;
  }
  .item-middle {
    font-size: 12px;
    margin-top: 8px;
    margin-bottom: 3px;
  }
  .item-bottom-right {
    float: right;
    font-size: 12px;
  }
  .record-box {
    float: left;
    margin-left: 12px;
    width: 757px;
    border-radius: 5px;
  }

  .record-header {
    width: 100%;
    height: 57px;
    line-height: 57px;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom: 1px solid #f5f3f3;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    text-align: center;
  }


  .el-pagination {
    text-align: center;
  }
</style>
