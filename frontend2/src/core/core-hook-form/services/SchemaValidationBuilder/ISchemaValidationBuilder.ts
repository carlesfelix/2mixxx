import { LoadErrorMessagesReturn } from './types'

export default interface ISchemaValidationBuilder<TOptions> {
  loadErrorMessages: (options: TOptions) => LoadErrorMessagesReturn
}
