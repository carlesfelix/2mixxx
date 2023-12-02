import { useEffect, useRef, useState } from 'react'
import { InstanceRefWithFocus, UseAutoHighlightWithKeyboardProps } from '../../types'
import useKeyboardAccessibility from '../useKeyboardAccessibility'
import { useKeyBoard, usePrevious } from '@/core/core-hooks'

export default function useAutoHighlightWithKeyboard<
  InstanceRef extends InstanceRefWithFocus | null
> (props: UseAutoHighlightWithKeyboardProps<InstanceRef>): void {
  const { isVisible, ref, targetElementRef, keyboardCodes } = props
  const withKeyboardRef = useRef<boolean>(false)
  const { isHighlighted } = useKeyboardAccessibility()
  const prevIsVisible = usePrevious(isVisible)
  const autoFocus = !prevIsVisible && isVisible && isHighlighted(targetElementRef) && withKeyboardRef.current
  const [willFocus, setWillFocus] = useState<boolean>(false)

  useKeyBoard({
    listener (event) {
      withKeyboardRef.current = keyboardCodes.includes(event.code)
    }
  })

  useEffect(() => {
    if (autoFocus) {
      setWillFocus(true)
      withKeyboardRef.current = false
    }
  }, [autoFocus])

  useEffect(() => {
    if (willFocus) {
      ref.current?.focus()
      setWillFocus(false)
    }
  }, [willFocus, ref])
}
