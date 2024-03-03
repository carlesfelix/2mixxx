import type IFormConfigBuilder from './IFormConfigBuilder'

export default class DefaultFormConfigBuilder implements IFormConfigBuilder {
  readonly #eventName = 'DefaultFormConfigBuilder__rebuildSchemas'
  readonly #rebuildSchemasEvent = new window.Event(this.#eventName)

  rebuildSchemas (): void {
    window.dispatchEvent(this.#rebuildSchemasEvent)
  }

  onRebuildSchemas (callback: () => void): () => void {
    window.addEventListener(this.#eventName, callback)
    return () => {
      window.removeEventListener(this.#eventName, callback)
    }
  }
}
