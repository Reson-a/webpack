/* global THREE */
// import * as store from './data/store'
import CONFIG from '@/js/config'

/**
 * ===============================
 * 基础场景
 * 场景 相机 渲染器 控制器
 *
 * ===============================
 */

let _initialized = false

// 场景
let _scene
// 相机
let _camera
// 渲染器
let _renderer
// 控制器
let _controls
// 模型容器
let _modelContainer
// 灯光容器
let _lightContainer

// mesh群组，模型自身的最顶级
let _meshGroup

// const cameraInitPos = { x: 50, y: 40, z: 120 }
const cameraInitPos = {
  x: 100,
  y: 100,
  z: 120
}

/**
 * 初始化场景
 */
function initScene () {
  // 窗口宽
  let windowWidth = window.innerWidth
  // 窗口高
  let windowHeight = window.innerHeight

  // 场景
  _scene = new THREE.Scene()

  // 相机
  _camera = new THREE.PerspectiveCamera(45, windowWidth / windowHeight, 1, 2000)
  _camera.position.set(cameraInitPos.x, cameraInitPos.y, cameraInitPos.z)
  _camera.lookAt(_scene.position)

  // 渲染画布
  let renderCanvas = document.getElementById('canvas')

  // 渲染器
  _renderer = new THREE.WebGLRenderer({
    canvas: renderCanvas,
    alpha: true,
    antialias: true,
    logarithmicDepthBuffer: true
  })
  _renderer.setClearColor(0xff0000, 0)
  _renderer.setPixelRatio(window.devicePixelRatio)
  _renderer.setSize(windowWidth, windowHeight)

  _modelContainer = new THREE.Object3D()
  // _modelContainer.position.set(0,-7,1.5);
  _scene.add(_modelContainer)

  _lightContainer = new THREE.Object3D()
  _scene.add(_lightContainer)

  if (CONFIG.isDebug) { // 坐标轴 方便调试
    let axes = new THREE.AxesHelper(40)
    _scene.add(axes)
  }
}

/**
 * 初始化侦听器
 */
function initListener () {
  // 缩放
  window.addEventListener('resize', onWindowResize, false)
}

/**
 * 改变窗口大小
 */
function onWindowResize () {
  _camera.aspect = window.innerWidth / window.innerHeight
  _camera.updateProjectionMatrix()

  _renderer.setSize(window.innerWidth, window.innerHeight)
}

/// /////////////////////////////public////////////////////////////////

/**
 * 初始化
 */
function init () {
  if (_initialized) {
    return
  }
  _initialized = true

  initScene()
  initListener()
}

/**
 * 刷新
 */
function update () {
  _renderer.render(_scene, _camera)
  if (_controls) {
    _controls.update()
  }
}

/**
 * 获取场景
 * @returns {*}
 */
function getScene () {
  return _scene
}

/**
 * 获取相机
 * @returns {*}
 */
function getCamera () {
  return _camera
}

/**
 * 重置相机
 */
function resetCamera () {
  _camera.lookAt(_scene.position)
  _camera.position.set(cameraInitPos.x, cameraInitPos.y, cameraInitPos.z)
}

/**
 * 初始化控制器
 */
function initControls () {
  if (_controls == null) {
    // 控制器
    _controls = new THREE.OrbitControls(_camera, _renderer.domElement)
    _controls.target.set(0, 0, 0)
    // _controls.enablePan = false
    // _controls.enab.1leDamping = false;
    // _controls.enableZoom = false;ßßß
    _controls.maxDistance = 200
    _controls.minDistance = 100
    _controls.update()
  }
}

/**
 * 设置控制器是否可用
 * @param value
 */
function setControlEnabled (value) {
  _controls.enabled = value
}

/**
 * 更新控制器
 */
function updateControl () {
  if (_controls) {
    _controls.update()
  }
}

/**
 * 重置控制器
 */
function resetControl () {
  if (_controls) {
    _controls.target.set(0, 0, 0)
    _controls.reset()
  }
}

/**
 * 获取控制器状态
 * @returns {boolean}
 */
function getControlMoveState () {
  if (_controls) {
    return _controls.doMove
  }
  return false
}

