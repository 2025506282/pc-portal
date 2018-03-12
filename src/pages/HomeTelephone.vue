<template>
  <div>
    <div class="box">
      <div class="logo-box">
        <img src="../assets/images/tel.png"/>
      </div>
      <div class="title-box">
        输入手机号
      </div>
      <div class="description-box">
        为享受更多权益和服务，请输入手机号
      </div>
      <div class="tel-box">
        <div class="input-box">
          <input type="text" class="tel" v-model="tel" maxlength="13" v-bind:readonly="isShowUser"  @keyup.enter="submit"/>
          <div class="tel-before-box">
            +86&nbsp;&gt;&nbsp;
          </div>
        </div>
      </div>
      <div v-if="!isLoading&&!isShowUser" v-bind:class="this.Utils.trimAll(this.tel).length===11?nextGo:nextStay" v-on:click="submit" >
        下一步
      </div>
      <div v-else-if="!isLoading&&isShowUser" class="show-user-box">
        <span class="switch-account"  @click="changeAccount">切换账号</span>
        <span class="login" @click="secondLogin">登陆</span>
      </div>
      <Loading v-else></Loading>
      <div class="check-box">
        <input type="checkbox" v-model="isChecked"  id="agree"/>
        <label for="agree">我同意此上网<router-link to="/agreement">服务条款</router-link></label>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jQuery';

  export default {
    name: "home",
    created: function () {
      let that = this;
      that.locationJson = this.Utils.transLocation(location.href);
      if(that.locationJson.hasOwnProperty('gwid')){
        that.locationJson['nasid'] = that.locationJson.gwid;
      }
      that.locationJson['client_type'] = 'pc';
      that.mac = that.locationJson['mac'];
      $.get(this.CommonConst.BASE_URL + "demo/place/read", that.locationJson, function (response) {
        that.userInfo = response.data.user_info;
        that.isShowUser = response.data.is_show === 1 ? true : false;
        that.isMac = response.data.is_show === 1 ? true : false;
        that.placeInfo = response.data.place_info;
        if(that.isMac) {
          that.tel = that.userInfo.mobile;
          that.mobile = that.userInfo.mobile;
          that.tel = that.tel.substr(0, 3) + ' ***' + that.tel.substr(6, 1) + ' ' + that.tel.substr(7, 4);
        }
      })
    },
    data: function () {
      return {
        locationJson: {},
        userInfo: {},
        placeInfo: {},
        isShowUser: false,
        isChecked: true,
        isMobile: false,
        isMac: false,
        nextStay: 'next-box-stay',
        nextGo: 'next-box-go',
        tel: '',
        mobile: '',
        mac: '',
        isLoading: false,
        timer: null
      }
    },
    watch: {
      /***
       * 监测用户输入的号码，判断号码是否是3，9位时加入空格，4，9位时减去空格，并改变下一步的状态
       * @param newVal改变后的值
       * @param oldVal改变前的值
       */
      tel: function (newVal, oldVal) {
          if (newVal.trim().length > oldVal.trim().length) {
            if (newVal.length === 3 || newVal.length === 8) {
              this.tel += " ";
            }
          } else {
            if (newVal.trim().length === 4 || newVal.trim().length === 9) {
              this.tel = this.tel.trim();
            }
          }
        }
    },
    methods: {
      /***
       * 提交手机号码验证
       * @returns {boolean}
       */
      submit: function () {
        var that = this;

        that.locationJson['template_id'] = 'SMS_123797289';
        that.locationJson['is_mac'] = this.isMac;
        that.mobile = this.Utils.trimAll(this.tel);
        that.locationJson['mobile'] = this.mobile;
        if (this.Utils.checkMobile(this.tel) && this.isChecked) {
          this.login();
        } else {
          this.$message.error('号码格式错误');
        }
      },
      /**
       * 直接点击登陆
       * @returns {boolean}
       */
      secondLogin: function(){
        if (!this.isChecked) {
          this.$message('请勾选上网许可');
          return false;
        } else {
          this.userLogin();
        }
      },
      /***
       * 切换账号登陆
       */
      changeAccount: function(){
        this.isShowUser = false;
        this.tel = '';
      },
      /***
       * 点击登陆访问的接口
       */
      userLogin: function(){
        let that = this;
        $.ajax({
          type: 'post',
          url: this.CommonConst.BASE_URL + 'demo/publics/userlogin',
          data: {
            "mobile": that.mobile,
            "mac": that.mac
          },
          success: function (response) {
            if(response.error==='5010'){
              that.$message(response.message);
              return false;
            }
            if (response.error === '0' || response.error === '5006') {
              //注册用户，，状态吗为0，不欠费
              that.toCertificationProcess();
            }
          },
          error: function () {
            that.$message(that.CommonConst.SERVICE_ERROR);
          }
        })
      },
      /**
       * 点击下一步时访问的接口
       */
      login: function(){
        let that = this;
        $.post(this.CommonConst.BASE_URL + "demo/publics/login", this.locationJson, function (response) {
          if(response.error==='5010'){//状态码5010表示该账号已经在线
            that.$message(response.message);
            return false;
          }
          //是二次登陆,点击切换账号时
          if (that.isMac)
          {
            if (response.error === '0010') {//如果是新用户的话
              that.sendMessage(false);
            } else if (response.error === '0009') {//如果是老用户的话
              that.toPassowrd();
            }
          } else {
            //不是二次登陆，输入号码点击‘下一步’时，如果是新用户，直接注册；否则是老用户输入密码输入密码
            if (response.error === '0009') {
              if (response.data.state === 0) {
                that.sendMessage(true);
              } else {
                that.toPassowrd();
              }
            } else {
              that.sendMessage(false);
            }
          }
        });
      },
      /***
       * 发送短信验证码
       * @param isEdit发送验证码后是否需要编辑密码
       */
      sendMessage: function(isEdit){
        let that = this;
        $.ajax({
          url: that.CommonConst.BASE_URL + 'demo/publics/sendSms',
          data: {
            "mobile": that.mobile,
            "template_id": 'SMS_123797289'
          },
          success: function () {
            that.toCode(isEdit);
          }
        })
      },

      toCode: function(isEdit){
        let that = this;
        this.isLoading = true;
        setTimeout(function () {
          that.$router.push({
            path: '/code',
            query: {
              mobile: that.mobile,
              mac: that.mac,
              isMac: that.isMac,
              isEdit: isEdit
            }
          });
        }, 2000)
      },
      toPassowrd: function(){
        let that = this;
        this.isLoading = true;
        setTimeout(function () {
          that.$router.push({
            path: '/password',
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
  .show-user-box {

  }
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

  .tel-before-box {
    position: absolute;
    line-height: 38px;
    top: 0;
    left: -15px;
    font-size: 12px;
  }

  .tel {
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
  .show-user-box {
    width: 200px;
    margin: 26px auto 0;
    overflow: hidden;
  }
  .switch-account {
    float: left;
    cursor: pointer;
    color: #bbbbbb;
    margin-left: 20px;
    line-height: 24px;
  }
  .login {
    float: right;
    cursor: pointer;
    color: #00AAFF;
    margin-right: 20px;
    line-height: 24px;
  }
</style>
