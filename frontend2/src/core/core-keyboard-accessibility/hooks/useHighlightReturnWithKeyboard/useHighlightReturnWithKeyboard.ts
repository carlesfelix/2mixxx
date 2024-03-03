import { useEffect, useRef } from 'react'
import { type InstanceRefWithFocus, type UseHighlightReturnWithKeyboardProps } from '../../types'
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
      shouldReturnFocusRef.current = keyboardCodes.includes(event.code)
    }
  })

  useEffect(() => {
    if (returnFocus) {
      updatePointedElement(null)
      ref.current?.focus()
      shouldReturnFocusRef.current = false
    }
  }, [returnFocus, ref, updatePointedElement])
}
