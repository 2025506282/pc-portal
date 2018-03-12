<template>
  <div class="service-box">
    <div class="service-header">
      基本信息
    </div>
    <div class="service-title">

      <span>桔子公寓收费WI-Fi  技术支持中心</span>
    </div>
    <div class="item-box">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="报修人">
          <el-input v-model="form.name" style="width: 230px;" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input type="text" v-model="form.tel" style="width: 230px;" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="所在位置">
          <el-input v-model="form.position" style="width: 305px;"  placeholder="请输入房间号或门号等信息"></el-input>
        </el-form-item>
        <el-form-item label="问题描述" id="description">
          <el-input  type="textarea" style="height:133px;"v-model="form.desc"placeholder="为了更好地服务您，请输入至少4个字的问题描述，您可以说：”X 栋XX房间，连接无线提示无法加入网络。”" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="onSubmit">马上保修</el-button>
        </el-form-item>

      </el-form>
      <div class="tel-box">
        <div>
          <i class="el-icon-phone-outline"></i>
        </div>
        <div>您也可直接拨打线下技术猿手机：138 0438 4438</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "record",
    mounted: function () {
      //初始化数据
      var that = this;
    },

    data: function () {
      return {
        json: null,
        provinceArr: ["请选择", "北京市", "天津市", "河北省", "山西省", "内蒙古自治区", "辽宁省", "吉林省", "黑龙江省", "上海市", "江苏省", "浙江省", "安徽省", "福建省", "江西省", "山东省", "河南省", "湖北省", "湖南省", "广东省", "广西壮族自治区", "海南省", "重庆市", "四川省", "贵州省", "云南省", "西藏自治区", "陕西省", "甘肃省", "青海省", "宁夏回族自治区", "新疆维吾尔自治区"],
        cityArr: [],
        form: {
          name: '',
          tel: '',
          position: '',
          desc: ''
        }
      }
    },
    methods: {
      changeProvince:function(){
        for (var index = 0; index < this.json[this.form.province].length; index++) {
          this.cityArr.push(this.json[this.form.province][index].name);
        }
      },
      onSubmit: function(){

      }
    }
  }
</script>

<style scoped>
  .tel-box {
    padding-left: 80px;
  }
  .tel-box>div {
    float: left;
    margin-right: 5px;
    color: #259b24;
    font-size: 12px;
  }
  .tel-box .el-icon-phone-outline {
    font-size: 16px;
  }

.service-title {
  width: 100%;
  font-size: 14px;
  color: #444444;
  height: 48px;
  box-sizing: border-box;
  line-height: 48px;
  padding-left: 33px;
  background-color: #f8f8f8;
}
.service-title span {
  display: inline-block;
  height: 30px;
  padding-bottom: 5px;
  border-bottom: 1px solid #acacac;

}
  .item-box {
    height: 519px;
    padding: 37px 17px;
    border-radius: 5px;
    position: relative;
    box-sizing: border-box;
    background-color: #fff;
  }



  .service-box {
    float: left;
    margin-left: 12px;
    width: 757px;
    border-radius: 5px;
  }

  .service-header {
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
