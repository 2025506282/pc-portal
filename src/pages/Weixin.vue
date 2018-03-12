<template>
  <div class="box">
    <div class="logo-box item">
      <img src="../assets/images/WePayLogo.jpg"/>
    </div>
    <div class="item">
      <div class="order-box">
        <div class="f-left">
          <p>订单编号：<span>{{orderNo}}</span></p>
          <p>订单类型：<span>续费</span></p>
        </div>
        <div class="f-right">
          <p></p>
          <p>应付金额：￥<span>{{item.pay_total_price}}</span></p>
        </div>
      </div>
      <div class="content-box">
        <div class="first-div">
          <img :src="url"/>
        </div>
        <div>
          <img src="../assets/images/description.png"/>
        </div>

      </div>
    </div>
    <CommonBottom></CommonBottom>
  </div>
</template>

<script>
  import $ from 'jQuery'

  export default {
    name: "record",
    created: function () {
      this.orderNo = this.$route.query.order_no;
      this.url = this.$route.query.url;
      this.getResult();
      let that = this;
      this.timer = setInterval(function(){
        that.getResult();
      },1000)
    },

    data: function () {
      return {
        orderNo: '',
        url: '',
        timer: '',
        item: {},
        package: {}
      }
    },
    methods: {
      getResult: function(){
        let that = this;
        $.ajax({
          url: that.CommonConst.BASE_URL + 'demo/pays/result',
          type: 'get',
          data: {
            "order_no": that.orderNo
          },
          success: function (response) {
            if(response.error==='5005') {
              that.$message('该订单不存在');
              that.isSuccess = false;
              return false;
            }
            if(response.data.pay_state===0) {
              if(!that.item.hasOwnProperty('error')) {
                that.item = response.data;
              }
            } else if (response.data.pay_state===1) {
              clearInterval(that.timer);
              that.$router.push({
                path: '/wait',
                query: {
                  "out_trade_no": that.orderNo
                }
              })
            } else if(response.data.pay_state===2) {
              clearInterval(that.timer);
              that.$router.push({
                path: '/wait',
                query: {
                  "out_trade_no": that.orderNo
                }
              })
            }

          },
          error: function (response) {
          }
        })
      }
    },
  }
</script>

<style scoped>
  @import '../assets/icon/iconfont.css';

  .box {
    background-color: #eff0f1;
  }

  .box > .item {
    box-sizing: border-box;
    padding: 0 15%;
  }

  .logo-box {
    background-color: #ffffff;
    height: 86px;
    text-align: left;
  }
  .logo-box img {
    width: 237px;
    height: 64px;
    margin-top: 6px;
  }

  .first-div img {
    width: 263px;
    height: 263px;
  }
  .order-box {
    height: 140px;
  }

  .order-box p {
    height: 70px;
    line-height: 70px;
  }
  .f-left p:last-child {
    text-align: left;
  }

  .f-left {
    float: left;
  }

  .f-right {
    float: right;
  }

  .content-box {
    border-top: 2px solid #b3b3b3;
    padding-top: 113px;
    box-sizing: border-box;
    height: 640px;
    background-color: #fff;
    text-align: center;
  }
  .content-box img {
    margin: 0 auto;
  }
  .content-box>div:last-child {
    margin-top: 20px;
  }

</style>
