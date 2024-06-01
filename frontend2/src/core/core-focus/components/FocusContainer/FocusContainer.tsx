import { forwardRef, type ForwardedRef, type ReactElement } from 'react'
import { type FocusContainerProps } from './types'
import { useInternalInstance } from '@/core/core-hooks'
import useFocusContainer from '../../hooks/useFocusContainer'

function FocusContainerWithRef (
  props: FocusContainerProps,
  ref: ForwardedRef<HTMLDivElement>
): ReactElement {
  const {
    nextKeyboardKeyFilter,
    prevKeyboardKeyFilter,
    returnFocus,
    trap,
    autoFocus,
    ...extraProps
  } = props
  const {
    altKey: prevAltKey,
    code: prevCode = 'Tab',
    ctrlKey: prevCtrlKey,
    metaKey: prevMetaKey,
    shiftKey: prevShiftKey = prevKeyboardKeyFilter?.code === undefined
  } = prevKeyboardKeyFilter ?? {}
  const {
    altKey: nextAltKey,
    code: nextCode = 'Tab',
    ctrlKey: nextCtrlKey,
    metaKey: nextMetaKey,
    shiftKey: nextShiftKey
  } = nextKeyboardKeyFilter ?? {}
  const [elementRefCallback, element] = useInternalInstance(ref)
  useFocusContainer(element, {
    nextKeyboardKeyFilter: {
      altKey: nextAltKey,
      code: nextCode,
      ctrlKey: nextCtrlKey,
      metaKey: nextMetaKey,
      shiftKey: nextShiftKey
    },
    prevKeyboardKeyFilter: {
      altKey: prevAltKey,
      code: prevCode,
      ctrlKey: prevCtrlKey,
      metaKey: prevMetaKey,
      shiftKey: prevShiftKey
    },
    returnFocus,
    trap,
    autoFocus
  })
  return (
    <div {...extraProps} ref={elementRefCallback} />
  )
}

const FocusContainer = forwardRef(FocusContainerWithRef)
export default FocusContainer