/**
 * 获取控制器状态
 *
 * @returns {boolean}
 */
function setControlTarget (target) {
  if (_controls) {
    _controls.target = target
  }
}

/**
 * 平移操作
 * @param x
 * @param y
 */
function pan (x, y) {
  _controls.manualPan(x, y)
}

/**
 * 添加默认的模型
 * @param model
 */
function addDefautModel (model) {
  _meshGroup = model

  addModel(model)

  // let copy = model.clone()
}

/**
 * 添加模型
 * @param mesh
 */
function addModel (model) {
  _modelContainer.add(model)
}

/**
 * 删除模型
 * @param child
 */
function removeModel (model) {
  _modelContainer.remove(model)
}

/**
 * 删除所有模型
 */
function removeAllModel () {
  let child
  while (_modelContainer.children.length) {
    child = _modelContainer.children[0]
    _modelContainer.remove(child)
  }

  _meshGroup = null
}

// /**
//  * 添加mesh
//  * @param mesh
//  */
// function addMesh (mesh) {
//   _meshGroup.add(mesh)
// }

// /**
//  * 移除mesh
//  * @param mesh
//  */
// function removeMesh (mesh) {
//   _meshGroup.remove(mesh)
// }

// /**
//  * 移除mesh通过名称
//  * @param meshName
//  */
// function removeMeshByName (meshName) {
//   let tempMesh = store.getMeshByName(meshName)
//   _meshGroup.remove(tempMesh)
// }

// /**
//  * 添加mesh通过名称
//  * @param meshName
//  */
// function addMeshByName (meshName) {
//   let tempMesh = store.getMeshByName(meshName)
//   _meshGroup.add(tempMesh)
// }

// /**
//  *
//  * @param meshName
//  * @param visible 是否可见
//  */
// function setMeshVisible (meshName, visible) {
//   if (visible) {
//     addMeshByName(meshName)
//   } else {
//     removeMeshByName(meshName)
//   }
// }

// /**
//  * 设置所有mesh的可见性
//  * @param isHidden
//  */
// function setAllMeshVisible (visible) {
//   let tempMeshMap = store.getMeshMap()
//   let tempMesh
//   for (let key in tempMeshMap) {
//     tempMesh = tempMeshMap[key]

//     if (visible) {
//       _meshGroup.add(tempMesh)
//     } else {
//       _meshGroup.remove(tempMesh)
//     }
//   }
// }

// /**
//  * 设置某一类mesh的可见性
//  * @param keyword
//  */
// function setMeshVisibleByCategory (keyword, visible) {
//   let tempMeshArr = store.getMeshByCategory(keyword)
//   let tempMesh
//   for (let i = 0; i < tempMeshArr.length; i++) {
//     tempMesh = tempMeshArr[i]
//     if (visible == true) {
//       _meshGroup.add(tempMesh)
//     } else {
//       _meshGroup.remove(tempMesh)
//     }
//   }
// }

// /**
//  * 获取定位的屏幕坐标
//  * @param meshName
//  * @returns {{x: number, y: number}}
//  */
// function getScreenPoint (positionMeshName) {
//   let worldVector
//   let mesh
//   let localVector

//   mesh = store.getMeshByName(positionMeshName)
//   localVector = new THREE.Vector3()
//   localVector.applyMatrix4(mesh.matrixWorld)
//   worldVector = new THREE.Vector3(localVector.x, localVector.y, localVector.z)

//   let vector = worldVector.project(_camera)
//   let halfWidth = window.innerWidth / 2
//   let halfHeight = window.innerHeight / 2
//   let result = {
//     x: Math.round(vector.x * halfWidth + halfWidth),
//     y: Math.round(-vector.y * halfHeight + halfHeight)
//   }

//   return result
// }

function up () {
  _meshGroup.rotation.x += Math.PI
}

export {
  init,
  update,
  getScene,
  getCamera,
  resetCamera,
  addDefautModel,
  addModel,
  removeModel,
  removeAllModel,
  initControls,
  setControlEnabled,
  updateControl,
  getControlMoveState,
  pan,
  resetControl,
  setControlTarget,
  up
}
