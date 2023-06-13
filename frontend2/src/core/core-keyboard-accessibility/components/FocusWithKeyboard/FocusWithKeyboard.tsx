import { FocusEvent, KeyboardEvent, ReactElement } from 'react'
import { FocusableElement, tabbable } from 'tabbable'
import useKeyboardAccessibility from '../../hooks/useKeyboardAccessibility'
import { FocusWithKeyboardProps } from '../../types'

export default function FocusWithKeyboard (props: FocusWithKeyboardProps): ReactElement {
  const {
    children,
    disabled,
    nextCode = 'Tab',
    previousCode,
    trap = true,
    nextElementIndexCallback
  } = props
  const { blur, focus } = useKeyboardAccessibility()

  function keyDownHandler (event: KeyboardEvent<HTMLDivElement>): void {
    if (disabled) {
      event.preventDefault()
      return
    }
    const codes = [nextCode, previousCode]
    if (codes.includes(event.code) || nextElementIndexCallback) {
      const focusableElements = tabbable(event.currentTarget)
      if (!focusableElements.length) {
        event.preventDefault()
        return
      }
      const currentIndex = focusableElements.findIndex(e => e === event.target)
      if (nextElementIndexCallback) {
        event.preventDefault()
        const nextCustomTabIndex = nextElementIndexCallback({
          currentIndex,
          elements: focusableElements,
          event
        })
        const nextElement = focusableElements[nextCustomTabIndex]
        nextElement.focus()
        return
      }
      if (currentIndex === -1) {
        if (!trap) {
          return
        }
        event.preventDefault()
        const nextElement = focusableElements[0]
        nextElement.focus()
        return
      }
      const offset = event.code === previousCode || (event.shiftKey && previousCode === undefined) ? -1 : 1
      let nextTabIndex = currentIndex + offset
      if (nextTabIndex >= focusableElements.length) {
        if (!trap) {
          return
        }
        nextTabIndex = 0
      } else if (nextTabIndex < 0) {
        if (!trap) {
          return
        }
        nextTabIndex = focusableElements.length - 1
      }
      event.preventDefault()
      const nextElement = focusableElements[nextTabIndex]
      nextElement.focus()
    }
  }

  function blurHandler (event: FocusEvent<FocusableElement>): void {
    blur(event)
  }

  function focusHandler (event: FocusEvent<FocusableElement>): void {
    focus(event)
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      style={{ display: 'contents' }}
      tabIndex={-1}
      onKeyDown={keyDownHandler}
      onBlur={blurHandler}
      onFocus={focusHandler}
    >
      {children}
    </div>
  )
}
