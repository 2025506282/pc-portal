<template>
  <div class="package-box">
    <div class="package-header">
      资费套餐
    </div>
    <div v-if="list.length!==0">
      <div class="item-box">
        <div class="item" v-for="(item,index) in list">
          <div class="item-section">
            <div class="item-section-logo">
              <img
                :src="item.package_companyType!==3?liuliangUrl:timeUrl"/>
            </div>
            <div class="item-section-description">
              <div class="item-section-description-top">
                <i :class="item.package_companyType!==3?timeLogoClass:liuliangLogoClass"></i>
                <div>{{item.package_companyType!==3?'时长套餐':'流量套餐'}}</div>
              </div>
              <div class="item-section-description-bottom">
                <span class="danger-color">限时购</span>
                <div>{{item.package_name}}</div>
              </div>
            </div>
            <div class="item-district">
              <div>使用范围</div>
              <div>{{item.place_name}}</div>
            </div>
            <div class="item-number">
              <div class="number-box">
                <span class="decline"  @click="decline(index)">-</span>
                <input type="text" v-model="numberArr[index]"/>
                <span class="add" @click="add(index)">+</span>
              </div>
            </div>
            <div class="item-price danger-color">
              ￥{{item.contract_isEnabled===1?item.contract_price:item.package_price}}
            </div>
          </div>
          <div class="item-section2">
                {{item.contract_isEnabled==='1'?item.contract_introduce:item.package_introduce}}
          </div>
          <div :class="checkedArr[index]?'item-checked':'no-item-check'" @click="changeCheck(index)">
          </div>
        </div>
      </div>
      <div class="finish-box" >
        <span>总计费用:</span>
        <span class="danger-color">￥{{totalPrice}}</span>
        <button @click="settlement">结算</button>
      </div>
    </div>

    <div class="no-renew-box" v-else>
      <div class="img-box">
        <img src="../assets/images/no_record.png"/>
        <p>该场所暂无资费套餐</p>
        <p>请耐心等待...</p>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jQuery'
  export default {
    name: "package",
    created: function () {
      let that = this;
      if(this.$route.query.mobile){
        this.mobile = this.$route.query.mobile;
        this.mac = this.$route.query.mac;
      } else {
        this.mac = that.$cookies.get('mac');
        this.mobile = that.$cookies.get('mobile');
      }
      this.userId = this.$route.query.userId;
      $.get(that.CommonConst.BASE_URL + 'demo/package/packagelist', {
        "mac": that.mac
      }, function (response) {
        if (response.error === '2002') {
          that.$message(response.message);
        }
        that.list = response.data;
        if (that.list) {
          for (let index = 0; index < that.list.length; index++) {
            that.checkedArr.push(false);
            that.numberArr.push(1);
          }
        }
      });
    },
    computed: {
      //计算订单总价
      totalPrice: function () {
        let index = -1;
        for (let i = 0; i < this.checkedArr.length; i++) {
          if (this.checkedArr[i]) {
            index = i;
          }
        }
        if (index !== -1) {

          let price = this.list[index].contract_isEnabled === 1 ? this.list[index].contract_price : this.list[index].package_price;
          let number = this.numberArr[index];
          return price * number;
        } else {
          return 0;
        }
      },
      //初始化订单，给每个项目初始化为1
      numberArrS: function () {
        let arr = [];
        for (let index = 0; index < this.numberArr.length; index++) {
          arr.push(parseInt(this.numberArr[index]))
        }
        return arr;
      }
    },
    data: function () {
      return {
        mobile: '',
        mac: '',
        userId: '',
        list: [],
        index: -1,
        timeLogoClass: 'iconfont icon-shijian',
        liuliangLogoClass: 'iconfont icon-chongliuliang',
        timeClass: 'iconfont icon-shijian',
        liuliangClass: 'iconfont icon-chongliuliang',
        timeUrl: '../../static/images/item1.png',
        timeLogoUrl: '../../static/images/item1_logo.png',
        liuliangUrl: '../../static/images/item2.png',
        liuliangLogoUrl: '../../static/images/item2_logo.png',
        checkedArr: [],
        numberArr: []
      }
    },
    methods: {
      //每点击一次+，添加相应数字
      add: function(index){
        this.$set(this.numberArr, index,++this.numberArr[index]);
      },
      //每点击一次-，减少相应数字
      decline: function(index){
        if(this.numberArr[index]>1) {
          this.$set(this.numberArr, index,--this.numberArr[index]);
        }
      },
      //点击结算时，将所获取到的套餐，及相关信息返回个后台
      settlement: function () {
        if (this.index === -1) {
          this.$message('请选择套餐');
        } else {
          var that  = this;
          let payPrice = this.list[this.index].contract_isEnabled === 1 ? this.list[this.index].contract_price : this.list[this.index].package_price;
          this.list[this.index]['user_id'] = this.userId;
          this.list[this.index]['package_id'] = this.list[this.index].id;
          this.list[this.index]['device_id'] = this.list[this.index].device_id;
          this.list[this.index]['package_type'] = this.list[this.index].package_companyType=='0'|| this.list[this.index].package_companyType=='1'|| this.list[this.index].package_companyType=='2'?'0':'1';
          this.list[this.index]['total_price'] = this.totalPrice;
          this.list[this.index]['pay_num'] = this.numberArrS[this.index];
          this.list[this.index]['pay_price'] = payPrice;
          this.list[this.index]['pay_time'] = this.Utils.transDate(new Date());
          this.$router.push({
            path: '/pay',
            query: {
              "packageId": this.list[this.index].id,
              "packageNum": that.numberArr[this.index],
              "userId": this.list[this.index]['user_id'],
              "placeId": this.list[this.index]['place_id'],
              "deviceId": this.list[this.index]['device_id'],
              "mobile": that.mobile,
              "mac": that.mac
            }
          });
        }
      },
      changeCheck: function (index) {
        for (let i = 0; i < this.checkedArr.length; i++) {
          this.checkedArr[i] = false;
        }
        this.index = index;
        this.$set(this.checkedArr, index, true);
      }
    }
  }
