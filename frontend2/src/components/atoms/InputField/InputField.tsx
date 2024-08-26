import type { ForwardedRef, ReactElement } from 'react'
import { forwardRef } from 'react'
import { type InputFieldProps } from './types'
import classNames from 'classnames'
import './InputField.css'
import Text from '../Text'

function InputFieldWithRef (
  props: InputFieldProps,
  ref: ForwardedRef<HTMLDivElement>
): ReactElement {
  const { children, className, inputId, label, error } = props
  const rootClassName = classNames('c-input-field', className)
  return (
    <div className={rootClassName} ref={ref}>
      <Text size="small" as="span" weight="semi-bold">
        <label htmlFor={inputId} className="c-input-field__label">{label}</label>
      </Text>
      <div className="c-input-field__input-container">
        {children}
      </div>
      {
        error && (
          <div className="c-input-field__error-container">
            {error}
          </div>
        )
      }
    </div>
  )
}

const InputField = forwardRef(InputFieldWithRef)
export default InputField
