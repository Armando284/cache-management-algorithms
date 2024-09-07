class LinkedNode {
  constructor(key, value) {
    this.key = key // For key search
    this.value = value
    // Needs pointer to prev and next since it will be doubly linked list
    this.prev = null
    this.next = null
  }

  // Override to get values
  toString(callback) {
    return callback ? callback(this.value) : JSON.stringify(this.value)
  }
}

class DoublyLinkedList {
  // Head
  // Tail
  constructor() {
    this.head = null
    this.tail = null
  }

  get _isListEmpty() {
    return this.head === null && this.tail === null
  }

  // Finds node by key
  _findNode(key) {
    if (this._isListEmpty) {
      return null
    }

    // Head case
    if (this.head && this.head.key === key) {
      return this.head
    }

    // Tail case
    if (this.tail && this.tail.key === key) {
      return this.tail
    }

    let node = this.head.next
    do {
      if (node.key === key) {
        // early exits from loop
        return node
      }
      node = node.next
    } while (node !== null)

    return null
  }

  // Add node
  add(node) {
    // if list is empty
    if (this._isListEmpty) {
      this.head = node
      this.tail = this.head
      return
    }

    // new node prev is equal to * LASt * element on list
    node.prev = this.tail
    // last element next points to new node
    this.tail.next = node
    // tail points to new node
    this.tail = node
  }

  // Add node, lru needs nodes to be added to head
  addToHead(node) {
    // if list is empty
    if (this._isListEmpty) {
      this.head = node
      this.tail = this.head
      return
    }

    // new node next is equal to * FIRST * element on list
    node.next = this.head
    // first element prev points to new node
    this.head.prev = node
    // head points to new node
    this.head = node
  }

  // Remove node
  remove(key) {
    if (this._isListEmpty) {
      return
    }

    const node = this._findNode(key)

    if (node === null) {
      return
    }

    // Head case
    if (node === this.head) {
      // Clean head next prev value
      this.head.next.prev = null
      // Makes head next the new head
      this.head = this.head.next
      return
    }

    // Tail case
    if (node === this.tail) {
      // Clean tail prev next value
      this.tail.prev.next = null
      // Makes tail prev the new tail
      this.tail = this.tail.prev
      return
    }

    // prev node next value points to node next node
    if (node.prev !== null) {
      node.prev.next = node.next
    }
    // next node prev value points to node prev node
    if (node.next !== null) {
      node.next.prev = node.prev
    }
    // early exits from loop
    return
  }

  removeTail() {
    // Clean tail prev next value
    this.tail.prev.next = null
    // Makes tail prev the new tail
    this.tail = this.tail.prev
    // return new tail
    return this.tail
  }

  // Remove all nodes
  removeAll() {
    this.head = null
    this.tail = null
  }

  // Get node value by key
  getValue(key) {
    if (this._isListEmpty) {
      return null
    }

    const node = this._findNode(key)

    return node === null ? null : node.value
  }

  // List all nodes
  *list() {
    let node = this.head

    do {
      yield node
      node = node.next
    } while (node !== null)
  }

  // Update node value
  update(key, value) {
    if (this._isListEmpty) {
      return null
    }

    const node = this._findNode(key)

    if (node === null) {
      return null
    }

    node.value = value

    return node
  }
}

class LRU {
  constructor(size) {
    // Size of the cache
    this.size = size
    // Hash map for faster access to keys
    this.hash = new Map()
    // Sized doubly linked list for order management
    this.linkedList = new DoublyLinkedList()
  }

  // Push data into cache
  push(key, value) {
    if (this.hash.has(key)) {
      this.linkedList.remove(key)
    }

    const node = new LinkedNode(key, value)
    this.linkedList.addToHead(node)
    this.hash.set(key, node)
    if (this.hash.size > this.size) {
      this.hash.delete(this.linkedList.tail.key)
      this.linkedList.removeTail()
    }
    return this.linkedList
  }

  // Get data from cache
  get(key) {
    if (!this.hash.has(key)) {
      return null
    }

    const node = this.hash.get(key)
    if (node !== this.linkedList.head) {
      this.linkedList.remove(key)
      this.linkedList.addToHead(node)
    }

    return node.value
  }

  // helper to log
  toString() {
    let result = ''
    for (const node of this.linkedList.list()) {
      result = result + `${node.key}: ${node.value}, `
    }
    return result
  }
}

const cache = new LRU(3)

cache.push(1, 'one')
console.log(`${cache}`)
console.log('-------------')
cache.push(2, 'two')
console.log(`${cache}`)
console.log('-------------')
cache.push(3, 'three')
console.log(`${cache}`)
console.log('-------------')
cache.get(1)
console.log(`${cache}`)
console.log('-------------')
cache.push(4, 'four')
console.log(`${cache}`)
console.log('-------------')
cache.get(2)
console.log(`${cache}`)
console.log('-------------')
cache.get(3)
console.log(`${cache}`)
console.log('-------------')
cache.push(5, 'five')
console.log(`${cache}`)
console.log('-------------')
