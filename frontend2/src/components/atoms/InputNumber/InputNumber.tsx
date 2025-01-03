import type { ChangeEvent, ForwardedRef, ReactElement } from 'react'
import { forwardRef } from 'react'
import { type InputNumberProps } from './types'
import classNames from 'classnames'

function InputNumberWithRef (
  props: InputNumberProps,
  ref: ForwardedRef<HTMLInputElement>
): ReactElement {
  const { value, onChange, disabled, className, id } = props

  function changeHandler (event: ChangeEvent<HTMLInputElement>): void {
    onChange && onChange(event.target.valueAsNumber || 0)
  }

  const rootClassName = classNames('c-input-number', 'g-input', 'g-hide-default-focus-ring', className)

  return (
    <input
      autoComplete="off"
      id={id}
      ref={ref}
      className={rootClassName}
      type="number"
      value={value}
      onChange={changeHandler}
      disabled={disabled}
    />
  )
}

const InputNumber = forwardRef(InputNumberWithRef)
export default InputNumber
