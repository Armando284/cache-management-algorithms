import LinkedNode from "./linkedNode"

export default class DoubleLinkedList {
  /**
   * Double Linked List.
   * Includes list of nodes with pointers to previous and next node in the list.
   * Includes head node of the list and tail (last) node of the list.
   */
  constructor() {
    this.head = null
    this.tail = null
  }

  /**
   * Private.
   * @returns {boolean} true if the list is empty. 
   */
  get _isListEmpty() {
    return this.head === null && this.tail === null
  }

  // Finds node by key
  /**
   * Private.
   * Finds node by key.
   * @param { number | string } key Node id key.
   * @returns { LinkedNode | null } Node or null if node it's not found.
   */
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

  /**
   * Adds node to the tail of the list.
   * @param { LinkedNode } node New node to add.
   * @returns 
   */
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

  /**
   * Adds node to the head of the list.
   * @param { LinkedNode } node New node to add.
   * @returns 
   */
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

  /**
   * Removes node from the list by key
   * @param {number | string} key Node id key.
   * @returns 
   */
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

  /**
   * Removes list last item (tail).
   * @returns { LinkedNode } New tail.
   */
  removeTail() {
    // Clean tail prev next value
    this.tail.prev.next = null
    // Makes tail prev the new tail
    this.tail = this.tail.prev
    // return new tail
    return this.tail
  }

  /**
   * Removes all items from the list.
   */
  removeAll() {
    this.head = null
    this.tail = null
  }

  /**
   * Gets node value by key.
   * @param { number | string } key Node's id key.
   * @returns { any | null } Node value or null if not found.
   */
  getValue(key) {
    if (this._isListEmpty) {
      return null
    }

    const node = this._findNode(key)

    return node === null ? null : node.value
  }

  /**
   * Generator that returns every node in the list.
   */
  *list() {
    let node = this.head

    do {
      yield node
      node = node.next
    } while (node !== null)
  }

  /**
   * Updates node value by it's key.
   * @param { number | string } key Node's id key.
   * @param { any } value Node's new value.
   * @returns { LinkedNode | null } Updated node or null if node is not found.
   */
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