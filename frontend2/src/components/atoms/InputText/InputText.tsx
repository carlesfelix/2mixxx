import type { ChangeEvent, ForwardedRef, ReactElement } from 'react'
import { forwardRef } from 'react'
import { type InputTextProps } from './types'
import classNames from 'classnames'

function InputTextWithRef (
  props: InputTextProps,
  ref: ForwardedRef<HTMLInputElement>
): ReactElement {
  const { value, onChange, disabled, className, id } = props

  function changeHandler (event: ChangeEvent<HTMLInputElement>): void {
    onChange && onChange(event.target.value)
  }

  const rootClassName = classNames('c-input-text', 'g-input', 'g-hide-default-focus-ring', className)

  return (
    <input
      autoComplete="off"
      id={id}
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
