import { forwardRef, type ForwardedRef, type ReactElement } from 'react'
import { type FocusContainerProps } from './types'
import { useInternalInstance } from '@/core/core-hooks'
import useFocusContainer from '../../hooks/useFocusContainer'

function FocusContainerWithRef (
  props: FocusContainerProps,
  ref: ForwardedRef<HTMLDivElement>
): ReactElement {
  const {
    nextNavigationConfig,
    prevNavigationConfig,
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
    shiftKey: prevShiftKey = prevNavigationConfig?.code === undefined
  } = prevNavigationConfig ?? {}
  const {
    altKey: nextAltKey,
    code: nextCode = 'Tab',
    ctrlKey: nextCtrlKey,
    metaKey: nextMetaKey,
    shiftKey: nextShiftKey
  } = nextNavigationConfig ?? {}
  const [elementRefCallback, element] = useInternalInstance(ref)
  useFocusContainer(element, {
    nextNavigationConfig: {
      altKey: nextAltKey,
      code: nextCode,
      ctrlKey: nextCtrlKey,
      metaKey: nextMetaKey,
      shiftKey: nextShiftKey
    },
    prevNavigationConfig: {
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
