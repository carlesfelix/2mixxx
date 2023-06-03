import { useContext } from 'react'
import ListenKeyboardContext from '../../contexts/ListenKeyboardContext'
import { ListenKeyboardContextReturn } from '../../types'

export default function useListenKeyboard (): ListenKeyboardContextReturn {
  const context = useContext(ListenKeyboardContext)

  if (context === undefined) {
    throw new Error('useListenKeyboard must be used withing an ListenKeyboardProvider')
  }

  return context
}
