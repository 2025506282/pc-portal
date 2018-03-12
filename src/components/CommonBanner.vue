<template>
  <!--banner组件-->
  <div class="banner-box">
    <div class="banner-title">
      Banner
    </div>
    <div class="banner">
      <div class="banner-picture">
        <div class="arrow arrow-left">
          <span>&lt;</span>
        </div>
        <div class="picture-box">
          <div>
            <img :src="place_banner"/>
          </div>
          <div>
            <img src="../assets/images/banner_img_03.gif"/>
          </div>
        </div>
        <div class="arrow arrow-right">
          <span>&gt;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['place_banner']
  }
</script>

<style scoped>
.banner-box {
  margin-top: 50px;
  width:100%;
  text-align: center;
  font-size: 18px;
}
.banner {
  margin: 15px auto 115px;
  width: 1024px;
  height: 220px;
  box-sizing: border-box;
  padding: 20px 0;
  border-top: 1px dashed #bbbbbb;
  border-bottom: 1px dashed #bbbbbb;
}
.banner-picture {
  width: 100%;
  height: 100%;

}
.banner-picture>div {
  float: left;
}
.banner-picture .picture-box>div {
  float: left;
}
.picture-box img {
  width: 381px;
  height: 181px;
}
.banner-picture .picture-box>div:nth-child(1) {
  margin-right: 36px;
}
.banner-picture .arrow {
  width: 17px;
  height: 100%;
  font-size: 24px;
  margin: 0 48px;
  line-height: 178px;
}
.banner-picture .arrow span {
  cursor: pointer;
}
/*.banner-picture .arrow span:hover {*/
  /*color: red;*/
/*}*/
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 176px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
