import { useEffect } from 'react'
import useFocusContext from '../useFocusContext'
import { type UseFocusContainerOptions } from './types'
import useAutoFocus from '../useAutoFocus'
import useReturnFocus from '../useReturnFocus'
import { type RestoreFocusCallbackReturn } from '../../types'
import { type FocusableElement, getFocusableElements } from '../../services/focusable-elements'
import { type KeyboardKeyFilter, matchKeyboardKeyFilter } from '@/core/core-keyboard'

export default function useFocusContainer (
  element: HTMLElement | null,
  options: UseFocusContainerOptions
): void {
  const {
    nextKeyboardKeyFilter,
    prevKeyboardKeyFilter,
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
  } = prevKeyboardKeyFilter
  const {
    altKey: nextAltKey,
    code: nextCode,
    ctrlKey: nextCtrlKey,
    metaKey: nextMetaKey,
    shiftKey: nextShiftKey
  } = nextKeyboardKeyFilter
  const { onKeyDown, onPointerDown } = useFocusContext()
  useAutoFocus(element, autoFocus)
  useReturnFocus(returnFocus)

  useEffect(() => {
    if (element === null) {
      return
    }
    const prevKeyboardKeyFilter: KeyboardKeyFilter = {
      altKey: prevAltKey,
      code: prevCode,
      ctrlKey: prevCtrlKey,
      metaKey: prevMetaKey,
      shiftKey: prevShiftKey
    }
    const nextKeyboardKeyFilter: KeyboardKeyFilter = {
      altKey: nextAltKey,
      code: nextCode,
      ctrlKey: nextCtrlKey,
      metaKey: nextMetaKey,
      shiftKey: nextShiftKey
    }
    function keydownHandler (event: KeyboardEvent): void {
      if (element === null) {
        return
      }
      let offset = 0
      let match = false
      const focusableElements = getFocusableElements(element)
      if (
        matchKeyboardKeyFilter(event, prevKeyboardKeyFilter)
      ) {
        offset = -1
        match = true
      } else if (
        matchKeyboardKeyFilter(event, nextKeyboardKeyFilter)
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
    function restoreFocusCallback (
      event: KeyboardEvent,
      allFocusableElements: FocusableElement[]
    ): RestoreFocusCallbackReturn {
      if (!element) {
        return null
      }
      const focusableElements = getFocusableElements(element)
      const firstFocusableElement = focusableElements.at(0)
      const lastFocusableElement = focusableElements.at(-1)
      if (matchKeyboardKeyFilter(event, prevKeyboardKeyFilter)) {
        if (trap) {
          return lastFocusableElement
        }
        const focusableElementIndex = allFocusableElements.findIndex(eachAllFocusableElement => eachAllFocusableElement === firstFocusableElement) - 1
        return focusableElementIndex === -1 ? null : focusableElementIndex
      }
      if (matchKeyboardKeyFilter(event, nextKeyboardKeyFilter)) {
        return firstFocusableElement
      }
      return null
    }
    function pointerDownHandler (): void {
      if (element === null) {
        return
      }
      onPointerDown({
        element,
        restoreFocusCallback
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
