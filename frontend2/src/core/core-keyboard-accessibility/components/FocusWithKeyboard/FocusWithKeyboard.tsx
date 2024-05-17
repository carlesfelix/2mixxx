import { type ForwardedRef, forwardRef, type ReactElement, useImperativeHandle, useRef, useEffect, useState } from 'react'
import { type FocusableElement, tabbable, isFocusable } from 'tabbable'
import useKeyboardAccessibility from '../../hooks/useKeyboardAccessibility'
import { type FocusWithKeyboardProps, type FocusWithKeyboardRef } from '../../types'
import { hasChildren } from './utils'

function FocusWithKeyboardWithRef (
  props: FocusWithKeyboardProps,
  ref: ForwardedRef<FocusWithKeyboardRef>
): ReactElement {
  const {
    children,
    nextCode = 'Tab',
    previousCode,
    trap = true,
    disabled = false,
    className,
    autoFocusIndex,
    tabindex = 0,
    autoFocus = true
  } = props
  const { blur, focus } = useKeyboardAccessibility()
  const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null)
  const componentMountedRef = useRef<boolean>(false)

  useImperativeHandle(ref, () => ({
    focus () {
      rootElement?.focus()
    }
  }), [rootElement])

  useEffect(() => {
    if (!rootElement || componentMountedRef.current || !autoFocus) {
      return
    }
    componentMountedRef.current = true
    if (typeof autoFocusIndex === 'number') {
      const focusableElements = tabbable(rootElement, {
        includeContainer: false
      })
      const focusableElement = focusableElements[autoFocusIndex]
      focusableElement?.focus()
    } else {
      rootElement.focus()
    }
  }, [autoFocusIndex, disabled, rootElement, autoFocus])

  function keyDownHandler (event: React.KeyboardEvent<HTMLDivElement>): void {
    if (disabled || hasChildren(rootElement) || !rootElement) {
      return
    }
    const codes = [nextCode, previousCode]
    if (!codes.includes('Tab') && event.code === 'Tab') {
      preventEventEffects(event)
      return
    }
    if (codes.includes(event.code)) {
      const focusableElements = tabbable(rootElement, {
        includeContainer: false
      })
      if (!focusableElements.length) {
        preventEventEffects(event)
        return
      }
      const currentIndex = focusableElements.findIndex(
        focusableElement => focusableElement === event.target
      )
      // if (event.target === rootElement) {
      //   preventEventEffects(event)
      //   const nextElement = focusableElements[0]
      //   nextElement.focus()
      //   return
      // }
      if (currentIndex === -1) {
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
      preventEventEffects(event)
      const nextElement = focusableElements[nextTabIndex]
      nextElement.focus()
    }
  }

  function preventEventEffects (event: React.KeyboardEvent<HTMLDivElement>): void {
    event.preventDefault()
  }

  function blurHandler (event: React.FocusEvent): void {
    if (isFocusable(event.target)) {
      blur()
    }
  }

  function focusHandler (event: React.FocusEvent): void {
    if (isFocusable(event.target)) {
      focus(event as React.FocusEvent<FocusableElement>)
    }
  }

  return (
    <div
      tabIndex={tabindex}
      onKeyDown={keyDownHandler}
      onBlur={blurHandler}
      onFocus={focusHandler}
      ref={setRootElement}
      data-focus-with-keyboard={!disabled}
      className={className}
      style={{ outline: 'none' }}
    >
      {children}
    </div>
  )
}

const FocusWithKeyboard = forwardRef(FocusWithKeyboardWithRef)
export default FocusWithKeyboard
