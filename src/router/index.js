import Vue from 'vue'
import Router from 'vue-router'
import Tabar from '@/components/tabar'
import Home from '@/components/home'
import Hot from '@/components/hot'
import Vip from '@/components/vip'
import Free from '@/components/free'
import Me from '@/components/me'
import Login from '@/components/login'
import Sign from '@/components/sign'
import VideoPlay from '@/components/VideoPlay'
import GetVip from '@/components/getVip'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Tabar,
      children:[
            {
          path: '/',
          name: 'home',
          component: Home
        },
        {
          path: '/hot',
          name: 'hot',
          component: Hot
        },
        {
          path: '/vip',
          name: 'vip',
          component: Vip
        },
        {
          path: '/free',
          name: 'free',
          component: Free
        },{
          path: '/me',
          name: 'me',
          component: Me
        }
      ]
    },{
      path: '/login',
      name: 'login',
      component: Login
    },{
      path: '/sign',
      name: 'sign',
      component: Sign
    },{
      path: '/videoPlay',
      name: 'videoPlay',
      component: VideoPlay
    },
    {
      path: '/getVip',
      name: 'getVip',
      component: GetVip
    }
  ]
})
