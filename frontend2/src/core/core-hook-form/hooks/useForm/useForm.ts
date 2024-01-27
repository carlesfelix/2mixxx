import { FieldValues, Path, useForm as useFormLib } from 'react-hook-form'
import { UseFormProps, UseFormReturn } from './types'
import { useEffect, useMemo } from 'react'
import { joiResolver } from '@hookform/resolvers/joi'
import { usePrevious } from '@/core/core-hooks'
import { useFormConfigContext } from '../../contexts/form-config'

export default function UseForm<
  TFieldValues extends FieldValues = FieldValues,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined
> (
  props: UseFormProps<TFieldValues, TContext>
): UseFormReturn<TFieldValues, TContext, TTransformedValues> {
  const { validator, ...baseProps } = props
  const { schema } = useFormConfigContext()
  const prevRootSchema = usePrevious(schema)
  const resolver = useMemo(() => joiResolver(validator(schema)), [schema, validator])
  const { trigger, formState, ...methods } = useFormLib<
  TFieldValues, TContext, TTransformedValues
  >({
    ...baseProps,
    resolver
  })
  const { errors } = formState
  useEffect(() => {
    if (prevRootSchema !== schema && prevRootSchema !== undefined) {
      const fieldNamesWithErrors = Object.keys(errors) as Array<Path<TFieldValues>>
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      fieldNamesWithErrors.length && trigger(fieldNamesWithErrors)
    }
  }, [prevRootSchema, schema, trigger, errors])

  return { ...methods, formState, trigger }
}
