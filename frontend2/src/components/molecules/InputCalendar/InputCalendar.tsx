import { type KeyboardEvent, forwardRef, useState, type ForwardedRef, type ReactElement, useEffect } from 'react'
import { type InputCalendarProps } from './types'
import classNames from 'classnames'
import { Popover } from '@/core/core-popover'
import { useInternalInstance } from '@/core/core-hooks'
import { popoverContainer } from '@/modules/popover'
import { Calendar } from '@/modules/calendar'
import { KEY_CODES, matchKeyboardKeyFilter } from '@/core/core-keyboard'
import './InputCalendar.css'

function InputCalendarWithRef (
  props: InputCalendarProps,
  ref: ForwardedRef<HTMLInputElement>
): ReactElement {
  const {
    onChange,
    value,
    disabled = false,
    error,
    className,
    id,
    range
  } = props
  const [isOpen, setIsOpen] = useState(false)
  const [floatingElement, setFloatingElement] = useState<HTMLDivElement | null>(null)
  const [inputTextValue, setInputTextValue] = useState<string>('')
  const [inputElementRefCallback, inputElement] = useInternalInstance(ref)

  useEffect(() => {
    let visibleValue = ''
    const intl = new window.Intl.DateTimeFormat()
    if (value instanceof Date) {
      visibleValue = intl.format(value)
    } else if (value instanceof Array) {
      if (value[0] instanceof Date) {
        visibleValue = intl.format(value[0])
      }
      if (value[1] instanceof Date) {
        visibleValue = visibleValue.concat(' - ').concat(intl.format(value[1]))
      }
    }
    setInputTextValue(visibleValue)
  }, [value])

  function inputClickHandler (): void {
    setIsOpen(old => !old)
  }

  function closeHandler (): void {
    setIsOpen(false)
  }

  function inputTextChangeHandler (event: React.ChangeEvent<HTMLInputElement>): void {
    setInputTextValue(event.target.value)
  }

  function inputKeydownHandler (event: KeyboardEvent<HTMLInputElement>): void {
    if (matchKeyboardKeyFilter(event, { code: KEY_CODES.Enter })) {
      event.preventDefault()
      setIsOpen(true)
    }
  }

  const rootClassName = classNames('c-input-calendar', {
    'c-input-calendar--error': error
  }, className)

  const inputClassName = classNames(rootClassName, 'c-input-calendar--input-text', 'g-input')
  const calendarClassName = classNames(rootClassName, 'c-input-calendar--calendar')
  return (
    <>
      <input
        readOnly
        disabled={disabled}
        className={inputClassName}
        onClick={inputClickHandler}
        onKeyDown={inputKeydownHandler}
        value={inputTextValue}
        onChange={inputTextChangeHandler}
        ref={inputElementRefCallback}
        id={id}
      />
      <Popover
        placement="bottom-start"
        referenceElement={inputElement}
        className={rootClassName}
        contentClassName="c-input-calendar__content"
        isOpen={isOpen}
        setFloatingElement={setFloatingElement}
        floatingElement={floatingElement}
        container={popoverContainer}
        fillMinWidth
        onClose={closeHandler}
        dismissableKeyboardKeyFilters={[{ code: KEY_CODES.Escape }]}
        touchUI
        trap
        autoFocus={false}
        returnFocus={inputElement}
      >
        <Calendar
          className={calendarClassName}
          onChange={onChange}
          value={value}
          range={range}
        />
      </Popover>
    </>
  )
}

const InputCalendar = forwardRef(InputCalendarWithRef)
export default InputCalendar
