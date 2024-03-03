import { FocusWithKeyboard, type FocusWithKeyboardRef } from '@/core/core-keyboard-accessibility'
import { type ReactElement, useEffect, useState } from 'react'
import { type PopoverContentProps } from '../../types'

export default function PopoverContent (props: PopoverContentProps): ReactElement {
  const { children } = props
  const [
    focusWithKeyboardRef,
    setFocusWithKeyboardRef
  ] = useState<FocusWithKeyboardRef | null>(null)

  useEffect(() => {
    focusWithKeyboardRef?.focus()
  }, [focusWithKeyboardRef])

  return (
    <FocusWithKeyboard
      nextCode="ArrowDown"
      previousCode="ArrowUp"
      ref={setFocusWithKeyboardRef}
    >
      {children}
    </FocusWithKeyboard>
  )
}
