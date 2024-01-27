import Joi, { ValidationOptions, Root } from 'joi'
import { useMemo } from 'react'

export default function useSchema (validationOptions: ValidationOptions = {}): Root {
  const schema = useMemo(() => {
    return Joi.defaults((schema) => {
      return schema.options(validationOptions)
    })
  }, [validationOptions])
  return schema
}
