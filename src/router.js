import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout'
const Login = () => import('@/views/login')
const Home = () => import('@/views/home')
const SpaceDevTree = () => import('@/views/spaceDevTree')
const Mobile = () => import('@/views/mobile')
const UpLoad = () => import('@/views/upload')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录'
      },
      component: Login
    },
    {
      path: '/',
      name: 'layout',
      component: Layout,
      redirect: '/spaceDevTree/space',
      children: [
        {
          path: '/home',
          name: 'home',
          meta: {
            title: '首页'
          },
          component: Home
        },
        {
          path: '/spaceDevTree/:id',
          name: 'spaceDevTree',
          meta: {
            title: '空间(设备)结构树'
          },
          component: SpaceDevTree
        },
        {
          path: '/mobile',
          name: 'mobile',
          meta: {
            title: '手机App'
          },
          component: Mobile
        },
        {
          path: '/upload',
          name: 'upload',
          meta: {
            title: '文件上传'
          },
          component: UpLoad
        }
      ]
    }
  ]
})
