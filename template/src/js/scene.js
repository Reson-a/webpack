/* global THREE */
import CONFIG from '@/js/config'

// const defaultCameraPos = {
//   x: 20,
//   y: 20,
//   z: 20
// }

const defaultCameraPos = {
  x: 100,
  y: 100,
  z: 100
}

/**
 * ===============================
 * 基础场景
 * 场景 相机 渲染器 控制器
 * ===============================
 */

export default class Scene {
  constructor (options = {}) {
    this.offsetX = options.offsetX || 0
    this.offsetY = options.offsetY || 0
    this.perOffsetX = options.perOffsetX || 0
    this.perOffsetY = options.perOffsetY || 0
    this.perWidth = options.perWidth || 1
    this.perHeight = options.perHeight || 1
    this.domElement = options.domElement || document.getElementById('canvas')
    this.cameraPos = options.cameraPos || new THREE.Vector3(defaultCameraPos.x, defaultCameraPos.y, defaultCameraPos.z)
    this.name = options.name || this.domElement.id
    this._init()
  }
  // 初始化
  _init () {
    this._initScene()
    this._initListeners()
  }
  // 初始化场景
  _initScene () {
    // 窗口宽
    let width = this.width = window.innerWidth * this.perWidth - Math.abs(this.offsetX)
    // 窗口高
    let height = this.height = window.innerHeight * this.perHeight - Math.abs(this.offsetY)
    // 场景
    let scene = this.scene = new THREE.Scene()

    // 相机
    let camera = this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000)
    camera.position.copy(this.cameraPos)
    camera.lookAt(scene.position)

    // 渲染器
    let renderer = this._renderer = new THREE.WebGLRenderer({
      canvas: this.domElement,
      alpha: true,
      antialias: true,
      logarithmicDepthBuffer: true,
      preserveDrawingBuffer: true
    })
    renderer.setClearColor(0xff0000, 0)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(width, height)

    this.modelContainer = new THREE.Object3D()
    scene.add(this.modelContainer)

    this.lightContainer = new THREE.Object3D()
    scene.add(this.lightContainer)

    if (CONFIG.isDebug) { // 坐标轴 方便调试
      // let axes = new THREE.AxesHelper(80)
      // scene.add(axes)
      // let gridHelper = new THREE.GridHelper(100, 10)
      // scene.add(gridHelper)
      this.initStats()
      console.log(renderer.info)
    }
  }
  /**
   * 初始化侦听器
   */
  _initListeners () {
    // 缩放
    window.addEventListener('resize', this._onWindowResize.bind(this), false)
  }

  initStats () {
    const Stats = require('@/libs/stats.js').Stats
    let stats = this.stats = new Stats()

    stats.setMode(0) // 0: fps, 1: ms
    stats.domElement.style.position = 'absolute'
    stats.domElement.style.top = ''
    stats.domElement.style.right = '0px'
    stats.domElement.style.bottom = '0px'
    stats.domElement.style.left = ''
    document.body.appendChild(stats.domElement)
    return stats
  }

  /**
   * 改变窗口大小
   */
  _onWindowResize () {
    // 窗口宽
    let width = this.width = window.innerWidth * this.perWidth - Math.abs(this.offsetX)
    // 窗口高
    let height = this.height = window.innerHeight * this.perHeight - -Math.abs(this.offsetY)
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()

    this._renderer.setSize(width, height)
  }
  // 重置
  reset () {
    this.camera.position.copy(this.cameraPos)
    this.camera.lookAt(this.scene.position)
    this.resetControl()
  }
  // 更新
  update () {
    this._renderer.render(this.scene, this.camera)
    this.control && this.control.update()
    this.stats && this.stats.update()
  }
  /**
   * 初始化控制器
   */
  initControl () {
    if (!this.control) {
      // 控制器
      let control = this.control = new THREE.OrbitControls(this.camera, this._renderer.domElement)
      control.target.set(0, 0, 0)
      control.enablePan = false
      // control.enab.1leDamping = false;
      // control.enableZoom = false;

      control.maxDistance = 300
      control.minDistance = 100
      control.update()
    }
  }

  /**
   * 设置控制器是否可用
   * @param value
   */
  setControlEnabled (value) {
    if (this.control) this.control.enabled = value
  }

  /**
   * 更新控制器
   */
  updateControl () {
    if (this.control) this.control.update()
  }

  /**
   * 重置控制器
   */
  resetControl () {
    if (this.control) {
      this.control.target.set(0, 0, 0)
      this.control.reset()
    }
  }

  /**
   * 获取控制器状态
   * @returns {boolean}
   */
  getControlMoveState () {
    return this.control && this.control.doMove
  }

  /**
   * 设置控制器目标
   *
   * @returns {boolean}
   */
  setControlTarget (target) {
    if (this.control) {
      this.control.target = target
    }
  }

  /**
   * 平移操作
   * @param x
   * @param y
   */
  pan (x, y) {
    this.control && this.control.manualPan(x, y)
  }

  /**
   * 添加模型
   * @param mesh
   */
  addModel (...models) {
    this.modelContainer.add(...models)
  }

  /**
   * 删除模型
   * @param child
   */
  removeModel (...models) {
    this.modelContainer.remove(...models)
  }

  /**
   * 删除所有模型
   */
  removeAllModels () {
    let child
    let children = this.modelContainer.children
    while (children.length) {
      child = children[0]
      this.modelContainer.remove(child)
    }
  }

  /**
   * 获取定位的屏幕坐标
   */
  getScreenPoint (mesh) {
    let v3 = new THREE.Vector3().applyMatrix4(mesh.matrixWorld).project(this.camera)
    let halfWidth = this.width / 2
    let halfHeight = this.height / 2
    return {
      x: Math.round(v3.x * halfWidth + halfWidth + this.offsetX),
      y: Math.round(-v3.y * halfHeight + halfHeight + this.offsetY)
    }
  }
}
