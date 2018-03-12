<template>
  <!--公共标题-->
  <div class="title-box">
    <div>
      <span class="icon-logo"></span>
      <p>
        {{placeName}}
      </p>
    </div>

  </div>
</template>

<script>
  export default {
    name: "title-box",
    props: ['placeName']
  }
</script>

<style scoped>
  .title-box {
    width: 1024px;
    height: 30px;
    margin: 20px auto 0;
  }
  .icon-logo {
    float: left;
    margin-left: 86px;
    display: inline-block;
    width: 6px;
    height: 30px;
    background-color: #202730;
  }
  .title-box p {
    float: left;
    height: 30px;
    line-height: 30px;
    margin-left: 7px;
  }


</style>
