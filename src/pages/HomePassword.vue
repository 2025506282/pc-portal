<template>
  <div>
    <div class="box">
      <div class="logo-box">
        <img src="../assets/images/tel.png"/>
      </div>
      <div class="title-box">
        输入登陆密码
      </div>
      <div class="description-box">
        请输入4-16位密码
      </div>
      <div class="tel-box">
        <div class="input-box">
          <input type="password" v-model="password" class="password" maxlength="16" minlength="4" @keyup.enter="submit"/>
          <div class="password-forget-box"  @click="toCode">
            忘记密码&gt;&nbsp;
          </div>
        </div>
      </div>
      <div v-if="!isLoading" v-on:click="submit"
           v-bind:class="this.Utils.trimAll(password).length>3&&this.Utils.trimAll(password).length<17?nextGo:nextStay">
        下一步
      </div>
      <Loading v-else></Loading>
      <div class="check-box">
        <input type="checkbox" v-bind:checked="isChecked" id="agree" disabled/>
        <label for="agree">我同意此上网<router-link to="/agreement">服务条款</router-link></label>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jQuery'
  export default {
    name: "home",
    data: function () {
      return {
        isLoading: false,
        isChecked: true,
        isPassword: false,
        password: '',
        nextStay: 'next-box-stay',
        nextGo: 'next-box-go',
      }
    },
    created: function(){
      this.mobile = this.$route.query.mobile;
      this.mac = this.$route.query.mac;
    },
    methods: {
      submit: function () {
        if (this.Utils.trimAll(this.password).length < 4 || this.Utils.trimAll(this.password).length > 17) {
          this.$message.error('号码格式错误');
          return false;
        } else {
          let that = this;
          $.post(this.CommonConst.BASE_URL + "demo/publics/portalLogin", {
              "mobile": that.mobile,
              "password": that.password,
              "mac": that.mac
            },
            function (response) {
              if (response.error === '0'||response.error === '5006') {
                that.isLoading = true;
                setTimeout(function () {
                  that.$router.push({
                    path: '/certificationProcess',
                    query: {
                      "type": '2',
                      "loginUrl": response.data.login_url,
                      "mobile": that.mobile,
                      "mac": that.mac
                    }
                  })
                }, 1000);
              } else {
                that.$message(response.message);
              }
            });

        }
      },
      /***
       * 去发送验证码
       */
      toCode: function ()
      {
        let that = this;
        $.get(this.CommonConst.BASE_URL + "demo/publics/sendSms", {
          "mobile": that.mobile,
          "template_id": 'SMS_123797289',
          "mac": that.mac
        }, function (response) {
          if (response.error === 0) {
            that.isLoading = true;
            setTimeout(function () {
              that.$router.push({
                path: '/code',
                query: {
                  "mobile": that.mobile,
                  "mac": that.mac,
                  "isEdit": true,
                  "isMac": true
                }
              });
            }, 2000)
          }
        });

      }
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

  .box > div {
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
  }

  .input-box {
    margin: 16px auto 0;
    width: 200px;
    height: 38px;
    position: relative;
    border-bottom: 1px solid #cccccc;
  }

  .password-forget-box {
    position: absolute;
    line-height: 38px;
    top: 0;
    right: -40px;
    font-size: 12px;
    cursor: pointer;
  }

  .password {
    width: 100%;
    height: 100%;
    line-height: 100%;
    border: none;
    outline: none;
    font-size: 18px;
    text-align: center;
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
