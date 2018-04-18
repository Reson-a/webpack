/* global THREE */

import * as Scene from './scene'
import CONFIG from './config'
import gui from '@/js/datGUI'

let _gui = gui

/**
 * 灯光工具类
 * @param scene    场景
 * @param gui      调试GUI
 */

let _initialized = false

let _scene

var ambientLight

/**
 * 初始化环境光
 */
function initAmbientLight (isDebug) {
  ambientLight = new THREE.AmbientLight(new THREE.Color(0xffffff), 0.6)
  _scene.add(ambientLight)

  if (_gui && isDebug) {
    let options = new function () {
      this.ambientColor = ambientLight.color
      this.ambientIntensity = ambientLight.intensity
    }()

    let folder = _gui.addFolder('环境光')
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
function initPointLight (toDebug) {
  if (toDebug === true) {
    toDebug = true
  } else {
    toDebug = false
  }

  createPointLight(toDebug, 0xFFFFFF, 0.5, 15, 0, 0, 0, 1)
}

/**
 * 创建点光源
 * @param toDebug
 * @param color
 * @param intensity
 * @param distance
 * @param x
 * @param y
 * @param z
 * @param index
 * @returns {*}
 */
function createPointLight (toDebug, color, intensity, distance, x, y, z, index) {
  var light = new THREE.PointLight(color)
  light.intensity = intensity
  light.distance = distance
  light.position.set(x, y, z)
  _scene.add(light)

  if (toDebug === true && _gui) {
    var options = {
      'light color': light.color.getHex(),
      intensity: light.intensity,
      distance: light.distance,
      x: light.position.x,
      y: light.position.y,
      z: light.position.z
    }

    var folder = _gui.addFolder('点光源' + index)
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

    var lightHelper = new THREE.PointLightHelper(light)
    _scene.add(lightHelper)
  }

  return light
}

/**
 * 初始化半球光
 */
function initHemiLight (toDebug) {
  if (toDebug === true) {
    toDebug = true
  } else {
    toDebug = false
  }

  var light = new THREE.HemisphereLight(0xffffff, 0x000000, 0.6)
  light.position.set(0, 50, 0)
  _scene.add(light)

  if (toDebug === true && _gui) {
    var options = {
      'light color': light.color.getHex(),
      'ground color': light.color.getHex(),
      intensity: light.intensity,
      x: light.position.x,
      y: light.position.y,
      z: light.position.z
    }

    var folder = _gui.addFolder('半球光')
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
 * @param toDebug 是否调试
 */
function initDirectionalLight (toDebug) {
  if (toDebug === true) {
    toDebug = true
  } else {
    toDebug = false
  }

  // let len = 40

  // 上
  createDirectionalLight(toDebug, 0.9, 40, 120, 80, '上')
  // 下
  createDirectionalLight(toDebug, 0.9, -40, -120, -80, '下')

  // 前
  // createDirectionalLight( toDebug, 0.7, 0, 9, 40, '前' );
  // 后
  // createDirectionalLight( toDebug, 0.8, 0, -9, -40, '后' );

  // 左
  // createDirectionalLight( toDebug, 0.6, -len, 0, 0, '左' );
  // 右
  // createDirectionalLight( toDebug, 0.6, len, 0, 0, '右' );
}

/**
 * 创建平行光
 * @param intensity
 * @param x
 * @param y
 * @param z
 * @param index
 */
function createDirectionalLight (toDebug, intensity, x, y, z, index) {
  var light = new THREE.DirectionalLight('#FFFFFF', intensity)
  light.position.set(x, y, z)
  light.distance = 10
  _scene.add(light)

  if (toDebug === true && _gui) {
    var options = {
      'light color': light.color.getHex(),
      intensity: light.intensity,
      distance: light.distance,
      x: light.position.x,
      y: light.position.y,
      z: light.position.z
    }

    var folder = _gui.addFolder('平行光' + index)
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

    // var lightHelper = new THREE.DirectionalLightHelper(light);
    // _scene.add(lightHelper);
  }

  return light
}

/**
 * 初始化聚光灯
 *
 */
function initSpotLight (toDebug) {
  if (toDebug === true) {
    toDebug = true
  } else {
    toDebug = false
  }

  // let len = 50
  // spotLight1 = createSpotLight(toDebug, '#FFFFFF',4,0,0,len,'前');
  // spotLight2 = createSpotLight(toDebug, '#FFFFFF',4,0,0,-len,'后');
  // spotLight3 = createSpotLight(toDebug, '#FFFFFF',4,-len,0,0,'左');
  // spotLight4 = createSpotLight(toDebug, '#FFFFFF',4,len,0,0,'右');

  createSpotLight(toDebug, '#646464', 8, 35, 60, 27, '上')
  createSpotLight(toDebug, '#646464', 8, -35, -60, -27, '下')
}

/**
 * 创建一个聚光灯
 * @param toDebug
 * @param color
 * @param intensity
 * @param x
 * @param y
 * @param z
 * @param index
 * @returns {*}
 */
function createSpotLight (toDebug, color, intensity, x, y, z, index) {
  var spotLight = new THREE.SpotLight(color, intensity)
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
  _scene.add(spotLight)

  if (toDebug === true && _gui) {
    var params = {
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

    var folder = _gui.addFolder('聚光灯' + index)

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

    var spotLightHelper = new THREE.SpotLightHelper(spotLight)
    _scene.add(spotLightHelper)
  }

  return spotLight
}

/// /////////////////////////////public////////////////////////////////

/**
 * 初始化灯光接口
 */
function init () {
  if (_initialized) {
    return
  }
  _initialized = true

  _scene = Scene.getScene()

  initAmbientLight(CONFIG.isDebug)
  initDirectionalLight(CONFIG.isDebug)
}

function setSpotLightParam (spotLight, density, x, y, z) {
  spotLight.intensity = density
  spotLight.position.set(x, y, z)
}

/**
 * 设置环境光光强
 * @param value
 */
function setAmbientLightIntensity (value) {
  ambientLight.intensity = value
}

export {
  init,
  setSpotLightParam,
  setAmbientLightIntensity,
  initAmbientLight,
  initDirectionalLight,
  initHemiLight,
  initPointLight,
  initSpotLight
}
