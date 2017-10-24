import Vue from 'vue'
import Vuex from 'vuex'

import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)

const state = {
  publicParameters: {
    head: localStorage.getItem('head'),
    headType: 0,
    username: localStorage.getItem('username'),
    // domain: 'http://dev.cloud.360baige.com/cloud/window/safe/v1'
    loginDomain: 'http://192.168.0.101:30000/cloud/mobile/authority/v1',
    domain: 'http://192.168.0.101:30000/cloud/window/safe/v1'
  },
  userData: {
    phone: null,
    email: null,
    phoneStatus: 0,
    emailStatus: 0,
    qqStatus: 0,
    weChatStatus: 0
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
