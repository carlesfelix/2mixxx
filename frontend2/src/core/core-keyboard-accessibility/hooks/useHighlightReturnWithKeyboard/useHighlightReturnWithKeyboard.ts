import { useEffect, useRef } from 'react'
import { InstanceRefWithFocus, UseHighlightReturnWithKeyboardProps } from '../../types'
import { useKeyBoard, usePrevious } from '@/core/core-hooks'
import useKeyboardAccessibility from '../useKeyboardAccessibility'

export default function useHighlightReturnWithKeyboard<
  InstanceRef extends InstanceRefWithFocus | null
> (props: UseHighlightReturnWithKeyboardProps<InstanceRef>): void {
  const { isVisible, ref, keyboardCodes } = props
  const prevIsVisible = usePrevious(isVisible)
  const shouldReturnFocusRef = useRef<boolean>(false)
  const { updatePointedElement } = useKeyboardAccessibility()
  const returnFocus = prevIsVisible && !isVisible && shouldReturnFocusRef.current

  useKeyBoard({
    listener (event) {
      if (keyboardCodes.includes(event.code)) {
        updatePointedElement(null)
        shouldReturnFocusRef.current = true
      }
    }
  })

  useEffect(() => {
    if (returnFocus) {
      ref.current?.focus()
      shouldReturnFocusRef.current = false
    }
  }, [returnFocus, ref])
}
