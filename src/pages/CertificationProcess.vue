<template>
  <div>
    <CommonLogo></CommonLogo>
    <div class="box">
      <div class="title-box">
        <div class="title-left">
          <span class="icon-logo"></span>
          <p>
            {{tips}}
          </p>
        </div>
        <div class="title-right">
          <span>{{time}}</span><span>s</span>
        </div>
      </div>
      <div class="img-box">
        <img src="../assets/images/advertising.png"/>
      </div>
      <div class="jump-box">
        <div class="jump" v-on:click="jump">跳过</div>
      </div>
    </div>
    <CommonBottom></CommonBottom>
  </div>
</template>

<script>
  import $ from 'jQuery'
  export default {
    name: "home",
    data: function(){
      return {
        tips: '正在检查网络连接安全性，请稍等.....    ',
        time: 5,
        timer: null,
        type: '',
        mobile: '',
        mac: ''
      }
    },
    mounted: function() {
      var that = this;
      this.mobile = this.$route.query.mobile;
      this.mac = this.$route.query.mac;
      this.$cookies.remove('mobile');
      this.$cookies.remove('mac');
      this.$cookies.set('mobile',this.mobile)
      this.$cookies.set('mac',this.mac)

      if (this.$route.query.type) {
        this.type = this.$route.query.type;
      }
      this.timer = setInterval(function(){
        that.time -= 1;
        if(that.time === 3) {
          that.tips = '正在请求认证放行，请稍等.....           ';
        }
        if(that.time === 1) {
          that.tips = '即将前往个人中心.....      ';
          that.jump();
        }
      },1000)
    },
    methods: {

      jump: function () {
        clearInterval(this.timer);
        this.timer = null;
        let that = this;
        if (that.type === '5006' || that.type === '0') {
          $.post(that.CommonConst.BASE_URL + 'demo/publics/userlogin', {
            "mobile": that.mobile,
            "mac": that.mac
          }, function (response) {
            if (response.error === '0' || response.error === '5006') {
              that.loginUrl = response.data.login_url;
              location.href = that.loginUrl;
            } else {
              that.$message(response.message);
            }
          })
        } else if (that.type === '2') {
          that.loginUrl = that.$route.query.loginUrl;
          location.href = that.loginUrl;
        }
      }

    }
  }
</script>

<style scoped>
  .title-box {
    width: 1024px;
    height: 30px;
    margin: 20px auto 0;
  }
  .icon-logo {
    float: left;
    margin-left: 86px;
    display: inline-block;
    width: 6px;
    height: 30px;
    background-color: #202730;
  }
  .title-box p {
    float: left;
    height: 30px;
    line-height: 30px;
    margin-left: 7px;
  }

  .title-right {
    float: right;
    height: 30px;
    margin-right: 90px;
    line-height: 30px;
  }
  .img-box {
    margin-top: 56px;
    margin-bottom: 113px;
    width: 100%;
    text-align: center;
  }
  .jump-box {
    margin: 0 auto;
    width: 1024px;
    overflow: hidden;
    margin-bottom: 18px;
  }
  .jump {
    cursor: pointer;
    float: right;
    margin-right: 77px;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 50%;
    background-color: rgba(229, 28, 35, 1);
    color: rgba(255, 255, 255, 1);
    font-size: 12px;
  }
</style>
