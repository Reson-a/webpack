/* global THREE */

/**
 * 射线投影
 * 控制mesh选择
 */

import Scene from './scene'
// import {dispatchEvt} from "./evtDispatcher"
// import * as store from './data/store'
// import * as CONST from './data/const'
import Vue from 'vue'

export default class RaycastControl {
  constructor (scene) {
    if (!(scene instanceof Scene)) return
    if (scene.raycastControl) return
    scene.raycastControl = this
    this._init(scene)
  }
  _init (scene) {
    this._raycaster = new THREE.Raycaster()
    this._scene = scene
    this._enabled = false
    scene.domElement.addEventListener('click', this._onMouseEvent.bind(this), false)
    scene.domElement.addEventListener('mousemove', this._onMouseEvent.bind(this), false)
  }
  setEnabled (val) {
    this._enabled = val
  }

  /**
   * 点击处理
   * 获取点击模型
   * @param event
   */
  _onMouseEvent (event) {
    if (!this._enabled) return

    let scene = this._scene

    if (scene.getControlMoveState()) return

    if (event.target !== scene.domElement) return

    event.preventDefault()

    // 鼠标点击位置
    let mousePosition = new THREE.Vector2()
    mousePosition.x = (event.clientX / scene.width) * 2 - 1
    mousePosition.y = -(event.clientY / scene.height) * 2 + 1

    // find intersections
    this._raycaster.setFromCamera(mousePosition, this / this._scene.camera)

    let intersects = this._raycaster.intersectObject(this._scene.children[0], true)

    if (intersects.length === 0) {
      Vue.prototype.$eventBus.$emit(`blank-${event.type}`, null)
    } else {
      Vue.prototype.$eventBus.$emit(`model-${event.type}`, intersects[0])
      Vue.prototype.$eventBus.$emit(`models-${event.type}`, intersects)
    }
  }
}
