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
// import throttle from 'lodash.throttle'

export default class RaycastControl {
  constructor (scene, options = {}) {
    if (!(scene instanceof Scene)) return
    if (scene.raycastControl) return
    scene.raycastControl = this
    this.enabledWhenMoving = options.enabledWhenMoving || false
    this._init(scene)
  }
  _init (scene) {
    this._raycaster = new THREE.Raycaster()
    this._scene = scene
    this._enabled = false
    scene.domElement.addEventListener('click', this._onMouseEvent.bind(this), false)
    scene.domElement.addEventListener('mousedown', this._onMouseEvent.bind(this), false)
    // 添加函数节流以提升性能
    // scene.domElement.addEventListener('mousemove', throttle(this._onMouseEvent.bind(this), 50), false)
    scene.domElement.addEventListener('mousemove', this._onMouseEvent.bind(this), false)
    scene.domElement.addEventListener('mouseup', this._onMouseEvent.bind(this), false)
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

    if (!this.enabledWhenMoving && scene.getControlMoveState()) return

    if (event.target !== scene.domElement) return

    event.preventDefault()

    // 鼠标点击位置
    let mousePosition = new THREE.Vector2()
    mousePosition.x = (event.clientX - window.innerWidth * scene.perOffsetX - scene.offsetX) / scene.width * 2 - 1
    mousePosition.y = -(event.clientY - window.innerHeight * scene.perOffsetY - scene.offsetY) / scene.height * 2 + 1

    // find intersections
    this._raycaster.setFromCamera(mousePosition, scene.camera)

    let intersects = this._raycaster.intersectObject(scene.modelContainer, true)

    Vue.prototype.$eventBus.$emit(`${scene.name}-${event.type}`, event, intersects)
  }
}
