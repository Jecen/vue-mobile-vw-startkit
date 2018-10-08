// 用户相关store

import { http } from '../../app' // eslint-disable-line

// 定义action type
export const LOGIN_POST = 'LOGIN_POST'
export const LOGIN_SET_USER_INFO = 'LOGIN_SET_USER_INFO'
export const LOGIN_CLEAR_USER_INFO = 'LOGIN_CLEAR_USER_INFO'

// 指定对应api
export const api = { [LOGIN_POST]: '/login.action' }

// 初始化store对象
const state = { userInfo: {}, token: '' }

// 异步操作放到action handler里
const actions = {
  login({ commit }, payload) { // eslint-disable-line
    // return new Promise((resolve, reject) => {
    //   http.post(api[LOGIN_POST], payload)
    //     .then(res => {
    //       commit(LOGIN_SET_USER_INFO, res)
    //       resolve(res)
    //     })
    //     .catch(e => {
    //       console.log(e, 'error') // eslint-disable-line
    //       reject(e)
    //     })
    // })
    return new Promise((resolve) => {
      setTimeout(() => {
        commit('saveToken', new Date().getTime())
        resolve()
      }, 500)
    })
  },
  clearUserInfo({commit}, payload) { // eslint-disable-line
    commit(LOGIN_CLEAR_USER_INFO, payload)
  },
}

// 根据commit更新store
const mutations = {
  [LOGIN_SET_USER_INFO](state, payload) {
    state.userInfo = payload
  },
  [LOGIN_CLEAR_USER_INFO](state, payload) {// eslint-disable-line
    state.userInfo = {}
    state.token = ''
    payload()
  },
  saveToken(state, token) {
    state.token = token
  },
}


const getters = {
  userInfo(state) {
    return state.userInfo
  },
  token(state) {
    return state.token
  },
}

// 导出vuex模块
export default {
  // 模块开启命名空间
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}
