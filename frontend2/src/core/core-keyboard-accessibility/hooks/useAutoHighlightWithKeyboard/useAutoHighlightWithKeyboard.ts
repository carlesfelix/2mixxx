import { useEffect, useState } from 'react'
import { InstanceRefWithFocus, UseAutoHighlightWithKeyboardProps } from '../../types'
import useKeyboardAccessibility from '../useKeyboardAccessibility'
import { usePrevious } from '@/core/core-hooks'

export default function useAutoHighlightWithKeyboard<
  InstanceRef extends InstanceRefWithFocus | null
> (props: UseAutoHighlightWithKeyboardProps<InstanceRef>): void {
  const { isVisible, ref, targetElement } = props
  const { isHighlighted } = useKeyboardAccessibility()
  const prevIsVisible = usePrevious(isVisible)
  const autoFocus = !prevIsVisible && isVisible && isHighlighted({ current: targetElement })
  const [willFocus, setWillFocus] = useState<boolean>(false)

  useEffect(() => {
    if (autoFocus) {
      setWillFocus(true)
    }
  }, [autoFocus])

  useEffect(() => {
    if (willFocus) {
      ref.current?.focus()
      setWillFocus(false)
    }
  }, [willFocus, ref])
}
