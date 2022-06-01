import Vue from 'vue'
import Vuex from 'vuex'
import loading from './modules/loading'
import nonlinear from './modules/nonlinear'
import linear from './modules/linear'
import interpolation from './modules/interpolation'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    loading,
    nonlinear,
    linear,
    interpolation
  }
})
