import {
  MODELS
} from '@/js/const'
import gui from '@/js/datGUI'

/* global THREE */

export default class ModelManager {
  constructor () {
    if (ModelManager.Instance) return ModelManager.Instance
    this.manager = new THREE.LoadingManager()
    this.loader = new THREE.FBXLoader(this.manager)
    ModelManager.Instance = this
  }
  // 加载模型
  async loadModel (config) {
    let model = config.model
    return new Promise((resolve, reject) => {
      if (model instanceof THREE.Object3D) {
        resolve(model)
      } else {
        if (config.isLoading) reject(new Error('该模型正在被加载'))
        config.isLoading = true
        this.loader.load(config.url, object => {
          config.isLoading = false
          if (object instanceof THREE.Object3D) {
            config.model = object
            resolve(object)
          } else reject(new Error('该模型不存在'))
        }, (event) => {
          this.onProgress && this.onProgress(event, config)
        }, err => reject(err))
      }
    })
  }
  // 按序列加载多个模型
  async loadModelsBySquence (arr) {
    return new Promise(async (resolve, reject) => {
      let res = []
      for (let item of arr) {
        let model = await this.loadModel(item).catch(err => reject(err))
        res.push(model)
      }
      resolve(res)
    })
  }
  // 加载多个模型
  async loadModels (arr) {
    return Promise.all(arr.map(item => this.loadModel(item)))
  }

  // 加载全部模型
  loadAll () {
    let models = Object.keys(MODELS).map(key => MODELS[key])
    return this.loadModelsBySquence(models)
  }

  onProgress () {

  }

  onError () {

  }

  // 解析模型
  static pasrseModel (object, cb) {
    object.traverse(child => {
      if (child instanceof THREE.Mesh) {
        cb && cb(child)
      }
    })
  }

  // 材质调试
  static meshDebug (mesh) {
    let material = mesh.material

    let options = {
      bumpScale: material.bumpScale, // 凹凸
      opacity: material.opacity, // 透明度
      specular: material.specular, // 高光颜色
      shininess: material.shininess, // 高光亮度 默认30
      emissive: material.emissive, // 默认 黑色
      ambient: material.color
    }

    let folder = gui.addFolder('材质' + mesh.name)
    folder.add(options, 'bumpScale', 0, 1).onChange(function (val) {
      material.bumpScale = val
    })
    folder.addColor(options, 'specular').onChange(function (val) {
      material.specular.setRGB(val.r / 255, val.g / 255, val.b / 255)
    })
    folder.add(options, 'shininess', 0, 50).onChange(function (val) {
      material.shininess = val
    })
    folder.addColor(options, 'emissive').onChange(function (val) {
      material.emissive.setRGB(val.r / 255, val.g / 255, val.b / 255)
    })
    folder.addColor(options, 'ambient').onChange(function (val) {
      material.color.setRGB(val.r / 255, val.g / 255, val.b / 255)
    })
    folder.add(options, 'opacity', 0, 1).onChange(function (val) {
      material.opacity = val
    })
  }
}
