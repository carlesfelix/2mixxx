import { type ReactElement } from 'react'
import FocusContext from '../../contexts/FocusContext'
import { type FocusProviderProps } from './types'
import useFocusManager from '../../hooks/useFocusManager'

export default function FocusProvider (props: FocusProviderProps): ReactElement {
  const { children, focusVisibleDataKey } = props
  const focusManager = useFocusManager(focusVisibleDataKey)
  return (
    <FocusContext.Provider value={focusManager}>
      {children}
    </FocusContext.Provider>
  )
}
