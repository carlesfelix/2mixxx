import { ReactElement, useId } from 'react'
import { InputTextFieldProps } from './types'
import InputField from '@/components/atoms/InputField'
import classNames from 'classnames'
import InputText from '@/components/atoms/InputText'
import {
  Controller,
  FieldValues,
  FieldPathValue
} from '@/core/core-hook-form'

export default function InputTextField<TFieldValues extends FieldValues> (props: InputTextFieldProps<TFieldValues>): ReactElement {
  const {
    inputProps,
    label,
    className,
    name,
    control,
    defaultValue = '' as FieldPathValue<TFieldValues, typeof name>,
    disabled
  } = props
  const inputId = useId()
  const rootClassName = classNames('c-input-text-field', className)
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      disabled={disabled}
      render={({ field, showInputError, inputErrorMessage }) => {
        return (
          <InputField
            inputId={inputId}
            label={label}
            className={rootClassName}
            error={inputErrorMessage}
          >
            <InputText
              onChange={field.onChange}
              ref={field.ref}
              onBlur={field.onBlur}
              value={field.value}
              disabled={field.disabled}
              error={showInputError}
              {...inputProps}
            />
          </InputField>
        )
      }}
    />
  )
}
