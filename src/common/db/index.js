const db = {
  add(instance, value = {}) {
    let date = Date.now()
    let key = `${date}`
    instance.setItem(key, value)
  },
  allArr(instance, reverse = true) {
    return new Promise((resolve) => {
      let arr = []
      instance.iterate((value, key, id) => {
        arr.push({
          id: id,
          key: key,
          value: value
        })
      }).then(() => {
        if (reverse) {
          resolve(arr.reverse())
        } else {
          resolve(arr)
        }
      })
    });
  },
  allObj(instance) {
    return new Promise((resolve) => {
      let obj = {}
      instance.iterate((value, key) => {
        obj[key.toString()] = value
      }).then(() => {
        resolve(obj)
      })
    })
  },
  clear(instance) {
    return instance.clear()
  },
  get(instance, key) {
    return instance.getItem(key)
  },
  set(instance, key, value) {
    return instance.setItem(key, value)
  }
}

export default db