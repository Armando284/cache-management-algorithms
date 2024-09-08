export default class LinkedNode {
  #key
  #value

  /**
   * Node with links for previous and next nodes.
   * @param { number | string } key Node id for search.
   * @param { any } value Node value.
   */
  constructor(key, value) {
    this.#key = key
    this.#value = value
    this.prev = null
    this.next = null
  }

  get key() { return this.#key }

  get value() { return this.#value }

  /**
   * Overrides class toString method.
   * Allows callback for more customization.
   * @param { ( value: any ) => void } callback 
   * @returns 
   */
  toString(callback) {
    return callback ? callback(this.value) : JSON.stringify(this.value)
  }
}