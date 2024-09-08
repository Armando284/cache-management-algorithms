/**
 * Node with links for previous and next nodes.
 * @param { number | string } key Node id for search.
 * @param { any } value Node value.
 */
export default function LinkedNode(key, value) {
  let [prev, next] = [null, null]

  return {
    get key() { return key },
    get value() { return value },
    prev,
    next,
    /**
     * Overrides object toString method.
     * Allows callback for more customization.
     * @param { ( value: any ) => void } callback 
     * @returns 
     */
    toString(callback) {
      return callback === undefined ? `{${key}: ${value}}` : callback(key, value)
    }
  }
}