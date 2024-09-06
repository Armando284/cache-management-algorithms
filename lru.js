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

  get _isListEmpty() {
    return this.head === null && this.tail === null
  }

  // Add node
  add(key, value) {
    // if list is empty
    if (this._isListEmpty) {
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
  remove(key) {
    if (this._isListEmpty) {
      return
    }

    let node = this.head

    // Head case
    if (this.head && this.head.key === key) {
      // Clean head next prev value
      this.head.next.prev = null
      // Makes head next the new head
      this.head = this.head.next
      return
    }

    // Tail case
    if (this.tail && this.tail.key === key) {
      node = this.tail // just for loggin
      // Clean tail prev next value
      this.tail.prev.next = null
      // Makes tail prev the new tail
      this.tail = this.tail.prev
      return
    }

    node = this.head.next
    do {
      if (node.key === key) {
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
      node = node.next
    } while (node && node.next !== null);

  }

  // Remove all nodes
  removeAll() {
    this.head = null
    this.tail = null
  }

  // Get node value by key
  get(key) {
    if (this._isListEmpty) {
      return
    }

    let node = this.head

    // Head case
    if (this.head && this.head.key === key) {
      return this.head.value
    }

    // Tail case
    if (this.tail && this.tail.key === key) {
      node = this.tail // just for loggin
      return this.tail.value
    }

    node = this.head.next
    do {
      if (node.key === key) {
        // early exits from loop
        return node.value
      }
      node = node.next
    } while (node && node.next !== null);

  }

  // List all nodes
  *list() {
    let node = this.head

    do {
      yield node.value
      node = node.next
    } while (node && node.next !== null);
  }

  // Update node value
  update(key, value) {
    if (this._isListEmpty) {
      return
    }

    let node = this.head

    // Head case
    if (this.head && this.head.key === key) {
      node.value = value
      return this.head.value
    }

    // Tail case
    if (this.tail && this.tail.key === key) {
      node = this.tail // just for 
      node.value = value
      return this.tail.value
    }

    node = this.head.next
    do {
      if (node.key === key) {
        // early exits from loop
        node.value = value
        return node.value
      }
      node = node.next
    } while (node && node.next !== null);

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

  // Get data from cache
}