</script>

<style scoped>
  @import '../assets/icon/iconfont.css';
  .no-renew-box {
    position: relative;
    background-color: #f8f8f8;
    height: 568px;
    overflow-x: hidden;
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
  .no-item-check {
    position: absolute;
    width: 25px;
    height: 25px;
    top: 50%;
    transform: translateY(-50%);
    left: 20px;
    border: 1px solid #bbb;
    border-radius: 50%;
    /*background-image: url("../assets/images/no_item_check.png");*/
    /*background-size: 25px 25px;*/
    cursor: pointer;
  }

  .item-checked {
    cursor: pointer;
    position: absolute;
    width: 25px;
    height: 25px;
    top: 50%;
    transform: translateY(-50%);
    left: 20px;
    background-image: url("../assets/images/item_check.png");
    background-size: 25px 25px;
  }

  .finish-box {
    width: 100%;
    height: 50px;
    line-height: 50px;
    margin-top: 17px;
    border-radius: 5px;
    background-color: #fff;
    font-size: 16px;
    box-sizing: border-box;
    padding-left: 25px;
  }

  .finish-box button {
    float: right;
    width: 116px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #fff;
    background-color: #fc2d48;
    border: none;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
    cursor: pointer;
  }

  .item-section2 {
    width: 280px;
    height: 32px;
    line-height: 32px;
    font-size: 12px;
    background-color: #f4f8fb;
    margin-left: 112px;
    margin-top: 8px;
    border-radius: 5px;
  }

  .package-box {
    color: #444;
    font-size: 12px;
  }

  .item-district {
    margin-left: 65px;
  }

  .item-district > div {
    height: 27px;
    text-align: center;
    line-height: 27px;
  }

  .package-header {
    width: 100%;
    height: 57px;
    line-height: 57px;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom: 1px solid #f5f3f3;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    font-size: 16px;
    text-align: center;
  }

  .item-box {
    height: 500px;
    overflow-x: hidden;
  }

  .item {
    width: 100%;
    box-sizing: border-box;
    padding: 19px 25px 10px;
    background-color: #fff;
    border-bottom: 1px solid #f5f3f3;
    position: relative;
  }

  .item-section {
    overflow: hidden;
  }

  .item-section > div {
    float: left;
  }

  .item-section > .item-price {
    float: right;
    line-height: 54px;
    font-size: 16px;
  }

  .item-section-logo {
    margin-left: 40px;
  }

  .item-section-logo img {
    width: 52px;
    height: 52px;
  }

  .item-section-description {
    color: #444444;
    margin-left: 20px;
  }

  .item-section-description > div {
    overflow: hidden;
  }

  .item-section-description img {
    width: 22px;
    height: 22px;
    float: left;
  }
.item-section-description-top .iconfont {
  float: left;
  font-size: 24px;
}
  .item-section-description-top > div {
    float: left;
    margin-left: 6px;
    padding-bottom: 2px;
    font-size: 16px;
    border-bottom: 1px solid #444444;
  }

  .package-box {
    float: left;
    margin-left: 12px;
    width: 757px;
    border-radius: 5px;
  }

  .item-section-description-bottom {
    margin-top: 10px;
    overflow: hidden;
    font-size: 12px;
    color: #444444;
  }

  .item-section-description-bottom span {
    display: block;
    float: left;
    box-sizing: border-box;
    height: 20px;
    padding: 0 6px;
    border: 1px solid red;
    margin-right: 6px;
  }

  .item-section-description-bottom > div {
    float: left;
    line-height: 18px;
  }

  .item-number {
    height: 54px;

    margin-left: 60px;
  }

  .item-number > div {
    margin-top: 15px;
    width: 100px;
    height: 24px;
    border-radius: 5px;
    box-sizing: border-box;
    border: 1px solid #dbdbdb;
    overflow: hidden;
    font-size: 14px;
  }

  .item-number > div span {
    display: block;
    float: left;
    width: 29px;
    text-align: center;
    height: 22px;
    line-height: 22px;
    cursor: pointer;
  }

  .item-number > div input {
    float: left;
    width: 40px;
    height: 24px;
    text-align: center;
    border: none;
    outline: none;
  }
</style>
