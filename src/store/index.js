import Vue from 'vue'
import Vuex from 'vuex'
import loading from './modules/loading'
import nonlinear from './modules/nonlinear'
import linear from './modules/linear'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    loading,
    nonlinear,
    linear
  }
})
