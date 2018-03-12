<template>
  <div>
    <div class="box">
      <div class="logo-box">
        <img src="../assets/images/tel.png"/>
      </div>
      <div class="title-box">
        输入验证码
      </div>
      <div class="description-box" v-if="isGetCode">
        {{mobile}}     {{time}}秒后重发       没收到？
      </div>
      <div  class="description-box" v-else  @click="sendAgain">
        重新发送
      </div>
      <div class="tel-box">
        <div class="input-box">
          <input type="text" class="code" v-model="code" maxlength="7"  @keyup.enter="submit"/>
        </div>
      </div>
      <div  v-if="!isLoading"v-bind:class="this.Utils.trimAll(code).length===4?nextGo:nextStay" @click="submit">
        下一步
      </div>
      <Loading v-else></Loading>
      <div class="check-box">
        <input type="checkbox" v-bind:checked="isChecked" id="agree"/>
        <label for="agree">我同意此上网<router-link to="/agreement">服务条款</router-link></label>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jQuery';
  export default {
    name: "home",
    created: function(){
      this.mobile = this.$route.query.mobile;
      this.mac = this.$route.query.mac;
      this.isMac = this.$route.query.isMac;
      if (this.$route.query.isEdit) {
        this.isEdit = this.$route.query.isEdit;
      }
      this.countdown();
    },
    data: function(){
      return {
        isChecked: true,
        isLoading: false,
        nextStay: 'next-box-stay',
        nextGo: 'next-box-go',
        code: '',
        mobile: '',
        mac: '',
        isMac: false,
        isEdit: false,
        isGetCode: true,
        timer: null,
        time: 120
      }
    },
    watch: {
      code: function (newVal, oldVal) {
        if (newVal.length > oldVal.length) {
          if (newVal.length === 1 || newVal.length === 3 || newVal.length === 5) {
            this.code += " ";
          }
        } else {
          if (newVal.trim().length === 1 || newVal.trim().length === 3|| newVal.trim().length === 5) {
            this.code = this.code.trim();
          }
        }
      }
    },
    methods: {
      submit: function(){
        let that = this;
        let code = this.Utils.trimAll(this.code);
        //是否需要需要设置密码
        if (this.isEdit) {
          $.post(this.CommonConst.BASE_URL+"demo/publics/isCode", {
            "code": code,
            "mobile": that.mobile
          }, function (response) {
            if (response.error == '0') {//临时放行三分钟
              that.toEditword();
            } else {
              that.$message(response.message);
            }
          })
        } else {
          $.post(this.CommonConst.BASE_URL+"demo/publics/portalLogin", {
            "mobile": that.mobile,
            "code": code,
            "mac": that.mac
          }, function (response) {
            if (response.error == '0'||response.error == '5006') {//临时放行三分钟
              // that.isGetCode = true;
              that.isLoading = true;
              let loginUrl = response.data.login_url;
              setTimeout(function(){
                that.$router.push({
                  path: '/certificationProcess',
                  query: {
                    "type": '2',
                    "loginUrl": loginUrl,
                    "mobile": that.mobile,
                    "mac": that.mac
                  }
                });
              },2000);
            } else if (response.error === '-1' || response.error === '0006') {//验证码错误
              that.$message(response.message);
            }
          })
        }
      },
      /***
       * 时间倒计时
       */
      countdown: function () {
        let that = this;
        that.timer = setInterval(function () {
          if (that.time === 1) {
            that.isGetCode = false;
            clearInterval(that.timer);
          }
          that.time = that.time - 1;
        }, 1000);
      },
      /***
       * 再次发送验证码
       */
      sendAgain: function ()
      {
        let that = this;
        $.ajax({
          url: that.CommonConst.BASE_URL + 'demo/publics/sendSms',
          data: {
            "mobile": that.mobile,
            "template_id": 'SMS_123797289'
          },
          success: function () {
            that.time = 120;
            that.isGetCode = true;
            that.countdown();
          }
        })
      },

      toEditword: function(){
        let that = this;
        this.isLoading = true;
        setTimeout(function () {
          that.$router.push({
            path: '/edit',
            query: {
              mobile: that.mobile,
              mac: that.mac
            }
          });
        }, 2000)
      },

      toCertificationProcess: function(){
        this.isLoading = true;
        let that = this;
        setTimeout(function () {
          that.$router.push({
            path: '/certificationProcess',
            query: {
              "type": '0',
              "mobile": that.mobile,
              "mac": that.mac
            }
          });
        }, 2000)
      },
    }
  }
</script>

<style scoped>
  .logo-box {
    width: 100%;
    height: 40px;
    text-align: center;
  }

  .logo-box img {
    width: 38px;
    height: 38px;
  }
  .box>div {
    text-align: center;
  }
  .title-box {
    margin-top: 20px;
    text-align: center;
    font-size: 18px;
  }

  .description-box {
    font-size: 12px;
    text-align: center;
    margin-top: 10px;
    color: #9fa0a0;
    cursor: pointer;
  }

  .input-box {
    margin: 16px auto 0;
    width: 200px;
    height: 38px;
    position: relative;
    border-bottom: 1px solid #cccccc;
  }

  .code {
    width: 100%;
    height: 100%;
    line-height: 100%;
    border: none;
    outline: none;
    font-size: 18px;
    text-align: center;
  }

  .next-box {
    margin-top: 26px;
    text-align: center;
    color: #bbbbbb;
    font-size: 18px;
  }
  .check-box {
    margin-top: 22px;
    font-size: 12px;
    color: #595757;
  }
  .check-box input {
    vertical-align: middle;
    width: 15px;
    height: 15px;
  }
  .check-box a {
    text-decoration: underline;
    cursor: pointer;
  }
  .check-box label {
    cursor: pointer;
  }
</style>
