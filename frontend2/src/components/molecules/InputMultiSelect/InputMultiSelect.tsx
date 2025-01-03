import { forwardRef, type ReactElement, type ForwardedRef, useState } from 'react'
import { type InputMultiSelectProps } from './types'
import { useInternalInstance } from '@/core/core-hooks'
import classNames from 'classnames'
import { KEY_CODES, matchKeyboardKeyFilter } from '@/core/core-keyboard'
import { Popover } from '@/core/core-popover'
import { popoverContainer } from '@/modules/popover'
import InputMultiSelectBox from '../InputMultiSelectBox'
import IconButton from '@/components/atoms/IconButton'
import CloseIcon from '@/assets/svg/Close.svg?react'
import './InputMultiSelect.css'
import { FocusContainer } from '@/core/core-focus'

function InputMultiSelectWithRef (
  props: InputMultiSelectProps,
  ref: ForwardedRef<HTMLInputElement>
): ReactElement {
  const {
    onChange,
    value,
    disabled = false,
    error,
    className,
    id,
    options,
    placeholder,
    color,
    reverse
  } = props
  const [isOpen, setIsOpen] = useState(false)
  const [floatingElement, setFloatingElement] = useState<HTMLDivElement | null>(null)
  const [inputElementRefCallback, inputElement] = useInternalInstance(ref)

  function inputClickHandler (): void {
    setIsOpen(old => !old)
  }

  function inputKeydownHandler (event: React.KeyboardEvent<HTMLInputElement>): void {
    if (matchKeyboardKeyFilter(event, { code: KEY_CODES.Enter })) {
      event.preventDefault()
      setIsOpen(true)
    }
  }

  function closeHandler (): void {
    setIsOpen(false)
  }

  const optionValueTexts = value.map(eachValue => {
    const optionValue = options.find(option => option.value === eachValue)
    if (!optionValue) {
      return ''
    }
    if (optionValue.textLabel) {
      return optionValue.textLabel
    }
    if (typeof optionValue.label === 'string') {
      return optionValue.label
    }
    return ''
  })
  const optionValueSummary = optionValueTexts.slice(0, 10).join(', ')

  const rootClassName = classNames('c-input-multi-select', {
    'c-input-multi-select--error': error
  }, className)
  const inputContainerClassName = classNames(rootClassName, 'c-input-multi-select--input-text-container')
  const optionsClassName = classNames(rootClassName, 'g-overlay', 'c-input-multi-select--options')
  return (
    <>
      <div className={inputContainerClassName}>
        <input
          readOnly
          disabled={disabled}
          className="g-input c-input-multi-select__raw-input"
          onClick={inputClickHandler}
          onKeyDown={inputKeydownHandler}
          ref={inputElementRefCallback}
          id={id}
        />
        <input
          tabIndex={-1}
          readOnly
          disabled={disabled}
          value={optionValueSummary}
          placeholder={placeholder}
          className="g-input c-input-multi-select__raw-input c-input-multi-select__value-display-box"
        />
      </div>
      <Popover
        placement="bottom-start"
        referenceElement={inputElement}
        className={rootClassName}
        contentClassName="c-input-multi-select__options-content"
        isOpen={isOpen}
        setFloatingElement={setFloatingElement}
        floatingElement={floatingElement}
        container={popoverContainer}
        fillMinWidth
        onClose={closeHandler}
        dismissableKeyboardKeyFilters={[{ code: KEY_CODES.Escape }]}
        prevKeyboardKeyFilter={{ code: KEY_CODES.ArrowUp }}
        nextKeyboardKeyFilter={{ code: KEY_CODES.ArrowDown }}
        touchUI
        trap
        autoFocus={0}
        returnFocus={inputElement}
      >
        <div className={optionsClassName}>
          <InputMultiSelectBox
            className='c-input-multi-select__options-items'
            onChange={onChange}
            options={options}
            value={value}
            disabled={disabled}
            error={error}
            optionLabelSize="small"
            color={color}
            reverse={reverse}
          />
          <FocusContainer className="c-input-multi-select__options-footer">
            <IconButton onClick={closeHandler}>
              <CloseIcon />
            </IconButton>
          </FocusContainer>
        </div>
      </Popover>
    </>
  )
}

const InputMultiSelect = forwardRef(InputMultiSelectWithRef)

export default InputMultiSelect
