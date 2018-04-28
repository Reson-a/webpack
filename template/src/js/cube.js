/**
 *@author Reson_a
 *@date 2018.3.30
 */

/* global THREE */

const COLOR_MAP = {
  RED: 'static/models/cube_red.png',
  VIOLET: 'static/models/cube_violet.png',
  GREEN: 'static/models/cube_green.png',
  CYAN: 'static/models/cube_cyan.png',
  BLUE: 'static/models/cube_blue.png',
  PURPLE: 'static/models/cube_purple.png'
}
const COLORS = ['RED', 'VIOLET', 'GREEN', 'CYAN', 'BLUE', 'PURPLE']

const CUBE_FACES = {
  UP: 0,
  DOWN: 1, //
  LEFT: 4,
  RIGHT: 5,
  FRONT: 2, //
  BACK: 3
}

export default class Cube {
  constructor () {
    this.init()
  }
  init () {
    if (!Cube.model) {
      return
    }
    this.model = Cube.model.clone()
    this.reset()
  }

  // 设置位置
  setPos (pos = {}, vec) {
    if (vec) this.model.userData = vec
    // console.log(this.model)
    this.model.position.set(pos.x, pos.y, pos.z)
  }

  // 加载模型
  static async loadModel () {
    return new Promise((resolve, reject) => {
      var loader = new THREE.FBXLoader()
      loader.load('static/models/Cube.fbx', function (object) {
        Cube.model = object
        Cube.material = object.children[0].material
        resolve(object)
      }, () => {}, e => reject(e))
    })
  }

  // 获取颜色材质
  static getColorMaterial (color) {
    if (!Cube.materialMap) Cube.materialMap = {}
    let material = Cube.materialMap[color]
    if (material) return material
    material = Cube.material.clone()
    Cube.materialMap[color] = material
    // material.map = Cube.material.map.clone()
    let loader = new THREE.TextureLoader()
    loader.load(COLOR_MAP[color], texture => {
      material.map = texture
    })
    return material
  }

  // 设置颜色
  setColor (color) {
    // this.model.children[CUBE_FACES[face]].material = Cube.getColorMaterial(color)
    this.model.children.forEach(item => {
      // console.log(item)
      item.material = Cube.getColorMaterial(color)
    })
  }

  // 初始化
  reset () {
    this.visible = true
    // this.model.children.forEach(item => item.material = Cube.getColorMaterial('WHITE'))
    // this.model.children.forEach((item, index) => {
    //   item.material = Cube.getColorMaterial(COLORS[index])
    // })
  }

  // 重置某个面
  resetFace (face) {
    let index = CUBE_FACES[face]
    this.model.children[index].material = Cube.getColorMaterial(COLORS[index])
  }
  // 获取模型是否显示
  getVisible () {
    return this.model.visible
  }
  // 设置是否显示
  setVisible (val) {
    this.model.visible = val
  }
  // 保存显示状态
  saveVisible () {
    this.visible = this.model.visible
  }
  // 重载显示状态
  reloadVisible () {
    this.model.visible = this.visible
  }
  get enabled () {
    return this.model.visible
  }
}
