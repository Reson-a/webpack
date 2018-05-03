/* global THREE */
import CONFIG from '@/js/config'

const defaultCameraPos = {
  x: 100,
  y: 100,
  z: 120
}

/**
 * ===============================
 * 基础场景
 * 场景 相机 渲染器 控制器
 * ===============================
 */

export default class Scene {
  constructor (options = {}) {
    this.perWidth = options.perWidth || 1
    this.perHeight = options.perHeight || 1
    this.domElement = options.domElement || document.getElementById('canvas')
    this.cameraPos = options.cameraPos || new THREE.Vector3(defaultCameraPos.x, defaultCameraPos.y, defaultCameraPos.z)
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
    let width = this.width = window.innerWidth * this.perWidth
    // 窗口高
    let height = this.height = window.innerHeight * this.perHeight
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
      logarithmicDepthBuffer: true
    })
    renderer.setClearColor(0xff0000, 0)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(width, height)

    this._modelContainer = new THREE.Object3D()
    scene.add(this._modelContainer)

    this._lightContainer = new THREE.Object3D()
    scene.add(this._lightContainer)

    if (CONFIG.isDebug) { // 坐标轴 方便调试
      let axes = new THREE.AxesHelper(40)
      scene.add(axes)
    }
  }
  /**
   * 初始化侦听器
   */
  _initListeners () {
    // 缩放
    window.addEventListener('resize', this._onWindowResize.bind(this), false)
  }

  /**
   * 改变窗口大小
   */
  _onWindowResize () {
    // 窗口宽
    let width = this.width = window.width * this.perWidth
    // 窗口高
    let height = this.height = window.height * this.perHeight
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()

    this._renderer.setSize(width, height)
  }
  // 重置
  reset () {
    this.camera.position = this.cameraPos.copy()
    this.camera.lookAt(this.scene.position)
    this.resetControl()
  }
  // 更新
  update () {
    this._renderer.render(this.scene, this.camera)
    this.control && this.control.update()
  }
  /**
   * 初始化控制器
   */
  initControl () {
    if (!this.control) {
      // 控制器
      let controls = this.control = new THREE.OrbitControls(this.camera, this._renderer.domElement)
      controls.target.set(0, 0, 0)
      // control.enablePan = false
      // control.enab.1leDamping = false;
      // control.enableZoom = false;
      controls.maxDistance = 200
      controls.minDistance = 100
      controls.update()
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
  addModel (model) {
    this._modelContainer.add(model)
  }

  /**
   * 删除模型
   * @param child
   */
  removeModel (model) {
    this._modelContainer.remove(model)
  }

  /**
   * 删除所有模型
   */
  removeAllModels () {
    let child
    let children = this._modelContainer.children
    while (children.length) {
      child = children[0]
      this._modelContainer.remove(child)
    }
  }
}
