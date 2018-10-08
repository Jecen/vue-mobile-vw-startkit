import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './components/App'
import router from './route'
import store from './store'
import Http, { httpConfig  } from 'venus-fetch'
import Fv from 'components/Directive/fv'
const fv = new Fv()
// reset.css
import './assets/style/reset-1.3.3.css'

Vue.use(fv)
sync(store, router)

const http = Http(httpConfig)

const app = new Vue({
  router,
  store,
  ...App,
})

Vue.prototype.http = http


// 无登录状态可进入的页面·
const NO_LOGIN_ROUTER = [
  '/',
  '/login',
]
router.beforeEach((to, from, next) => {
  const isDev = process.env.NODE_ENV === 'development'
  const { path: current } = from
  const { path: target } = to
  const token = store.getters['user/token']
  const isLogin = !!token
  const isNeedAuthor = NO_LOGIN_ROUTER.indexOf(target) === -1
  if (isLogin && !isNeedAuthor && !isDev) { // 已经登录 且 进入不需要登录状态的页面 不做处理 注意 跳转至不需要登录状态之前需将 用户信息清空
    next(current)
  } else if (!isLogin && isNeedAuthor && !isDev) { // 没有登录 且 进入需要登录状态的页面时 做跳转至登陆页处理
    next('/login')
  } else {
    next()
  }
})

export {
  app, router, store, http,
}
