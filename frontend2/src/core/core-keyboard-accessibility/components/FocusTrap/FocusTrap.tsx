import { KeyboardEvent, ReactElement } from 'react'
import { tabbable } from 'tabbable'
import { FocusTrapProps } from '../../types'

export default function FocusTrap (props: FocusTrapProps): ReactElement {
  const {
    children,
    disabled,
    nextCode = 'Tab',
    previousCode,
    nextElementIndexCallback
  } = props

  function keyDownHandler (event: KeyboardEvent<HTMLDivElement>): void {
    const codes = [nextCode, previousCode]
    if ((codes.includes(event.code) || nextElementIndexCallback) && !disabled) {
      event.preventDefault()
      const focusableElements = tabbable(event.currentTarget)
      if (!focusableElements.length) {
        return
      }
      const currentIndex = focusableElements.findIndex(e => e === event.target)
      if (nextElementIndexCallback) {
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
        const nextElement = focusableElements[0]
        nextElement.focus()
        return
      }
      const offset = event.code === previousCode || (event.shiftKey && previousCode === undefined) ? -1 : 1
      let nextTabIndex = currentIndex + offset
      if (nextTabIndex >= focusableElements.length) {
        nextTabIndex = 0
      } else if (nextTabIndex < 0) {
        nextTabIndex = focusableElements.length - 1
      }
      const nextElement = focusableElements[nextTabIndex]
      nextElement.focus()
    }
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      style={{ display: 'contents' }}
      tabIndex={-1}
      onKeyDown={keyDownHandler}
    >
      {children}
    </div>
  )
}
