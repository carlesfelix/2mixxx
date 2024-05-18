import { useEffect } from 'react'
import useFocusContext from '../useFocusContext'
import { type UseFocusControllerOptions } from './types'
import { type KeydownEventStackItem } from '../../types'
import { tabbable } from 'tabbable'
import useReturnFocus from '../useReturnFocus'
import useAutoFocus from '../useAutoFocus'

export default function useFocusController (
  element: HTMLElement | null,
  params: UseFocusControllerOptions = {}
): void {
  const {
    prevNavigationSettings,
    nextNavigationSettings,
    trap = false,
    returnFocus = false,
    autoFocus
  } = params
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
  const { keydownEventStackRef } = useFocusContext()
  useReturnFocus(!returnFocus)
  useAutoFocus(element, autoFocus)
  useEffect(() => {
    if (element === null) {
      return
    }
    function keydownHandler (event: KeyboardEvent): void {
      if (element === null) {
        return
      }
      const { target: eventTarget } = event
      const keydownEventStackItem: KeydownEventStackItem = {
        eventTarget,
        keyboardNavigationSettings: [
          {
            altKey: prevAltKey,
            code: prevCode,
            ctrlKey: prevCtrlKey,
            metaKey: prevMetaKey,
            shiftKey: prevShiftKey
          },
          {
            altKey: nextAltKey,
            code: nextCode,
            ctrlKey: nextCtrlKey,
            metaKey: nextMetaKey,
            shiftKey: nextShiftKey
          }
        ]
      }
      if (trap) {
        const focusableElements = tabbable(element)
        const firstFocusableElement = focusableElements.at(0)
        const lastFocusableElement = focusableElements.at(-1)
        if (firstFocusableElement && lastFocusableElement) {
          keydownEventStackItem.trapLimit = [firstFocusableElement, lastFocusableElement]
        }
      }
      keydownEventStackRef.current.push(keydownEventStackItem)
    }
    element.addEventListener('keydown', keydownHandler)

    return () => {
      element.removeEventListener('keydown', keydownHandler)
    }
  }, [
    element,
    keydownEventStackRef,
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
    trap
  ])
}
