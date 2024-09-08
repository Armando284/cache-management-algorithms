import LinkedNode from "./linkedNode.js"

/**
   * Double Linked List.
   * Includes list of nodes with pointers to previous and next node in the list.
   * Includes head node of the list and tail (last) node of the list.
   */
export default function DoubleLinkedList() {
  let [head, tail] = [null, null]

  /**
   * Private.
   * @returns {boolean} true if the list is empty. 
   */
  const isListEmpty = () => (head === null && tail === null)

  /**
   * Private.
   * Finds node by key.
   * @param { number | string } key Node id key.
   * @returns { LinkedNode | null } Node or null if node it's not found.
   */
  const findNode = (key) => {
    if (isListEmpty()) {
      return null
    }

    if (head?.key === key) {
      return head
    }

    if (tail?.key === key) {
      return tail
    }

    let node = head.next
    do {
      if (node.key === key) {
        return node
      }
      node = node.next
    } while (node !== null);
  }

  /**
   * Adds node to the tail of the list.
   * @param { LinkedNode } node New node to add.
   * @returns 
   */
  const add = (node) => {
    if (isListEmpty()) {
      head = node
      tail = head
      return
    }

    node.prev = tail
    tail.next = node
    tail = node
  }

  /**
     * Adds node to the head of the list.
     * @param { LinkedNode } node New node to add.
     * @returns 
     */
  const addToHead = (node) => {
    if (isListEmpty()) {
      head = node
      tail = head
      return
    }

    node.next = head
    head.prev = node
    head = node
  }

  /**
   * Removes node from the list by key
   * @param {number | string} key Node id key.
   * @returns 
   */
  const remove = (key) => {
    if (isListEmpty()) {
      return
    }

    const node = findNode(key)

    if (node === null) {
      return
    }

    if (node === head) {
      head.next.prev = null
      head = head.next
      return
    }

    if (node === tail) {
      tail.prev.next = null
      tail = tail.prev
      return
    }

    if (node.prev !== null) {
      node.prev.next = node.next
    }
    if (node.next !== null) {
      node.next.prev = node.prev
    }

    return
  }

  /**
   * Removes list last item (tail).
   * @returns { LinkedNode } New tail.
   */
  const removeTail = () => {
    tail.prev.next = null
    tail = tail.prev
    return tail
  }

  /**
   * Removes all items from the list.
   */
  const removeAll = () => {
    head = null
    tail = null
  }

  /**
   * Gets node value by key.
   * @param { number | string } key Node's id key.
   * @returns { any | null } Node value or null if not found.
   */
  const getValue = (key) => {
    if (isListEmpty()) {
      return null
    }

    const node = findNode(key)

    return node === null ? null : node.value
  }

  /**
   * Generator that returns every node in the list.
   */
  function* list() {
    let node = head

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
  const update = (key, value) => {
    if (isListEmpty()) {
      return null
    }

    const node = findNode(key)

    if (node === null) {
      return null
    }

    node.value = value

    return node
  }

  return {
    head,
    tail,
    add,
    addToHead,
    remove,
    removeTail,
    removeAll,
    getValue,
    list,
    update,
    /**
     * Overrides list toString method.
     * @param { (list: Generator) => string } callback 
     * @returns { string }
     */
    toString: (callback) => {
      if (callback !== undefined) {
        return callback(list())
      }
      let response = ''
      for (const node of list()) {
        response += `${node}`
      }
      return response
    }
  }

} 