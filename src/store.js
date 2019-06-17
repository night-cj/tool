import Vue from 'vue'
import Vuex from 'vuex'
import { localStorage } from '@/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage('Tool_Token'),
    project: localStorage('Tool_Project')
  },
  mutations: {
    SET_TOKEN: (state, userInfo) => {
      state.token = userInfo.token
      state.project = userInfo.project
    }
  },
  actions: {
    Login ({ commit }, data) {
      commit('SET_TOKEN', data)
    }
  }
})
