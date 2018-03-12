import Base64 from 'js-base64';
import Vue from 'vue';
const Utils = {
  /**
   * 将本地的url转化为json的字符串
   * @param str
   * @returns {any & any}
   */
  transLocation: function (str) {
    var json = this.transJson(str);
    if (json.hasOwnProperty('ikenc')) {
      json['ikenc'] = Base64.Base64.decode(json['ikenc']);
      var newJson = this.transJson(json['ikenc']);
      newJson['type'] = 'ikver';
      delete json.ikenc;
    }
    return Object.assign(json, newJson);
  },
  /**
   * 将字符串转化为json
   * @param str
   * @returns {{}}
   */
  transJson: function (str) {
    var json = {};
    if (str.split('?').length > 1) {
      var arr = str.split('?')[1].split('&');
    } else {
      var arr = str.split('&');
    }
    for (let index = 0; index < arr.length; index++) {
      let key = arr[index].split('=')[0];
      let value = arr[index].split('=')[1];
      if (index === 0) {
        if (key !== 'ikver') {
          json['type'] = key;
        }
      }
      json[key] = value;
    }
    return json;
  },
  /***
   * 去掉字符串所有空格
   * @param str传入的字符串
   * @returns {string}
   */
  trimAll: function (str) {
    let arr = str;
    let newArr = [];
    for (let index in arr) {
      if (arr[index] !== ' ') {
        newArr.push(arr[index]);
      }
    }
    return newArr.join('');
  },
  /***
   * 检查传入的电话号码是否是11位电话吗
   * @param tel传入的电话号码
   */
  checkMobile: function (tel) {
    let sMobile = this.trimAll(tel);
    if(sMobile.length!==11){
      return false;
    }
    if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(sMobile))) {
      return false;
    } else {
      return true;
    }
  },
  /***
   * 将日期转化为特定格式
   * @param date
   * @returns {string}
   */
  transDate: function (date) {
    let year = date.getFullYear();
    let month = (date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    let day = date.getDate() < 10 ? "0" + (date.getDate()) : date.getDate();
    // let hours = date.getHours();
    // let minutes = date.getMinutes();
    // let seconds = date.getSeconds();
    // return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    return year + "-" + month + "-" + day;
  },
  flag: false,
  /**
   * Creates and loads an image element by url.
   * @param  {String} url
   * @return {Promise} promise that resolves to an image element or
   *                   fails to an Error.
   */
  request_image: function (url) {
    return new Promise(function (resolve, reject) {
      var img = new Image();
      img.onload = function () {
        this.flag = true;
        resolve(img);
      };
      img.onerror = function () {
        this.flag = false;
        reject(url);
      };
      img.src = url + '?random-no-cache=' + Math.floor((1 + Math.random()) * 0x10000).toString(16);
    });
  },
  /***
   * 判断当前用户是否已经联网
   */
  isOnline: function () {
    let promise = this.request_image('https://www.baidu.com/img/bd_logo1.png');
    let that = this;
    promise.then(function () {
      that.flag = true;
      Vue.cookies.set('isOnline', 2);
    }, function () {
      Vue.cookies.set('isOnline', 1);
    });
  },
};
export default Utils;
