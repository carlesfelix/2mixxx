import { type FieldValues, type Path, useForm as useFormLib } from 'react-hook-form'
import { type UseFormProps, type UseFormReturn } from './types'
import { useEffect, useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFormConfigContext } from '../../contexts/form-config'
import { usePrevious } from '@/core/core-hooks'
import type schema from '../../services/schema'

export default function UseForm<
  TFieldValues extends FieldValues = FieldValues,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined
> (
  props: UseFormProps<TFieldValues, TContext>
): UseFormReturn<TFieldValues, TContext, TTransformedValues> {
  const { validator, ...baseProps } = props
  const [schema, setSchema] = useState<schema.ZodType<TFieldValues>>(() => validator())
  const previousSchema = usePrevious(schema)
  const { configBuilder } = useFormConfigContext()
  const resolver = useMemo(() => zodResolver(schema), [schema])
  const { trigger, formState, ...methods } = useFormLib<
  TFieldValues, TContext, TTransformedValues
  >({
    ...baseProps,
    resolver
  })
  const { errors } = formState
  useEffect(() => {
    const releaseOnRebuildSchemas = configBuilder.onRebuildSchemas(() => {
      setSchema(validator())
    })
    return () => {
      releaseOnRebuildSchemas()
    }
  }, [configBuilder, validator])

  useEffect(() => {
    if (previousSchema !== undefined && schema !== previousSchema) {
      const fieldNamesWithErrors = Object.keys(errors) as Array<Path<TFieldValues>>
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      fieldNamesWithErrors.length && trigger(fieldNamesWithErrors)
    }
  }, [errors, trigger, schema, previousSchema])

  return { ...methods, formState, trigger }
}
