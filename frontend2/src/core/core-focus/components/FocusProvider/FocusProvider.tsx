import { useEffect, useRef, type ReactElement } from 'react'
import FocusContext from '../../contexts/FocusContext'
import { tabbable } from 'tabbable'
import { type KeydownEventStackItem } from '../../types'
import { getNextFocusableElement, matchKeyboardNavigationSetting } from './utils'
import { type FocusProviderProps } from './types'

export default function FocusProvider (props: FocusProviderProps): ReactElement {
  const { children } = props
  const lastFocusEventTargetRef = useRef<EventTarget | null>(null)
  const keydownEventStackRef = useRef<KeydownEventStackItem[]>([])

  useEffect(() => {
    function keydownHandler (event: KeyboardEvent): void {
      const keydownEventStackItem = keydownEventStackRef.current.find(
        (eachKeyboardEventStackItem) => eachKeyboardEventStackItem.eventTarget === event.target
      )
      if (keydownEventStackItem === undefined) {
        keydownEventStackRef.current = []
        return
      }
      const { keyboardNavigationSettings, trapLimit } = keydownEventStackItem
      const focusableElements = tabbable(window.document.body)
      const [prevKeyboardNavigationSettings, nextKeyboardNavigationSettings] = keyboardNavigationSettings
      if (matchKeyboardNavigationSetting(event, prevKeyboardNavigationSettings)) {
        const { current: lastFocusEventTarget } = lastFocusEventTargetRef
        const nextFocusableElement = getNextFocusableElement({
          direction: -1,
          focusableElements,
          lastFocusEventTarget,
          trapLimit
        })
        if (nextFocusableElement) {
          nextFocusableElement.focus()
          event.preventDefault()
        }
      } else if (matchKeyboardNavigationSetting(event, nextKeyboardNavigationSettings)) {
        const { current: lastFocusEventTarget } = lastFocusEventTargetRef
        const nextFocusableElement = getNextFocusableElement({
          direction: 1,
          focusableElements,
          lastFocusEventTarget,
          trapLimit
        })
        if (nextFocusableElement) {
          nextFocusableElement.focus()
          event.preventDefault()
        }
      } else if (matchKeyboardNavigationSetting(event, { code: 'Tab' }) || matchKeyboardNavigationSetting(event, { code: 'Tab', shiftKey: true })) {
        event.preventDefault()
      }
      keydownEventStackRef.current = []
    }
    function focusinHandler (event: FocusEvent): void {
      lastFocusEventTargetRef.current = event.target
    }
    function focusoutHandler (event: FocusEvent): void {
      if (event.relatedTarget === null) {
        lastFocusEventTargetRef.current = null
      }
    }
    window.document.addEventListener('keydown', keydownHandler)
    window.document.addEventListener('focusin', focusinHandler)
    window.document.addEventListener('focusout', focusoutHandler)

    return () => {
      window.document.removeEventListener('keydown', keydownHandler)
      window.document.removeEventListener('focusin', focusinHandler)
      window.document.removeEventListener('focusout', focusoutHandler)
    }
  }, [])

  return (
    <FocusContext.Provider
      value={{ keydownEventStackRef }}
    >
      {children}
    </FocusContext.Provider>
  )
}
