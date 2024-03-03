import type { ChangeEvent, ForwardedRef, ReactElement } from 'react'
import { forwardRef } from 'react'
import { type InputTextProps } from './types'
import classNames from 'classnames'
import './InputText.css'

function InputTextWithRef (
  props: InputTextProps,
  ref: ForwardedRef<HTMLInputElement>
): ReactElement {
  const { value, onChange, disabled, className } = props

  function changeHandler (event: ChangeEvent<HTMLInputElement>): void {
    onChange && onChange(event.target.value)
  }

  const rootClassName = classNames('c-input-text', className)

  return (
    <input
      ref={ref}
      className={rootClassName}
      type="text"
      value={value}
      onChange={changeHandler}
      disabled={disabled}
    />
  )
}

const InputText = forwardRef(InputTextWithRef)
export default InputText
