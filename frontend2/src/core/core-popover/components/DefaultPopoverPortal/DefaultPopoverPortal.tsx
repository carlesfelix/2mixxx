import useOverlayRootElement from '@/hooks/useOverlayRootElement'
import { ReactElement } from 'react'
import { createPortal } from 'react-dom'
import { DefaultPopoverPortalProps } from '../../types'

export default function DefaultPopoverPortal (
  props: DefaultPopoverPortalProps
): ReactElement {
  const { children } = props
  const target = useOverlayRootElement()

  return createPortal(children, target)
}
