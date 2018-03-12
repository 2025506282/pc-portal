import Vue from 'vue'
import axios from "axios";
import CommonConst from "./const";
axios.defaults.baseURL = CommonConst.BASE_URL;
axios.interceptors.request.use(function (config) {
  config.data = JSON.stringify(config.data);
  config.headers = {
    "Content-Type": "application/x-www-form-urlencoded"
  };
  let token = localStorage.getItem("access_token");
  if (token) {
    let obj = {
      "access_token": "fc1zwbGcm8vBzcSWTbtWXhP6Rnp8CYJe"
    };
    config.params = Object.assign(obj, config.params);
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});
