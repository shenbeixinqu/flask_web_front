/**
 * @description globelLocal操作
 */
class Local {
  constructor(name) {
    this.store = window.localStorage
    this.storeName = name
  }
  // 设置一个local
  set(key, value) {
    // 存储
    let storeData = this.store.getItem(this.storeName)
    if (!storeData) {
      this.init()
      storeData = this.store.getItem(this.storeName)
    }
    storeData = JSON.parse(storeData)
    storeData.data[key] = value
    this.store.setItem(this.storeName, JSON.stringify(storeData))
    return storeData.data
  }
  // 获取一个local
  get(key) {
    // 读取
    const result = this.getAll()
    if (!result) {
      return null
    }
    return result[key]
  }
  // 批量获取local
  batchGet() {
    const result = {}
    const allLocal = this.getAll()
    if (!allLocal) {
      return result
    }
    for (let i = 0; i < arguments.length; i++) {
      const item = arguments[i]
      result[item] = allLocal[item]
    }
    return result
  }
  // 获取全部
  getAll() {
    let storeData = this.store.getItem(this.storeName)
    if (!storeData) {
      return null
    }
    storeData = JSON.parse(storeData)
    return storeData.data
  }
  // 删除一个
  remove(key) {
    // 读取
    let storeData = this.store.getItem(this.storeName)
    if (!storeData) {
      return
    }
    storeData = JSON.parse(storeData)
    delete storeData.data[key]
    this.store.setItem(this.storeName, JSON.stringify(storeData))
    return storeData.data
  }
  // 清除
  clear() {
    // 清除对象
    this.store.removeItem(this.storeName)
  }
  // 初始化
  init() {
    this.store.setItem(this.storeName, '{"data":{}}')
  }
}
export default new Local('__global')

