import { ForwardedRef, forwardRef, ReactElement, useEffect, useImperativeHandle, useRef } from 'react'
import { FocusableElement, tabbable, isFocusable } from 'tabbable'
import useKeyboardAccessibility from '../../hooks/useKeyboardAccessibility'
import { FocusWithKeyboardProps, FocusWithKeyboardRef } from '../../types'
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
    className
  } = props
  const { blur, focus, updatePointedElement } = useKeyboardAccessibility()
  const containerRef = useRef<HTMLDivElement>(null)

  useImperativeHandle(ref, () => ({
    focus () {
      containerRef.current?.focus()
    }
  }), [containerRef])

  useEffect(() => {
    function globalPointerDownHandler (event: PointerEvent): void {
      if (!hasChildren(containerRef)) {
        updatePointedElement(event.target as Element)
      }
    }

    function globalKeydownHandler (event: KeyboardEvent): void {
      const codes = [nextCode, previousCode]
      if (codes.includes(event.code) && !hasChildren(containerRef)) {
        updatePointedElement(null)
      }
    }

    if (!disabled) {
      window.document.body.addEventListener('pointerdown', globalPointerDownHandler)
      window.document.body.addEventListener('keydown', globalKeydownHandler)

      return () => {
        window.document.body.removeEventListener('pointerdown', globalPointerDownHandler)
        window.document.body.removeEventListener('keydown', globalKeydownHandler)
      }
    }
  }, [updatePointedElement, nextCode, previousCode, disabled, containerRef])

  function keyDownHandler (event: React.KeyboardEvent<HTMLDivElement>): void {
    if (disabled || hasChildren(containerRef)) {
      return
    }
    const codes = [nextCode, previousCode]
    if (!codes.includes('Tab') && event.code === 'Tab') {
      preventEventEffects(event)
      return
    }
    if (codes.includes(event.code)) {
      const focusableElements = tabbable(event.currentTarget, {
        includeContainer: false
      })
      if (!focusableElements.length) {
        preventEventEffects(event)
        return
      }
      const currentIndex = focusableElements.findIndex(
        focusableElement => focusableElement === event.target
      )
      if (currentIndex === -1) {
        if (!trap) {
          return
        }
        preventEventEffects(event)
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
      blur(event as React.FocusEvent<FocusableElement>)
    }
  }

  function focusHandler (event: React.FocusEvent): void {
    if (isFocusable(event.target)) {
      focus(event as React.FocusEvent<FocusableElement>)
    }
  }

  return (
    <div
      tabIndex={-1}
      onKeyDown={keyDownHandler}
      onBlur={blurHandler}
      onFocus={focusHandler}
      ref={containerRef}
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
