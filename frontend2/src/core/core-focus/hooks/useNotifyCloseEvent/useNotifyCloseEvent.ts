import { useCallback } from 'react'
import { type UseNotifyCloseEventReturn } from './types'
import useFocusContext from '../useFocusContext'
import { type CloseEvent } from '../../types'
import { isKeyboardEvent } from '../../services/utils'

export default function useNotifyCloseEvent<T = Element, E = MouseEvent> (): UseNotifyCloseEventReturn<T, E> {
  const { focusFromKeyboardRef } = useFocusContext()
  const notifyCloseEvent = useCallback((event: CloseEvent<T, E>) => {
    focusFromKeyboardRef.current = isKeyboardEvent(event)
  }, [focusFromKeyboardRef])
  return notifyCloseEvent
}
