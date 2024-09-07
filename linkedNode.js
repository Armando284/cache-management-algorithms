export default class LinkedNode {
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