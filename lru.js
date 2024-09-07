import LinkedNode from './linkedNode.js'
import DoubleLinkedList from './doubleLinkedList.js'

export default class LRU {
  /**
   * Last Recently Used.
   * Every new item added will go to the head of the list.
   * If the list is full when adding a new item, the last element on the list will be deleted.
   * Every time an item is requested (get method) it passes to the front of the list.
   * @param {number} size The max size of the list.
   */
  constructor(size) {
    // Size of the cache
    this.size = size
    // Hash map for faster access to keys
    this.hash = new Map()
    // Sized doubly linked list for order management
    this.linkedList = new DoubleLinkedList()
  }

  /**
   * Push new item into the list. 
   * If the list is full the new item will be added to the head and last item on the list will be deleted.
   * @param {number | string} key item id key.
   * @param {any} value item value.
   * @returns items list.
   */
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

  /**
   * Get item value from the list.
   * Each time an item is readed it passes to the front of the list. 
   * Items that haven't been visited go to the back of the list.
   * @param {number | string} key 
   * @returns {any | null} node value or null if not found.
   */
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

  /**
   * Overrides class toString method.
   * @returns lists evey pair of key: value.
   */
  toString() {
    let result = ''
    for (const node of this.linkedList.list()) {
      result = result + `${node.key}: ${node.value}, `
    }
    return result
  }
}
