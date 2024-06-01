import { type ReactElement } from 'react'
import { type FocusRootProps } from './types'
import useFocusContainer from '../../hooks/useFocusContainer'
import { KEY_CODES } from '@/core/core-keyboard'

export default function FocusRoot (props: FocusRootProps): ReactElement {
  const { children } = props
  useFocusContainer(
    window.document.body,
    {
      nextKeyboardKeyFilter: { code: KEY_CODES.Tab },
      prevKeyboardKeyFilter: { code: KEY_CODES.Tab, shiftKey: true }
    }
  )
  return <>{children}</>
}
