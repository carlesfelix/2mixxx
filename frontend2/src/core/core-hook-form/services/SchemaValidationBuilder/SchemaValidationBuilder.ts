import ISchemaValidationBuilder from './ISchemaValidationBuilder'
import { LoadErrorMessagesReturn, SchemaValidationBuilderOptions } from './types'

export default class SchemaValidationBuilder implements ISchemaValidationBuilder<SchemaValidationBuilderOptions> {
  #loadErrorMessages: (
    options: SchemaValidationBuilderOptions
  ) => LoadErrorMessagesReturn

  constructor (
    loadErrorMessages: (
      options: SchemaValidationBuilderOptions
    ) => LoadErrorMessagesReturn = async () => await Promise.resolve(false)
  ) {
    this.#loadErrorMessages = loadErrorMessages
  }

  async loadErrorMessages (
    options: SchemaValidationBuilderOptions
  ): LoadErrorMessagesReturn {
    return await this.#loadErrorMessages(options)
  }
}
