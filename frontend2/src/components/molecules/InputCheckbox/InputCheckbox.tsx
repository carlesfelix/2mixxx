import { type ForwardedRef, forwardRef, type ReactElement, useId } from 'react'
import { type InputCheckboxProps } from './types'
import classNames from 'classnames'
import CheckIcon from '@/assets/svg/Check.svg?react'
import Text from '../../atoms/Text'
import './InputCheckbox.css'

function InputCheckboxWithRef (
  props: InputCheckboxProps,
  ref: ForwardedRef<HTMLInputElement>
): ReactElement {
  const {
    label,
    onChange,
    value,
    className,
    disabled,
    id,
    reverse,
    error,
    color = 'primary',
    labelClassName,
    labelSize
  } = props
  const idFallback = useId()
  const baseClassName = classNames(
    'c-input-checkbox',
    {
      'c-input-checkbox--disabled': disabled,
      'c-input-checkbox--reverse': reverse,
      'c-input-checkbox--error': error
    },
    `c-input-checkbox--${color}`,
    className
  )
  function changeHandler (event: React.ChangeEvent<HTMLInputElement>): void {
    onChange(event.currentTarget.checked)
  }
  const internalId = id ?? idFallback
  const nodes = [
    (
      <Text as="div" className="c-input-checkbox__container" key="checkbox-input">
        <div className="c-input-checkbox__custom-input g-input">
          <CheckIcon className="c-input-checkbox__custom-input-icon" />
        </div>
        <input
          className="c-input-checkbox__native-input"
          type="checkbox"
          id={internalId}
          onChange={changeHandler}
          disabled={disabled}
          checked={value}
          ref={ref}
        />
      </Text>
    ),
    (
      <label
        htmlFor={internalId}
        className={classNames('c-input-checkbox__label', labelClassName)}
        key="checkbox-label"
      >
        <Text size={labelSize}>{label}</Text>
      </label>
    )
  ]

  if (reverse) {
    nodes.reverse()
  }
  return (
    <div className={baseClassName}>
      {nodes.map(node => node)}
    </div>
  )
}

const InputCheckbox = forwardRef(InputCheckboxWithRef)

export default InputCheckbox
