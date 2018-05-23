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

  /** 回收 item
   * @param  {(Object|Object[])} item item可以为数组
   * @param  {Boolean} isAll 默认只回收非enabled  isAll 为 true 则强制回收全部
   * @return {(Object|Object[])} 未被回收的项
   */
  recover (item, isAll) {
    if (item instanceof Array) {
      let res = []
      for (let i = item.length - 1; i >= 0; i--) {
        let o = item[i]
        if (!o.enabled || isAll) {
          this.pool.push(o)
        } else res.push(o)
      }
      return res
    } else if (!item.enabled || isAll) {
      this.pool.push(item)
      return null
    } else return item
  }
  clear () {
    this.pool = []
  }
}
