import { useEffect } from 'react'
import useFocusContext from '../useFocusContext'
import { type UseFocusContainerOptions } from './types'
import { tabbable } from 'tabbable'
import { matchKeyboardConfig } from '../../services/utils'
import useAutoFocus from '../useAutoFocus'
import useReturnFocus from '../useReturnFocus'
import { type KeyboardNavigationSettings } from '../../types'

export default function useFocusContainer (
  element: HTMLElement | null,
  options: UseFocusContainerOptions
): void {
  const {
    nextNavigationConfig,
    prevNavigationConfig,
    trap = false,
    autoFocus,
    returnFocus
  } = options
  const {
    altKey: prevAltKey,
    code: prevCode,
    ctrlKey: prevCtrlKey,
    metaKey: prevMetaKey,
    shiftKey: prevShiftKey
  } = prevNavigationConfig
  const {
    altKey: nextAltKey,
    code: nextCode,
    ctrlKey: nextCtrlKey,
    metaKey: nextMetaKey,
    shiftKey: nextShiftKey
  } = nextNavigationConfig
  const { onKeyDown, onPointerDown } = useFocusContext()
  useAutoFocus(element, autoFocus)
  useReturnFocus(returnFocus)

  useEffect(() => {
    if (element === null) {
      return
    }
    const keyboardNavigationSettings: KeyboardNavigationSettings = {
      prev: {
        altKey: prevAltKey,
        code: prevCode,
        ctrlKey: prevCtrlKey,
        metaKey: prevMetaKey,
        shiftKey: prevShiftKey
      },
      next: {
        altKey: nextAltKey,
        code: nextCode,
        ctrlKey: nextCtrlKey,
        metaKey: nextMetaKey,
        shiftKey: nextShiftKey
      }
    }
    function keydownHandler (event: KeyboardEvent): void {
      if (element === null) {
        return
      }
      let offset = 0
      let match = false
      const focusableElements = tabbable(element)
      if (
        matchKeyboardConfig(event, keyboardNavigationSettings.prev)
      ) {
        offset = -1
        match = true
      } else if (
        matchKeyboardConfig(event, keyboardNavigationSettings.next)
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
    function pointerDownHandler (): void {
      if (element === null) {
        return
      }
      onPointerDown({
        element,
        keyboardNavigationSettings,
        trap
      })
    }
    element.addEventListener('keydown', keydownHandler)
    element.addEventListener('pointerdown', pointerDownHandler)
    return () => {
      element.removeEventListener('keydown', keydownHandler)
      element.removeEventListener('pointerdown', pointerDownHandler)
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
    onKeyDown,
    onPointerDown
  ])
}
