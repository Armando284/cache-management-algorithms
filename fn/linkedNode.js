function LinkedNode(key, value) {
  let [_prev, _next] = [null, null]
  return {
    get key() {
      return key
    },
    get value() {
      return value
    },
    get prev() { return _prev },
    set prev(newPrev) {
      _prev = newPrev
      return _prev
    },
    get next() { return _next },
    set next(newNext) {
      _next = newNext
      return _next
    },
    toString(callback) {
      return callback === undefined ? `{${key}: ${value}}` : callback(key, value)
    }
  }
}