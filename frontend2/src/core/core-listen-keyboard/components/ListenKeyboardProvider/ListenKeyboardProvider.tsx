import { useListenKeyboard } from '@/core/core-hooks'
import { ReactElement } from 'react'
import ListenKeyboardContext from '../../contexts/ListenKeyboardContext'
import { ListenKeyboardContextReturn, ListenKeyboardProviderProps } from '../../types'

export default function ListenKeyboardProvider (props: ListenKeyboardProviderProps): ReactElement {
  const { children } = props
  const { onKeyboard: onKeydown } = useListenKeyboard('keydown')
  const { onKeyboard: onKeyup } = useListenKeyboard('keyup')

  const value: ListenKeyboardContextReturn = {
    onKeydown,
    onKeyup
  }

  return (
    <ListenKeyboardContext.Provider value={value}>
      {children}
    </ListenKeyboardContext.Provider>
  )
}
