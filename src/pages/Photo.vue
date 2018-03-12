<template>
  <div class="photo-box" >
    <div class="photo-header">
      裁剪图像
    </div>
    <div class="img-box">
      <img v-bind:src="this.$route.query.imgUrl" id="image"/>
    </div>
    <div class="button-box">
      <el-button type="primary" v-on:click="crop">确定</el-button>
      <el-button v-on:click="back">取消</el-button>
    </div>
  </div>
</template>

<script>
  import Cropper from 'cropperjs'
  import 'cropperjs/dist/cropper.min.css'
  import $ from 'jQuery'
  export default {
    name: "photo",
    mounted: function () {
      let that = this;
      this.userId = this.$route.query.userId;
      let image = document.getElementById('image');
      this.cropper = new Cropper(image, {
        aspectRatio: 1,
        viewMode: 1,
        background:false,
        zoomable:false,
        ready: function () {
          that.croppable = true;
        }
      });
    },
  data: function(){
    return {
      imgUrl: '',
      headerImage: '',
      user: {},
      userId: ''
    }
  },
    methods: {
      back: function(){
        history.go(-1);
      },
      /***
       * 剪切，图片
       */
      crop: function () {
        let that = this;
        var croppedCanvas;
        var roundedCanvas;
        if (!this.croppable) {
          return;
        }
        croppedCanvas = this.cropper.getCroppedCanvas();

        // Round
        roundedCanvas = this.getRoundedCanvas(croppedCanvas);
        this.user.headImage = roundedCanvas.toDataURL();
        $.post({
          url: that.CommonConst.BASE_URL + 'demo/user/pic_base64',
          type: 'post',
          data: {
            'id': that.userId,
            'headImage': that.user.headImage,
          }
        }, function (response) {
          that.isLoading = false;
          if (response.error === 0) {
            that.$message(response.message);
            history.go(-1);
          }
        })
      },
      /***
       * 通过canvas画图
       * @param sourceCanvas
       * @returns {HTMLCanvasElement}
       */
      getRoundedCanvas: function (sourceCanvas)
      {
        console.log(sourceCanvas)
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        var width = sourceCanvas.width;
        var height = sourceCanvas.height;
        canvas.width = width;
        canvas.height = height;
        context.imageSmoothingEnabled = true;
        context.drawImage(sourceCanvas, 0, 0, width, height);
        context.globalCompositeOperation = 'destination-in';
        context.beginPath();
        //context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
        context.fillRect(0, 0, width, height);
        context.fill();
        return canvas;
      },
    }
  }
</script>

<style scoped>
  .img-box {
    height: 510px;
    overflow: hidden;
  }

  .button-box {
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }

  .button-box .confirm-crop {
    width: 80px;
    height: 40px;
    border: none;
    border-radius: 5px;
    margin-left: 30px;
  }

  .photo-box {
    float: left;
    margin-left: 12px;
    width: 757px;
    position: relative;
    z-index: 101;
    border-radius: 5px;
  }

  .photo-header {
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

  .item-box img {
    margin: 10px auto;
  }

</style>
