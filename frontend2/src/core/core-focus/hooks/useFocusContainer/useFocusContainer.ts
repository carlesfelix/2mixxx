import { useEffect } from 'react'
import useFocusContext from '../useFocusContext'
import { type UseFocusContainerOptions } from './types'
import { tabbable } from 'tabbable'
import { matchKeyboardConfig } from '../../services/utils'
import useAutoFocus from '../useAutoFocus'
import useReturnFocus from '../useReturnFocus'

export default function useFocusContainer (
  element: HTMLElement | null,
  options: UseFocusContainerOptions = {}
): void {
  const { nextNavigationSettings, prevNavigationSettings, trap, autoFocus, returnFocus } = options
  const {
    altKey: prevAltKey,
    code: prevCode = 'Tab',
    ctrlKey: prevCtrlKey,
    metaKey: prevMetaKey,
    shiftKey: prevShiftKey = prevNavigationSettings?.code === undefined
  } = prevNavigationSettings ?? {}
  const {
    altKey: nextAltKey,
    code: nextCode = 'Tab',
    ctrlKey: nextCtrlKey,
    metaKey: nextMetaKey,
    shiftKey: nextShiftKey
  } = nextNavigationSettings ?? {}
  const { onKeyDown } = useFocusContext()
  useAutoFocus(element, autoFocus)
  useReturnFocus(returnFocus)

  useEffect(() => {
    if (element === null) {
      return
    }
    function keydownHandler (event: KeyboardEvent): void {
      if (element === null) {
        return
      }
      let offset = 0
      let match = false
      const focusableElements = tabbable(element)
      if (
        matchKeyboardConfig(event, {
          altKey: prevAltKey,
          code: prevCode,
          ctrlKey: prevCtrlKey,
          metaKey: prevMetaKey,
          shiftKey: prevShiftKey
        })
      ) {
        offset = -1
        match = true
      } else if (
        matchKeyboardConfig(event, {
          altKey: nextAltKey,
          code: nextCode,
          ctrlKey: nextCtrlKey,
          metaKey: nextMetaKey,
          shiftKey: nextShiftKey
        })
      ) {
        offset = 1
        match = true
      }
      if (trap) {
        const firstFocusableElement = focusableElements.at(0)
        const lastFocusableElement = focusableElements.at(-1)
        if (offset === -1 && window.document.activeElement === firstFocusableElement) {
          offset = focusableElements.length - 1
        } else if (
          offset === 1 && window.document.activeElement === lastFocusableElement
        ) {
          offset = 1 - focusableElements.length
        }
      }
      onKeyDown({ eventTarget: event.target, match, offset })
    }
    element.addEventListener('keydown', keydownHandler)
    return () => {
      element.removeEventListener('keydown', keydownHandler)
    }
  }, [
    element,
    prevAltKey,
    prevCode,
    prevCtrlKey,
    prevMetaKey,
    prevShiftKey,
    nextAltKey,
    nextCode,
    nextCtrlKey,
    nextMetaKey,
    nextShiftKey,
    trap,
    onKeyDown
  ])
}
