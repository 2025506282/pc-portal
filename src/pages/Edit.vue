<template>
  <!--编辑用户信息组件-->
  <div class="edit-box">
    <div class="edit-header">
      基本信息
    </div>
    <div class="item-box">
      <el-form ref="form" :model="user" label-width="80px" class="form-user">
        <el-form-item label="昵称">
          <el-input v-model="user.username" style="width: 230px;"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <div>
            <el-radio v-model="user.gender" :label="1" border>男</el-radio>
            <el-radio v-model="user.gender" :label="0" border>女</el-radio>
          </div>
        </el-form-item>
        <el-form-item label="地区">
          <el-select v-model="province" placeholder="请选择省份" @change="changeProvince(province)">
            <el-option v-bind:label="item.name" v-bind:value="item.name" v-for="(item,index) in provinceArr" v-bind:key="index" ></el-option>
          </el-select>

          <el-select v-model="city" placeholder="请选择市" @change="changeCity(city)">
            <el-option  v-bind:label="item.name"  v-bind:value="item.name"v-for="(item,index) in cityArr"v-bind:key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生日">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="请选择出生日期" v-model="user.Birthday" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="专业">
          <el-input type="text"v-model="user.major" style="width: 230px;"></el-input>
        </el-form-item>
        <el-form-item label="修改密码">
          <el-input type="password"v-model="user.password" style="width: 230px;"></el-input>
        </el-form-item>
        <el-form-item label="个性签名">
          <el-input type="textarea" v-model="user.personality" style="resize: none"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">保存</el-button>
          <el-button>放弃</el-button>
        </el-form-item>
      </el-form>
      <div class="logo-box">
        <div>移动放大</div>
        <div>
          <img src="../assets/images/identify.png"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jQuery'
  import 'element-ui/lib/theme-chalk/index.css'
  export default {
    name: "edit",
    created: function () {
      //初始化二级菜单省市数据
//初始化数据
      this.mobile = this.$route.query.mobile;
      this.mac = this.$route.query.mac;

      this.getUserInfo();
    },

    data: function () {
      return {
        mobile: '',
        mac: '',
        province: '',
        city: '',
        json: null,
        provinceArr: ["请选择", "北京市", "天津市", "河北省", "山西省", "内蒙古自治区", "辽宁省", "吉林省", "黑龙江省", "上海市", "江苏省", "浙江省", "安徽省", "福建省", "江西省", "山东省", "河南省", "湖北省", "湖南省", "广东省", "广西壮族自治区", "海南省", "重庆市", "四川省", "贵州省", "云南省", "西藏自治区", "陕西省", "甘肃省", "青海省", "宁夏回族自治区", "新疆维吾尔自治区"],
        cityArr: [],
        user: {},
        form: {//提交的数据
          name: '',
          province: '',
          sex: '男',
          city: '',
          password: '',
          birth:'',
          type: [],
          desc: ''
        }
      }
    },
    methods: {
      /***
       * 获取用户信息
       */
      getUserInfo: function () {
        let that = this;
        $.get(this.CommonConst.BASE_URL + 'demo/user/userinfo', {
          "mobile": that.mobile
        }, function (response) {
          that.user = response.data;
          // that.birthday = that.user.Birthday == '' ? '2000-10-01' : that.user.Birthday;
          // that.sex = that.user.gender === 1 ? '男' : '女';
          if(that.user.region) {
            that.province = that.user.region.split(',')[0];
            that.city = that.user.region.split(',')[1];
          }
          that.getProvince();

        });
      },
      /***
       * 获取省市两级数据
       */
      getProvince() {
        let that = this;
        $.ajax({
          method: 'get',
          url: this.CommonConst.BASE_URL + 'demo/publics/locationsList',
          success: function (response) {
            that.provinceArr = response.data;
          }
        })
      },
      /***
       * 获取市级数据
       */
      getCity(id) {
        let that = this;
        $.ajax({
          method: 'get',
          data: {
            'parent_id': id
          },
          url: this.CommonConst.BASE_URL + 'demo/publics/locationsList',
          success: function (response) {
            that.city = '请选择市';
            that.cityArr = response.data;
          }
        })
      },
      /***
       * 当点击不同的省份，显示不同的市
       */
      changeProvince:function(name){
        let obj = {};
        obj = this.provinceArr.find((item)=>{//这里的userList就是上面遍历的数据源
          return item.name === name;//筛选出匹配数据
        });
        this.getCity(obj.id);
      },
      changeCity: function(id){
        // console.log(id)
      },
      submit: function(){
        let that = this;
        if(typeof this.user.Birthday !== 'string') {
          this.user.Birthday = this.Utils.transDate(this.user.Birthday);
        }
        this.user.region = this.province + ',' + this.city;
        $.post(this.CommonConst.BASE_URL + 'demo/user/userUpdate', this.user, function (response) {
            if (response.error === 0) {
              that.$message({
                message: '修改成功',
              });
              that.$router.push({
                path: '/user',
                query: {
                  "mobile": that.mobile,
                  "mac": that.mac
                }
              });
            }
          }
        )
      }
    }
  }
</script>

<style scoped>
  .form-user {
    position: relative;
    z-index: 2;
  }
  .logo-box {
    cursor: pointer;
    position: absolute;
    z-index: 5;
    top: 50px;
    right: 38px;
    float: right;
    display: inline-block;
    width: 50%;
    text-align: right;
    font-size: 12px;
    color: #666666;
  }
  .logo-box img:hover {
    width: 84px;
    height: 84px;
  }
  .logo-box img {
    width: 28px;
    height: 28px;
    position: relative;
    z-index: 3;
    transition: all ease 1s;
  }
  .item-box {
    height: 567px;
    padding: 37px 17px;
    border-radius: 5px;
    position: relative;
    box-sizing: border-box;
    background-color: #fff;
  }

  .item {
    height: 36px;
    width: 100%;
  }

  .item > div {
    float: left;
  }

  .item-left {
    width: 80px;
    text-align: right;
  }

  .edit-box {
    float: left;
    margin-left: 12px;
    width: 757px;
    border-radius: 5px;
  }

  .edit-header {
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


</style>
