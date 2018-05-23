import * as types from './types'

export default {
  updateCubes ({
    commit
  }, payload) {
    commit(types.UPDATE_CUBES, payload)
  },
  updateColor ({
    commit
  }, payload) {
    commit(types.UPDATE_COLOR, payload)
  }
}
