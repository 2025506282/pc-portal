<template>
  <div class="user">
    <UserHeader></UserHeader>
    <el-alert
              title="如果您在3分钟之内未能完成续费操作，将会被系统强制下线！若续费完成请点击退出登录，再次登录即可。"
              type="warning"
              class="alert-box"

              center>
    </el-alert>
    <div class="container">
      <div class="user-slide">
        <div class="user-logo-box" >
          <div  class="item1">
            <p>基本信息</p>
            <img src="../assets/images/identify.png"/>
          </div>
          <div class="item2">
            <img v-bind:src="userInfo.headImage"/>
            <div class="file-box">
              <input type="file" v-on:change="changePhoto"/>
            </div>
          </div>
          <div class="item3">
            <span>点击更换</span>
          </div>
          <div class="item4">
            <a @click="jump('/user-edit')" class="continue-color">
              <p>Hello!</p>
              <p>{{userInfo.username}}</p>
            </a>
          </div>
          <div class="item5">
            <p>上网账号:<span>{{userInfo.mobile}}</span></p>
          </div>
        </div>
        <div class="nav-box">
          <ul>
            <li v-for="(item,index) in nav" v-on:click.stop="changeActive(index)">
              <a @click="jump(item.path)" v-bind:class="item.isActive?activeClass:null">
                <img v-bind:src="item.url">
                <div>{{item.title}}</div>
              </a>
            </li>
          </ul>
        </div>
        <div class="logout-box" @click="logout">
          退出登录/下线
        </div>
      </div>
      <router-view :isPay="userInfo.network_stuts" :time="userInfo.network_end" @changeIndex="changeActive"></router-view>
    </div>
    <CommonBottom></CommonBottom>
  </div>
</template>
<script>
  import Cropper from 'cropperjs'
  import 'cropperjs/dist/cropper.min.css'
  import $ from 'jQuery'
  export default {
    created: function(){
      this.mobile = this.$route.query.mobile ? this.$route.query.mobile : this.$cookies.get('mobile');
      this.mac = this.$route.query.mac ? this.$route.query.mac : this.$cookies.get('mac');
      this.getUserInfo();
    },
    name: "user",
    data: function () {
      return {
        isBank: false,//是否显示蒙版
        arrClass: [false, false, false, false, false],
        imageUrl: '',
        activeClass: 'active',
        userInfo: {},
        //右侧导航栏nav数据
        nav: [
          {
            path: '/user',
            url: '../../static/images/slide/wife.png',
            title: '上网截至时间',
            isActive: false
          },
          {
            path: '/record',
            url: '../../static/images/slide/record.png',
            title: '充值记录',
            isActive: false
          },
          {
            path: '/game',
            url: '../../static/images/slide/game.png',
            title: '娱乐中心',
            isActive: false
          },
          {
            path: '/package',
            url: '../../static/images/slide/renew.png',
            title: '上网续费',
            isActive: false
          },
          {
            path: '/service',
            url: '../../static/images/slide/service.png',
            title: '线下技术服务',
            isActive: false
          },
          {
            path: '',
            url: '../../static/images/slide/internet.png',
            title: '去上网',
            isActive: false
          }
        ]
      }
    },
    methods: {
      /***
       * 初始化裁切框
       */
      initCrop: function(){
        var that = this;
        var image = document.getElementById('image');
        if (image) {
          this.cropper = new Cropper(image, {
            aspectRatio: 1,
            viewMode: 1,
            background: false,
            zoomable: false,
            ready: function () {
              that.croppable = true;
            }
          });
        }
        /***
         * 获取用户信息
         */
      },
      /***
       * 获取用户信息
       */
      getUserInfo: function () {
        let that = this;
        $.ajax({
          method: 'get',
          url: that.CommonConst.BASE_URL + 'demo/user/userinfo',
          data: {
            "mobile": that.mobile
          },
          success: function(response) {
            if(response.error==0){
              that.userInfo = response.data;
            } else {
              that.$message('获取用户信息失败');
              // that.logout();
            }
          }
        })
      },
      /***
       * 当点击图像时改变图片
       */
      changePhoto: function (e) {
        let files = e.target.files || e.dataTransfer.files;
        if(!files[0]) {
          return;
        }
        var type = files[0].name.split('.')[1];
        if(type==='png'||type==='jpg'||type==='gif'||type==='jpeg') {
          this.imageUrl = this.getObjectURL(files[0]);
          this.$router.push({
            path: '/photo',
            query: {
              'imgUrl':  this.imageUrl,
              'userId': this.userInfo.id
            }
          });
        } else {
          this.$message({
            message: '对不起，图片只支持jpg,png,gif格式',
            type: 'warning'
          });
          return;
        }
      },
      /***
       * 获取选择图片的本地路径
       */
      getObjectURL: function (file) {
        var url = null;
        if (window.createObjectURL != undefined) { // basic
          url = window.createObjectURL(file);
        } else if (window.URL != undefined) { // mozilla(firefox)
          url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) { // webkit or chrome
          url = window.webkitURL.createObjectURL(file);
        }
        return url;
      },

      /***
       * 修改nav的样式，变成active
       * @param index
       */
      changeActive: function(index){
        for(var i=0;i<this.nav.length;i++){
          this.nav[i].isActive = false;
        }
        this.nav[index].isActive = true;
        if(index===5){
          location.href = "http://www.baidu.com"
        }
      },
      /***
       * 跳转页面
       */
      jump: function(path){
        this.$router.push({
          path: path,
          query: {
            "mobile":this.mobile,
            "mac": this.mac,
            "userId": this.userInfo.id,
          }
        })
      },
      logout: function(){
        this.$cookies.remove('mobile');
        this.$cookies.remove('mac');
        location.href = 'http://1.0.0.0/logout';
      }
    }
  }
