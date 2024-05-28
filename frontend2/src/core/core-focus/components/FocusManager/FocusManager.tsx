import { type ReactElement } from 'react'
import FocusProvider from '../FocusProvider'
import { type FocusManagerProps } from './types'
import FocusRoot from '../FocusRoot'

export default function FocusManager (props: FocusManagerProps): ReactElement {
  const { focusVisibleDataKey, children } = props
  return (
    <FocusProvider focusVisibleDataKey={focusVisibleDataKey}>
      <FocusRoot>
        {children}
      </FocusRoot>
    </FocusProvider>
  )
}
