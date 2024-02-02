import schema from './schema'

export function valueToUndefined <TValueAsUndefined extends schema.Primitive> (
  valueAsUndefined: TValueAsUndefined
): schema.ZodEffects<schema.ZodLiteral<TValueAsUndefined>, undefined, TValueAsUndefined> {
  return schema.literal(valueAsUndefined).transform(() => undefined)
}

export function asOptionalField <
  TSchema extends schema.ZodTypeAny, TValueAsUndefined extends schema.Primitive
> (schema: TSchema, valueAsUndefined: TValueAsUndefined): schema.ZodUnion<[
  schema.ZodOptional<TSchema>,
  schema.ZodEffects<schema.ZodLiteral<TValueAsUndefined>, undefined, TValueAsUndefined>
]> {
  return schema.optional().or(valueToUndefined(valueAsUndefined))
}

export function asOptionalTextField <TSchema extends schema.ZodString> (schema: TSchema): schema.ZodUnion<[
  schema.ZodOptional<TSchema>,
  schema.ZodEffects<schema.ZodLiteral<string>, undefined, string>
]> {
  return asOptionalField(schema, '')
}
