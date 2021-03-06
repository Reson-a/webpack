import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    cubes: [],
    color: 'BLUE'
  },
  mutations,
  actions,
  strict: debug
  // plugins: debug ? [createLogger()] : []
})
