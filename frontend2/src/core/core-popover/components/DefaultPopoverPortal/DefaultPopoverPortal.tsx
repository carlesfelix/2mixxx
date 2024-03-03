import useOverlayRootElement from '@/hooks/useOverlayRootElement'
import { type ReactElement } from 'react'
import { createPortal } from 'react-dom'
import { type DefaultPopoverPortalProps } from '../../types'

export default function DefaultPopoverPortal (
  props: DefaultPopoverPortalProps
): ReactElement {
  const { children } = props
  const target = useOverlayRootElement()

  return createPortal(children, target)
}
