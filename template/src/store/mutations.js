import * as types from './types'

export default {
  [types.UPDATE_CUBES] (state, payload) {
    state.color = payload.color
    state.cubes = payload.cubes
  },
  [types.UPDATE_COLOR] (state, payload) {
    state.color = payload.color
  }
}
