import { FocusWithKeyboard } from '@/core/core-keyboard-accessibility'
import { type ReactElement } from 'react'
import { type PopoverContentProps } from '../../types'

export default function PopoverContent (props: PopoverContentProps): ReactElement {
  const { children } = props

  return (
    <FocusWithKeyboard
      nextCode="ArrowDown"
      previousCode="ArrowUp"
      autoFocusIndex={0}
    >
      {children}
    </FocusWithKeyboard>
  )
}
