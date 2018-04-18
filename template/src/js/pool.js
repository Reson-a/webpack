/**
 *@author Reson_a
 *@deprecated Simple ObjectPool
 *@date 2018.4.1
 */

export default class Pool {
  constructor (func, ...args) {
    this.func = func
    this.args = args
    this.pool = []
  }
  // 获取一个物体
  getItem () {
    let Func = this.func
    let item = this.pool.pop()
    if (!item) item = new Func(this.args)
    return item
  }
  // 回收
  recover (item) {
    if (item instanceof Array) this.pool.push(...item)
    else this.pool.push(item)
  }
  clear () {
    this.pool = []
  }
}
