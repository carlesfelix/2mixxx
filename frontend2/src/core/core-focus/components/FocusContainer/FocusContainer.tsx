import { forwardRef, type ForwardedRef, type ReactElement } from 'react'
import { type FocusContainerProps } from './types'
import useFocusController from '../../hooks/useFocusController'
import { useInternalInstance } from '@/core/core-hooks'

function FocusContainerWithRef (
  props: FocusContainerProps,
  ref: ForwardedRef<HTMLDivElement>
): ReactElement {
  const {
    nextNavigationSettings,
    prevNavigationSettings,
    returnFocus,
    trap,
    autoFocus,
    ...extraProps
  } = props
  const [elementRefCallback, element] = useInternalInstance(ref)
  useFocusController(element, {
    nextNavigationSettings,
    prevNavigationSettings,
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