</script>

<style scoped>
  a {
    text-decoration: none;
  }

  .item-box img {
    margin: 10px auto;
  }

  .logout-box {
    margin-top: 15px;
    width: 100%;
    border-radius: 5px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #447ED9;
    background-color: #fff;
    cursor: pointer;
    font-size: 14px;

  }

  .alert-box {
    position: absolute;
    top: 60px;
    z-index: 1000;
  }

  .nav-box .active {
    border-left: 7px solid #252c35;
    background-color: #f8f8f8;
  }

  .nav-box li {
    list-style: none;
  }

  .nav-box li a {
    display: block;
    width: 100%;
    height: 49px;
    line-height: 49px;
    padding-left: 13px;
    box-sizing: border-box;
    border-left: 7px solid transparent;
    overflow: hidden;
    cursor: pointer;
    text-decoration: none;
    color: #252c35;
  }

  .nav-box a:hover {
    border-left: 7px solid #252c35;
    background-color: #f8f8f8;
  }

  .nav-box li img {
    margin-top: 14px;
    width: 21px;
    height: 21px;
    float: left;
    margin-right: 5px;
  }

  .nav-box li > div {
    height: 49px;
    line-height: 49px;
    float: left;
  }

  .user {
    width: 100%;
    position: relative;
    background-color: #efefef;
  }

  .container {
    width: 1024px;
    height: 830px;
    margin: 40px auto 0;
    position: relative;
  }

  .user-slide {
    width: 254px;
    height: 583px;
    border-radius: 5px;
    float: left;
  }

  .user-logo-box {
    text-align: center;
    width: 100%;
    overflow: hidden;
    color: #000000;
    border-radius: 5px;
    background-color: #fff;
    position: relative;
  }

  .user-logo-box .item1 {
    position: absolute;
    width: 100%;
    text-align: left;
    top: 27px;
    box-sizing: border-box;
    border-left: 7px solid #252c35;
    padding-left: 13px;
    height: 52px;

  }

  .item1 img {
    width: 28px;
    height: 28px;
  }

  .user-logo-box .item2 {
    margin: 50px auto 0;
    width: 85px;
    height: 85px;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid #bbbbbb;
    position: relative;
  }

  .file-box {
    position: absolute;
    opacity: 0;
    z-index: 1000;
    top: 0;
    left: 0;
  }

  .file-box input {
    width: 85px;
    height: 85px;
    cursor: pointer;
  }

  .user-logo-box .item2 img {
    width: 85px;
    height: 85px;
  }

  .item3 {
    font-size: 12px;
    color: #bbbbbb;
  }

  .item4 {
    margin-top: 14px;
    font-size: 14px;
    cursor: pointer;
  }
  .item4 a {
    color: #447ED9;;
  }
  .item4 a:hover {
    text-decoration: underline;
  }

  .item5 {
    font-size: 12px;
    margin-top: 15px;
    margin-bottom: 14px;
  }

  .nav-box {
    width: 100%;
    border-radius: 5px;
    margin-top: 15px;
    background-color: #fff;
  }
</style>
