import { type KeyboardEvent, forwardRef, useState, type ForwardedRef, type ReactElement, useLayoutEffect } from 'react'
import { type InputCalendarProps } from './types'
import classNames from 'classnames'
import { Popover } from '@/core/core-popover'
import { useInternalInstance } from '@/core/core-hooks'
import { popoverContainer } from '@/modules/popover'
import { Calendar } from '@/modules/calendar'
import { KEY_CODES } from '@/core/core-keyboard'
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
    id
  } = props
  const [isOpen, setIsOpen] = useState(false)
  const [floatingElement, setFloatingElement] = useState<HTMLDivElement | null>(null)
  const [inputElementRefCallback, inputElement] = useInternalInstance(ref)

  useLayoutEffect(() => {
    let visibleValue = ''
    const intl = new window.Intl.DateTimeFormat()
    if (inputElement) {
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
      inputElement.value = visibleValue
    }
  }, [value, inputElement])

  function inputClickHandler (): void {
    setIsOpen(old => !old)
  }

  function closeHandler (): void {
    setIsOpen(false)
  }

  function inputKeydownHandler (event: KeyboardEvent<HTMLInputElement>): void {
    if (event.code === 'Enter') {
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
        ref={inputElementRefCallback}
        id={id}
      />
      <Popover
        placement="bottom-end"
        referenceElement={inputElement}
        className={rootClassName}
        contentClassName="c-input-calendar__content"
        isOpen={isOpen}
        setFloatingElement={setFloatingElement}
        floatingElement={floatingElement}
        container={popoverContainer}
        fillMinWidth
        onClose={closeHandler}
        dismissableKeyboardCodes={[KEY_CODES.Escape]}
        touchUI
      >
        <Calendar
          className={calendarClassName}
          onChange={onChange}
          value={value}
        />
      </Popover>
    </>
  )
}

const InputCalendar = forwardRef(InputCalendarWithRef)
export default InputCalendar
