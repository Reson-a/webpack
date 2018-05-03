/* global THREE */

import Scene from './scene'
import CONFIG from './config'
import gui from '@/js/datGUI'

let uid = 0
/**
 * 灯光工具类
 * @param scene    场景
 * @param gui      调试GUI
 */

export default class LightUtil {
  constructor (scene, options) {
    if (!(scene instanceof Scene)) return
    if (scene.lightUtil) return
    else scene.lightUtil = this
    this.scene = scene.scene
    uid++
    this._init()
  }
  _init () {
    this._initAmbientLight()
    this._initDirectionalLight()
  }
  /**
   * 初始化环境光
   */
  _initAmbientLight () {
    this.createAmientLight(0xffffff, 0.6)
  }

  /**
   * 创建环境光
   * @param color
   * @param intensity
   * @returns {*}
   */
  createAmientLight (color, intensity) {
    let ambientLight = this.ambientLight = new THREE.AmbientLight(color, intensity)
    this.scene.add(ambientLight)

    if (gui && CONFIG.isDebug) {
      let options = new function () {
        this.ambientColor = ambientLight.color
        this.ambientIntensity = ambientLight.intensity
      }()

      let folder = gui.addFolder('环境光' + uid)
      folder.addColor(options, 'ambientColor').onChange(function (e) {
        ambientLight.color = new THREE.Color(e)
      })
      folder.add(options, 'ambientIntensity', 0, 8).onChange(function (val) {
        ambientLight.intensity = val
      })
    }
  }

  /**
   * 初始化点光源
   */
  _initPointLight () {
    this.createPointLight(0xFFFFFF, 0.5, 15, 0, 0, 0, 1)
  }

  /**
   * 创建点光源
   * @param color
   * @param intensity
   * @param distance
   * @param x
   * @param y
   * @param z
   * @param index
   * @returns {*}
   */
  createPointLight (color, intensity, distance, x, y, z, index) {
    let light = new THREE.PointLight(color)
    light.intensity = intensity
    light.distance = distance
    light.position.set(x, y, z)
    this.scene.add(light)

    if (gui && CONFIG.isDebug) {
      let options = {
        'light color': light.color.getHex(),
        intensity: light.intensity,
        distance: light.distance,
        x: light.position.x,
        y: light.position.y,
        z: light.position.z
      }

      let folder = gui.addFolder('点光源' + uid + index)
      folder.addColor(options, 'light color').onChange(function (val) {
        light.color.setHex(val)
      })
      folder.add(options, 'intensity', 0, 20).onChange(function (val) {
        light.intensity = val
      })
      folder.add(options, 'distance', 0, 600).onChange(function (val) {
        light.distance = val
      })
      folder.add(options, 'x', -400, 400).onChange(function (val) {
        light.position.x = val
      })
      folder.add(options, 'y', -400, 400).onChange(function (val) {
        light.position.y = val
      })
      folder.add(options, 'z', -400, 400).onChange(function (val) {
        light.position.x = val
      })

      let lightHelper = new THREE.PointLightHelper(light)
      this.scene.add(lightHelper)
    }

    return light
  }

  /**
   * 初始化半球光
   */
  _initHemiLight () {
    this.createHemiLight(0xffffff, 0x000000, 0.6, 0, 50, 0)
  }

  /**
   * 创建半球光
   * @param skyColor
   * @param groudColor
   * @param intensity
   * @param x
   * @param y
   * @param z
   * @param index
   * @returns {*}
   */
  createHemiLight (skyColor, groudColor, intensity, x, y, z, index) {
    let light = new THREE.HemisphereLight(0xffffff, 0x000000, 0.6)
    light.position.set(x, y, z)
    this.scene.add(light)

    if (gui && CONFIG.isDebug) {
      let options = {
        'light color': light.color.getHex(),
        'ground color': light.color.getHex(),
        intensity: light.intensity,
        x: light.position.x,
        y: light.position.y,
        z: light.position.z
      }

      let folder = gui.addFolder('半球光' + uid)
      folder.addColor(options, 'light color').onChange(function (val) {
        light.color.setHex(val)
      })
      folder.addColor(options, 'ground color').onChange(function (val) {
        light.groundColor.setHex(val)
      })
      folder.add(options, 'intensity', 0, 20).onChange(function (val) {
        light.intensity = val
      })
      folder.add(options, 'x', 0, 400).onChange(function (val) {
        light.position.x = val
      })
      folder.add(options, 'y', 0, 400).onChange(function (val) {
        light.position.y = val
      })
      folder.add(options, 'z', 0, 400).onChange(function (val) {
        light.position.x = val
      })
    }
  }

