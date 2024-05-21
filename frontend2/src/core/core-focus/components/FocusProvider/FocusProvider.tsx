import { useEffect, useRef, type ReactElement } from 'react'
import FocusContext from '../../contexts/FocusContext'
import { tabbable } from 'tabbable'
import { type KeydownEventStackItem } from '../../types'
import { getNextFocusableElement, matchKeyboardNavigationSetting } from './utils'
import { type FocusProviderProps } from './types'
import { isKeyboardEvent, setFocusVisibility } from '../../services/utils'

export default function FocusProvider (props: FocusProviderProps): ReactElement {
  const { children, focusVisibleDataKey } = props
  const keydownEventStackRef = useRef<KeydownEventStackItem[]>([])
  const focusFromKeyboardRef = useRef<boolean>(false)
  const pointerDownEventTargetRef = useRef<EventTarget | null>(null)

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
        focusFromKeyboardRef.current = true
        const nextFocusableElement = getNextFocusableElement({
          direction: -1,
          focusableElements,
          trapLimit
        })
        if (nextFocusableElement) {
          nextFocusableElement.focus()
          event.preventDefault()
        }
      } else if (matchKeyboardNavigationSetting(event, nextKeyboardNavigationSettings)) {
        focusFromKeyboardRef.current = true
        const nextFocusableElement = getNextFocusableElement({
          direction: 1,
          focusableElements,
          trapLimit
        })
        if (nextFocusableElement) {
          nextFocusableElement.focus()
          event.preventDefault()
        }
      } else if (
        matchKeyboardNavigationSetting(event, { code: 'Tab' }) ||
        matchKeyboardNavigationSetting(event, { code: 'Tab', shiftKey: true })
      ) {
        event.preventDefault()
      }
      keydownEventStackRef.current = []
    }
    function focusinHandler (event: FocusEvent): void {
      focusFromKeyboardRef.current = focusFromKeyboardRef.current && !!(
        event.target &&
        event.target !== pointerDownEventTargetRef.current &&
        !(event.target as Node).contains(pointerDownEventTargetRef.current as Node)
      )
      if (focusFromKeyboardRef.current) {
        focusFromKeyboardRef.current = false
        setFocusVisibility(event.target, true, focusVisibleDataKey)
      }
      pointerDownEventTargetRef.current = null
    }
    function focusoutHandler (event: FocusEvent): void {
      setFocusVisibility(event.target, false, focusVisibleDataKey)
    }
    function clickHandler (event: MouseEvent): void {
      if (
        isKeyboardEvent(event) &&
        event.target === window.document.activeElement
      ) {
        setFocusVisibility(event.target, true, focusVisibleDataKey)
      }
    }
    function pointerDownHandler (event: MouseEvent): void {
      pointerDownEventTargetRef.current = event.target
    }
    window.document.addEventListener('keydown', keydownHandler)
    window.document.addEventListener('focusin', focusinHandler)
    window.document.addEventListener('focusout', focusoutHandler)
    window.document.addEventListener('click', clickHandler)
    window.document.addEventListener('pointerdown', pointerDownHandler)

    return () => {
      window.document.removeEventListener('keydown', keydownHandler)
      window.document.removeEventListener('focusin', focusinHandler)
      window.document.removeEventListener('focusout', focusoutHandler)
      window.document.removeEventListener('click', clickHandler)
      window.document.removeEventListener('pointerdown', pointerDownHandler)
    }
  }, [focusVisibleDataKey])

  return (
    <FocusContext.Provider
      value={{ keydownEventStackRef, focusVisibleDataKey, focusFromKeyboardRef, pointerDownEventTargetRef }}
    >
      {children}
    </FocusContext.Provider>
  )
}
