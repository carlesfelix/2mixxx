import { type ReactElement } from 'react'
import { type InputMultiSelectFieldProps } from './types'
import InputField from '@/components/atoms/InputField'
import classNames from 'classnames'
import {
  Controller,
  type FieldValues,
  type FieldPathValue
} from '@/core/core-hook-form'
import InputMultiSelect from '../InputMultiSelect'

export default function InputMultiSelectField<TFieldValues extends FieldValues> (props: InputMultiSelectFieldProps<TFieldValues>): ReactElement {
  const {
    inputProps,
    label,
    className,
    name,
    control,
    defaultValue = [] as FieldPathValue<TFieldValues, typeof name>,
    disabled,
    inputId
  } = props
  const rootClassName = classNames('c-input-multi-select-field', className)
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      disabled={disabled}
      inputId={inputId}
      render={({ field, showInputError, inputErrorMessage, id }) => {
        return (
          <InputField
            inputId={id}
            label={label}
            className={rootClassName}
            error={inputErrorMessage}
          >
            <InputMultiSelect
              {...inputProps}
              onChange={field.onChange}
              ref={field.ref}
              onBlur={field.onBlur}
              value={field.value}
              disabled={field.disabled}
              error={showInputError}
              id={id}
              className={classNames(inputProps.className, 'g-form__input-field')}
            />
          </InputField>
        )
      }}
    />
  )
}
