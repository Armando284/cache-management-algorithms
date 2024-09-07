import LinkedNode from './linkedNode.js'
import DoubleLinkedList from './doubleLinkedList.js'

export default class LRU {
  constructor(size) {
    // Size of the cache
    this.size = size
    // Hash map for faster access to keys
    this.hash = new Map()
    // Sized doubly linked list for order management
    this.linkedList = new DoubleLinkedList()
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
