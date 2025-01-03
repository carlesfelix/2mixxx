import { type ReactElement } from 'react'
import { type InputCheckboxFieldProps } from './types'
import InputField from '@/components/atoms/InputField'
import classNames from 'classnames'
import {
  Controller,
  type FieldValues,
  type FieldPathValue
} from '@/core/core-hook-form'
import InputCheckbox from '@/components/molecules/InputCheckbox'

export default function InputCheckboxField<TFieldValues extends FieldValues> (props: InputCheckboxFieldProps<TFieldValues>): ReactElement {
  const {
    inputProps,
    className,
    name,
    control,
    defaultValue = false as FieldPathValue<TFieldValues, typeof name>,
    disabled,
    inputId
  } = props
  const rootClassName = classNames('c-input-checkbox-field', className)
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
            label={false}
            className={rootClassName}
            error={inputErrorMessage}
          >
            <InputCheckbox
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
