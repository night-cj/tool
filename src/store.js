import Vue from 'vue'
import Vuex from 'vuex'
import { localStorage } from '@/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage('Tool_Token')
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      localStorage('POMS_Token', token)
      state.token = token
    }
  },
  actions: {

  }
})
