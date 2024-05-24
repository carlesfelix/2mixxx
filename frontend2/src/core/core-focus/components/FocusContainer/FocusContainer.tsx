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
  const [elementRefCallback, element] = useInternalInstance(ref)
  useFocusContainer(element, {
    nextNavigationSettings: nextNavigationConfig,
    prevNavigationSettings: prevNavigationConfig,
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
