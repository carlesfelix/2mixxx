import { ReactNode } from 'react'
import { ISchemaValidationBuilder } from '../../services/SchemaValidationBuilder'
import { Root } from 'joi'

export interface FormConfigProviderProps<TSchemaOptions> {
  children: ReactNode
  schemaValidationBuilder: ISchemaValidationBuilder<TSchemaOptions>
  schemaOptions: TSchemaOptions
  fallback?: ReactNode
}

export interface FormConfigContextValue {
  schema: Root
}
