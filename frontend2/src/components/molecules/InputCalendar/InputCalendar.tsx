import { KeyboardEvent, MouseEvent, forwardRef, useRef, useState, type ForwardedRef, type ReactElement } from 'react'
import Calendar, { type TileDisabledFunc } from 'react-calendar'
import { type InputCalendarProps } from './types'
import classNames from 'classnames'
import './InputCalendar.css'
import Popover from '@/core/core-popover'
import { FocusWithKeyboard } from '@/core/core-keyboard-accessibility'

function InputCalendarWithRef (
  props: InputCalendarProps,
  ref: ForwardedRef<HTMLInputElement>
): ReactElement {
  const {
    onChange,
    value,
    disabled = false,
    error,
    className
  } = props
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const tileDisabledHandler: TileDisabledFunc = ({ activeStartDate, date, view }) => {
    return disabled
  }

  function inputClickHandler (): void {
    setIsOpen(old => !old)
  }

  function keydownHandler(event: KeyboardEvent<HTMLInputElement>): void {
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
        className={inputClassName}
        onClick={inputClickHandler}
        ref={inputRef}
        onKeyDown={keydownHandler}
      />
      <Popover
        placement="top"
        targetElementRef={inputRef}
        className={rootClassName}
        isOpen={isOpen}
        onChangeIsOpen={setIsOpen}
        sameWidth
      >
        <FocusWithKeyboard>
          <Calendar
            className={calendarClassName}
            onChange={onChange}
            value={value}
            tileDisabled={tileDisabledHandler}
            inputRef={ref}
          />
        </FocusWithKeyboard>
      </Popover>
    </>
  )
}

const InputCalendar = forwardRef(InputCalendarWithRef)
export default InputCalendar
