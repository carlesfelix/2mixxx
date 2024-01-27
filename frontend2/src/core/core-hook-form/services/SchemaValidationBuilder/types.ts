export interface SchemaValidationBuilderOptions {
  language: string
}

export type LoadErrorMessagesReturn = Promise<Record<string, string> | false>
