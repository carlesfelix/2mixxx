import { type ForwardedRef, forwardRef, type ReactElement, useId } from 'react'
import { type InputMultiSelectBoxProps } from './types'
import classNames from 'classnames'
import InputCheckbox from '../InputCheckbox'
import type InputOption from '@/types/InputOption'
import { type BaseInputProps } from '@/core/core-hook-form'
import './InputMultiSelectBox.css'

function InputMultiSelectBoxWithRef (
  props: InputMultiSelectBoxProps,
  ref: ForwardedRef<HTMLInputElement>
): ReactElement {
  const {
    onChange,
    options,
    value,
    className,
    disabled,
    error,
    id,
    optionLabelSize,
    color,
    reverse
  } = props

  const idFallback = useId()
  const internalId = id ?? idFallback

  function changeHandler (option: InputOption): BaseInputProps<boolean>['onChange'] {
    return (checkboxValue) => {
      if (checkboxValue) {
        onChange(value.concat(option.value))
      } else {
        onChange(value.filter((eachValue) => eachValue !== option.value))
      }
    }
  }
  const baseClassName = classNames(
    'c-input-multi-select-box',
    {
      'c-input-multi-select-box--error': error
    },
    className
  )
  return (
    <ul className={baseClassName}>
      {
        options.map((option, iOption) => (
          <li key={option.value} className='c-input-multi-select-box__option'>
            <InputCheckbox
              className='c-input-multi-select-box__checkbox-option'
              labelClassName='c-input-multi-select-box__checkbox-option-label'
              ref={iOption === 0 ? ref : undefined}
              id={iOption === 0 ? internalId : undefined}
              label={option.label}
              value={value.includes(option.value)}
              onChange={changeHandler(option)}
              disabled={disabled}
              labelSize={optionLabelSize}
              color={color}
              reverse={reverse}
            />
          </li>
        ))
      }
    </ul>
  )
}

const InputMultiSelectBox = forwardRef(InputMultiSelectBoxWithRef)
export default InputMultiSelectBox
