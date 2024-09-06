class LinkedNode {
  constructor(key, value) {
    this.key = key // For key search
    this.value = value
    // Needs pointer to prev and next since it will be doubly linked list 
    this.prev = null
    this.next = null
  }

  // Override to get values
  ToString(callback) {
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
  // Add node
  add(key, value) {
    // if list is empty
    if (this.head === null && this.tail === null) {
      this.head = new LinkedNode(key, value)
      this.tail = this.head
      return
    }

    // create new node ditached from list
    const node = new LinkedNode(key, value)
    // new node prev is equal to last element on list
    node.prev = this.tail
    // last element on list next is equal to new node
    this.tail.next = node
    // last element on list points to new node
    this.tail = node
  }

  // Remove node
  remove(key) { }

  // Remove all nodes
  removeAll() {
    this.head = null
    this.tail = null
  }

  // Get node by key
  get(key) { }

  // List all nodes
  list() { }

  // Update node value
  update(key, value) { }
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

  // Get data from cache
}