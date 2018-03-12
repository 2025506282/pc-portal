<template>
  <div id="app">

    <router-view/>
  </div>
</template>

<script>

  export default {
    name: 'App',

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
  #app {
    width: 100%;
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
  .smile-color {
    color: #00aaff
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

  body .my-loading {
    width: 100%;
    height: 566px;
  }
  .check-box a {
    color: #595757
  }
</style>
