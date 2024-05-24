import { type KeyboardEvent, forwardRef, useState, type ForwardedRef, type ReactElement, useLayoutEffect } from 'react'
import Calendar, { type TileDisabledFunc } from 'react-calendar'
import { type InputCalendarProps } from './types'
import classNames from 'classnames'
import Popover from '@/core/core-popover'
import { useInternalInstance, useKeyBoard } from '@/core/core-hooks'
import { popoverContainer } from '@/modules/popover'
import { FocusContainer } from '@/core/core-focus'
import useClick from '@/core/core-hooks/useClick'
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

  // TODO: Create usePopoverHelper hook
  useKeyBoard({
    listener () {
      setIsOpen(false)
    },
    code: 'Escape',
    listen: isOpen
  })

  useClick({
    listener (event) {
      if (
        !inputElement?.contains(event.target as Node) &&
        !floatingElement?.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
  })

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

  const tileDisabledHandler: TileDisabledFunc = ({ activeStartDate, date, view }) => {
    return disabled
  }

  function inputClickHandler (): void {
    setIsOpen(old => !old)
  }

  function keydownHandler (event: KeyboardEvent<HTMLInputElement>): void {
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
        ref={inputElementRefCallback}
        onKeyDown={keydownHandler}
        id={id}
      />
      <Popover
        placement="bottom-start"
        referenceElement={inputElement}
        className={rootClassName}
        isOpen={isOpen}
        setFloatingElement={setFloatingElement}
        floatingElement={floatingElement}
        container={popoverContainer}
        fillMinWidth
        touchUI
      >
        <FocusContainer autoFocus={0} returnFocus trap>
          <Calendar
            className={calendarClassName}
            onChange={onChange}
            value={value}
            tileDisabled={tileDisabledHandler}
          />
        </FocusContainer>
      </Popover>
    </>
  )
}

const InputCalendar = forwardRef(InputCalendarWithRef)
export default InputCalendar
