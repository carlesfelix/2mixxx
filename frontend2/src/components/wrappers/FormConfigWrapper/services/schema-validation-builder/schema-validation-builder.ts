import { SchemaValidationBuilder, SchemaValidationBuilderOptions } from '@/core/core-hook-form'

async function loadErrorMessages (
  options: SchemaValidationBuilderOptions
): Promise<Record<string, string>> {
  return await import(
    `../../../../../locales/${options.language}/default-form-messages.json`
  ).then(({ default: messages }) => {
    return messages as Record<string, string>
  })
}

const schemaValidationBuilder = new SchemaValidationBuilder(loadErrorMessages)

export default schemaValidationBuilder
