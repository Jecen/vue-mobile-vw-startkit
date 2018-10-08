import Vue from 'vue'
import Router from 'vue-router'
import { store } from 'root/app.js'
import Root from '@'
const Login = () => import('@/login')
const Home = () => import('@/home')
// modules
// import ModuleA from './moduleA'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [{
    path: '/',
    component: Root,
    redirect: () => {
      const token = store.getters['user/token']
      const isLogin = !!token
      return !isLogin ? '/login' : '/home'
    },
    children: [
      {
        path: '/login',
        component: Login,
      },
      {
        path: '/home',
        component: Home,
      },
    ],
  }],
})