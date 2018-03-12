<template>
  <div class="status-box">
    <div v-if="!isPay" class="not-pay-box">
      <div>
        <h5>恭喜你已经成功登陆</h5>
        <a @click="toUserPackage" class="renew">
          <div class="arrears-box">
            该帐号已欠费，是否马上续费？
            <span class="badge">!</span>
          </div>
        </a>
      </div>
    </div>
    <div v-else class="pay-box">
      <div>
        <h5>恭喜你已经续费成功！</h5>
        <div class="arrears-box time-box">
          上网截止时间:
          <span class="time">{{time}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    created: function(){
      let that =this;
      if(this.$route.query.mobile){
        this.mobile = this.$route.query.mobile;
        this.mac = this.$route.query.mac;
      } else {
        this.mac = that.$cookies.get('mac');
        this.mobile = that.$cookies.get('mobile');
      }
      this.userId = this.$route.query.userId;
    },
    props: {
      isPay: Number,
      time: String
    },
    name: "status",
    data: function () {
      return {
        mobile: '',
        mac: '',
        userId: '',
      }
    },
    methods: {
      toUserPackage: function(){
        this.$emit('changeIndex',3);
        this.$router.push({
          path: '/package',
          query: {
            "mobile":this.mobile,
            "mac": this.mac,
            "userId": this.id,
          }
        })
      }
    }
  }
</script>

<style scoped>
  .renew {
    text-decoration: none;

  }

  .not-pay-box {
    background: url("../assets/images/not_pay.jpg") top no-repeat;
  }

  .pay-box {
    background: url("../assets/images/pay.png") top no-repeat;
  }

  .status-box > div > div {
    margin-left: 30px;
  }

  .status-box {
    width: 757px;
    height: 627px;
    float: left;
    margin-left: 12px;
    text-align: center;
    overflow: hidden;
  }

  .status-box > .not-pay-box, .status-box > .pay-box {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .status-box h5 {
    font-size: 30px;
    color: #447ed9;
    margin-top: 145px;
  }

  .arrears-box {
    padding-bottom: 5px;
    color: #d81e06;
    font-size: 14px;
    margin-top: 15px;
    cursor: pointer;
  }
  .arrears-box:hover {
    text-decoration: underline;
  }

  .time-box {
    color: #444444;
    font-size: 14px;
  }

  .time-box .time {
    color: #447ed9;
  }

  .badge {
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    color: #fff;
    border-radius: 50%;
    background-color: #ff9800;
  }
</style>
