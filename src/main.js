// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import CommonLogo from './components/CommonLogo.vue'
import CommonTitle from './components/CommonTitle.vue'
import CommonBanner from './components/CommonBanner.vue'
import CommonBottom from './components/CommonBottom.vue'
import UserHeader from './components/UserHeader.vue'
import Loading from './components/Loading.vue'
import Utils from './utils/utils.js'
import CommonConst from './utils/const.js'
import './utils/http.js'
import VueCookies from 'vue-cookies'
import 'vue-loaders/dist/vue-loaders.css';
import * as VueLoaders from 'vue-loaders';

Vue.use(VueLoaders);
Vue.config.productionTip = false;
/***
 * 注册全局组件
 */
Vue.component("CommonLogo", CommonLogo);
Vue.component("CommonTitle", CommonTitle);
Vue.component("CommonBanner", CommonBanner);
Vue.component("CommonBottom", CommonBottom);
Vue.component("UserHeader", UserHeader);
Vue.component("Loading", Loading);
Vue.use(ElementUI);
Vue.use(VueCookies);

/***
 * 服务器地址，和本机地址常量
 * @type {{BASE_URL, LOCAL_URL}}
 */
Vue.prototype.CommonConst = CommonConst;
Vue.prototype.Utils = Utils;
Vue.prototype.$http = axios;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
