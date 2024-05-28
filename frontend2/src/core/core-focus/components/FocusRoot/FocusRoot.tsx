import { type ReactElement } from 'react'
import { type FocusRootProps } from './types'
import useFocusContainer from '../../hooks/useFocusContainer'

export default function FocusRoot (props: FocusRootProps): ReactElement {
  const { children } = props
  useFocusContainer(
    window.document.body,
    {
      nextNavigationConfig: { code: 'Tab' },
      prevNavigationConfig: { code: 'Tab', shiftKey: true }
    }
  )
  return <>{children}</>
}
