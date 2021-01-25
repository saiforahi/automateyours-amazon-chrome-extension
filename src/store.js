import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loggedIn: false,
    api_token: null,
    order:{},
  },
  mutations: {
    change_status (state,status) {
      state.loggedIn=status;
    }
  }
})