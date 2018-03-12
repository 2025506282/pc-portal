import Vue from 'vue'
import Router from 'vue-router'
import CertificationProcess from '../pages/CertificationProcess.vue'
import User from '../pages/User.vue'
import Record from '../pages/Record.vue'
import Package from '../pages/Package.vue'
import Pay from '../pages/Pay.vue'
import Edit from '../pages/Edit.vue'
import Service from '../pages/Service.vue'
import Status from '../pages/Status.vue'
import Photo from '../pages/Photo.vue'
import Agreement from '../pages/Agreement.vue'
import Home from '../pages/Home.vue'
import HomeCode from '../pages/HomeCode.vue'
import HomeTelephone from '../pages/HomeTelephone.vue'
import HomePassword from '../pages/HomePassword.vue'
import EditPassword from '../pages/EditPassword.vue'
import PayStatus from '../pages/PayStatus.vue'
import Wait from '../pages/Wait.vue'
import Game from '../pages/Game.vue'
import Lock from '../pages/Lock.vue'
import Weixin from '../pages/Weixin.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/agreement',
      name: 'Agreement',
      component: Agreement
    },
    {
      path: '/weixin',
      name: 'Weixin',
      component: Weixin
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      children:[
        {
          path: '/',
          name: 'HomeTelephone',
          component: HomeTelephone,
        },
        {
          path: '/password',
          name: 'HomePassword',
          component: HomePassword
        },
        {
          path: '/edit',
          name: 'EditPassword',
          component: EditPassword
        },
        {
          path: '/code',
          name: 'HomeCode',
          component: HomeCode
        },
      ]
    },
    {
      path: '/certificationProcess',
      name: 'CertificationProcess',
      component: CertificationProcess
    },

    {
      path: '/user',
      name: 'User',
      component: User,
      redirect: '/status',
      children: [
        {
          path: '/service',
          name: 'Service',
          component: Service
        },
        {
          path: '/record',
          name: 'Record',
          component: Record
        },
        {
          path: '/package',
          name: 'Package',
          component: Package
        },
        {
          path: '/pay',
          name: 'Pay',
          component: Pay
        },
        {
          path: '/user-edit',
          name: 'Edit',
          component: Edit
        },
        {
          path: '/photo',
          name: 'Photo',
          component: Photo
        },
        {
          path: '/game',
          name: 'Game',
          component: Game
        },
        {
          path: '/status',
          name: 'Status',
          component: Status
        },
        {
          path: '/pay-status',
          name: 'PayStatus',
          component: PayStatus
        },
        {
          path: '/wait',
          name: 'Wait',
          component: Wait
        },
        {
          path: '/lock',
          name: 'Lock',
          component: Lock
        },
      ]
    },

  ],
  mode: 'history',
  base: '/pc/', //加上这一行
  scrollBehavior(to, from, savedPosition) {
    console.log(from);
    console.log(to);
    return {x: 0, y: 0}
  },
})