  /**
   * 初始化平行光
   */
  _initDirectionalLight () {
    // 上
    this.createDirectionalLight(0.9, 40, 120, 80, '上')
    // 下
    this.createDirectionalLight(0.9, -40, -120, -80, '下')

    // 前
    // _createDirectionalLight(0.7, 0, 9, 40, '前' );
    // 后
    // _createDirectionalLight(0.8, 0, -9, -40, '后' );

    // 左
    // _createDirectionalLight(0.6, -len, 0, 0, '左' );
    // 右
    // _createDirectionalLight(0.6, len, 0, 0, '右' );
  }

  /**
   * 创建平行光
   * @param intensity
   * @param x
   * @param y
   * @param z
   * @param index
   */
  createDirectionalLight (intensity, x, y, z, index) {
    let light = new THREE.DirectionalLight('#FFFFFF', intensity)
    light.position.set(x, y, z)
    light.distance = 10
    this.scene.add(light)

    if (gui && CONFIG.isDebug) {
      let options = {
        'light color': light.color.getHex(),
        intensity: light.intensity,
        distance: light.distance,
        x: light.position.x,
        y: light.position.y,
        z: light.position.z
      }

      let folder = gui.addFolder('平行光' + uid + index)
      folder.addColor(options, 'light color').onChange(function (val) {
        light.color.setHex(val)
      })
      folder.add(options, 'intensity', 0, 10).onChange(function (val) {
        light.intensity = val
      })
      folder.add(options, 'distance', 0, 300).onChange(function (val) {
        light.distance = val
      })
      folder.add(options, 'x', -200, 200).onChange(function (val) {
        light.position.x = val
      })
      folder.add(options, 'y', -200, 200).onChange(function (val) {
        light.position.y = val
      })
      folder.add(options, 'z', -200, 200).onChange(function (val) {
        light.position.z = val
      })

      // let lightHelper = new THREE.DirectionalLightHelper(light);
      // this.scene.add(lightHelper);
    }

    return light
  }

  /**
   * 初始化聚光灯
   *
   */
  _initSpotLight () {
    this.createSpotLight('#646464', 8, 35, 60, 27, '上')
    this.createSpotLight('#646464', 8, -35, -60, -27, '下')
  }

  /**
   * 创建一个聚光灯
   * @param color
   * @param intensity
   * @param x
   * @param y
   * @param z
   * @param index
   * @returns {*}
   */
  createSpotLight (color, intensity, x, y, z, index) {
    let spotLight = new THREE.SpotLight(color, intensity)
    spotLight.position.set(x, y, z)
    spotLight.shadow.mapSize.width = 1024
    spotLight.shadow.mapSize.height = 1024
    spotLight.shadow.camera.near = 10
    spotLight.shadow.camera.far = 200
    spotLight.angle = 0.75
    spotLight.penumbra = 1
    spotLight.decay = 2
    spotLight.distance = 50
    spotLight.castShadow = true
    this.scene.add(spotLight)

    if (gui && CONFIG.isDebug) {
      let params = {
        'light color': spotLight.color.getHex(),
        intensity: spotLight.intensity,
        distance: spotLight.distance,
        angle: spotLight.angle,
        penumbra: spotLight.penumbra,
        decay: spotLight.decay,
        x: spotLight.position.x,
        y: spotLight.position.y,
        z: spotLight.position.z
      }

      let folder = gui.addFolder('聚光灯' + uid + index)

      folder.addColor(params, 'light color').onChange(function (val) {
        spotLight.color.setHex(val)
      })
      folder.add(params, 'intensity', 0, 40).onChange(function (val) {
        spotLight.intensity = val
      })
      folder.add(params, 'distance', 10, 300).onChange(function (val) {
        spotLight.distance = val
      })
      folder.add(params, 'angle', 0, Math.PI / 2).onChange(function (val) {
        spotLight.angle = val
      })
      folder.add(params, 'penumbra', 0, 1).onChange(function (val) {
        spotLight.penumbra = val
      })
      folder.add(params, 'decay', 1, 5).onChange(function (val) {
        spotLight.decay = val
      })
      folder.add(params, 'x', -300, 300).onChange(function (val) {
        spotLight.position.x = val
      })
      folder.add(params, 'y', -300, 300).onChange(function (val) {
        spotLight.position.y = val
      })
      folder.add(params, 'z', -300, 300).onChange(function (val) {
        spotLight.position.z = val
      })

      let spotLightHelper = new THREE.SpotLightHelper(spotLight)
      this.scene.add(spotLightHelper)
    }

    return spotLight
  }

  /// /////////////////////////////public////////////////////////////////

  setSpotLightParam (spotLight, density, x, y, z) {
    spotLight.intensity = density
    spotLight.position.set(x, y, z)
  }

  /**
   * 设置环境光光强
   * @param value
   */
  setAmbientLightIntensity (value) {
    if (this.ambientLight) this.ambientLight.intensity = value
  }
}
