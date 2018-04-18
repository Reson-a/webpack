/* global THREE */

/**
 * 射线投影
 * 控制mesh选择
 */

import * as Scene from './scene'
// import {dispatchEvt} from "./evtDispatcher"
// import * as store from './data/store'
// import * as CONST from './data/const'
import Vue from 'vue'

// 场景引用
var _scene

var _initialized = false
// 射线
var _raycaster
// 是否可用
var _enabled = false
// 相机引用
var _camera

/**
 * 点击处理
 * 获取点击模型
 * @param event
 */
function onDocumentClick (event) {
  if (_enabled === false) {
    return
  }

  if (Scene.getControlMoveState() === true) {
    return
  }

  event.preventDefault()

  let target = event.target
  let id = target.id
  if (id !== 'canvas') {
    return
  }

  // 鼠标点击位置
  let mousePosition = new THREE.Vector2()
  mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1
  mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1

  // find intersections
  _raycaster.setFromCamera(mousePosition, _camera)
  // let interObjArr = store.getInterObjects();
  // console.log('interObjArr', interObjArr);

  let intersects = _raycaster.intersectObject(_scene.children[0], true)

  if (intersects.length === 0) {
    Vue.prototype.$eventHub.$emit('blank-click')
    // 不做任何处理
  } else {
    let intersect = intersects[0]
    selectModel(intersect)
  }
}

/**
 * 选中一个模型
 * @param mesh
 */
function selectModel (intersect) {
  if (!intersect) {
    return
  }
  let obj = intersect.object

  Vue.prototype.$eventHub.$emit('model-click', obj)
}

/**
 * 点击处理
 * 获取点击模型
 * @param event
 */
function onMousemove (event) {
  if (_enabled === false) {
    return
  }

  // if (Scene.getControlMoveState() === true) {
  //     return;
  // }

  event.preventDefault()

  let target = event.target
  let id = target.id
  if (id !== 'canvas') {
    return
  }

  // 鼠标点击位置
  let mousePosition = new THREE.Vector2()
  mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1
  mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1

  // find intersections
  _raycaster.setFromCamera(mousePosition, _camera)
  // let interObjArr = store.getInterObjects();
  // console.log('interObjArr', interObjArr);

  let intersects = _raycaster.intersectObject(_scene.children[0], true)

  if (intersects.length === 0) {
    Vue.prototype.$eventHub.$emit('mesh-over', null)
    // 不做任何处理
  } else {
    let intersect = intersects[0]
    Vue.prototype.$eventHub.$emit('mesh-over', intersect.object)
  }
}

/// /////////////////////////////public////////////////////////////////

/**
 * 初始化
 * @param camera
 */
function init () {
  if (_initialized) {
    return
  }
  _initialized = true

  _raycaster = new THREE.Raycaster()
  _scene = Scene.getScene()
  _camera = Scene.getCamera()
  document.addEventListener('click', onDocumentClick, false)
  document.addEventListener('mousemove', onMousemove, false)
}

/**
 * 设置是否激活
 * @param value
 */
function setEnabled (value) {
  _enabled = value
}

export {
  init,
  setEnabled
}
