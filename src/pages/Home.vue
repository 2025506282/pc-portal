<template>
  <div id="app">
    <CommonLogo :placeBanner="placeInfo.place_banner"></CommonLogo>
    <CommonTitle :placeName="placeInfo.place_name"></CommonTitle>
    <router-view/>
    <CommonBanner v-bind="placeInfo"></CommonBanner>
    <CommonBottom></CommonBottom>
  </div>
</template>

<script>
  import $ from 'jQuery';

  export default {
    name: 'App',
    created: function () {
      let that = this;
      that.locationJson = this.Utils.transLocation(location.href);
      // location.href = 'https://portal.rulaiyun.net/?ikver=1&ikenc=Z3dpZD1kNjRjMTFkNDY4OWY0OGFlOGRiNTc2MzEwMDExYWEzNiZyb3V0ZXJfdmVyPTMuMC4zJm1hYz04NDo0YjpmNTo1ZDo5ZTphZCZ1c2VyX2lwPTE5Mi4xNjguMS4xMDYmdGltZXN0YW1wPTE1MjAzMDU4MDUmYXBtYWM9JmJzc2lkPSZzc2lkPSZmaXJtd2FyZT1JSy1Sb3V0ZXJPUyZuYXNuYW1lPTEmYmFzaXA9&refer=';
      // that.locationJson = this.Utils.transLocation('https://portal.rulaiyun.net/?ikver=1&ikenc=Z3dpZD1kNjRjMTFkNDY4OWY0OGFlOGRiNTc2MzEwMDExYWEzNiZyb3V0ZXJfdmVyPTMuMC4zJm1hYz04NDo0YjpmNTo1ZDo5ZTphZCZ1c2VyX2lwPTE5Mi4xNjguMS4xMDYmdGltZXN0YW1wPTE1MjAzMDU4MDUmYXBtYWM9JmJzc2lkPSZzc2lkPSZmaXJtd2FyZT1JSy1Sb3V0ZXJPUyZuYXNuYW1lPTEmYmFzaXA9&refer=');
      if(that.locationJson.hasOwnProperty('gwid')){
        that.locationJson['nasid'] = that.locationJson.gwid;
      }
      that.locationJson['client_type'] = 'pc';
      $.get(this.CommonConst.BASE_URL + "demo/place/read", that.locationJson, function (response) {
        that.placeInfo = response.data.place_info;
      })
    },
    data: function () {
      return {
        placeInfo: {},
      }
    },
  }
</script>
<style>
  /*全局样式*/
  * {
    margin: 0;
    padding: 0;
  }

  body {
    width: 100%;
    overflow-x: hidden;
    font-family: 微软雅黑;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .next-box-stay {
    margin-top: 26px;
    text-align: center;
    color: #bbbbbb;
    font-size: 18px;
  }

  .next-box-go {
    margin-top: 26px;
    text-align: center;
    color: green;
    font-size: 18px;
    cursor: pointer;
  }

  .danger-color {
    color: #d81f07;
  }

  .continue-color {
    color: #259b24;
  }

  .light-color {
    color: #447ed9;
  }

  .el-textarea__inner {
    resize: none;
  }

  #description .el-textarea__inner {
    height: 133px;
    resize: none;
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
</style>
