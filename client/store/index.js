import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// 导入各个模块
// 模块通常以页面为维度组织
// 公用数据可以单独放在一个公用模块中
import user from './modules/user'
import root from './modules/root'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 将模块添加到store
  modules: {
    root,
    user,
  },
  plugins: [createPersistedState({ paths: ['user'] })], //[createPersistedState({ paths: ['page'] })],
})

export default store
