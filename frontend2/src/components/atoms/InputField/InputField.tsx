import { ForwardedRef, ReactElement, forwardRef } from 'react'
import { InputFieldProps } from './types'
import classNames from 'classnames'
import './InputField.css'

function InputFieldWithRef (
  props: InputFieldProps,
  ref: ForwardedRef<HTMLDivElement>
): ReactElement {
  const { children, className, inputId, label, error } = props
  const rootClassName = classNames('c-input-field', className)
  return (
    <div className={rootClassName} ref={ref}>
      <label htmlFor={inputId}>{label}</label>
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
