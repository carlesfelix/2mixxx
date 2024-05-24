import { useEffect, useMemo } from 'react'
import focusManager from '../../services/focus-manager'
import { type UseFocusManagerReturn } from './types'

export default function useFocusManager (focusVisibleDataKey: string): UseFocusManagerReturn {
  const focusManagerInstance = useMemo(() => focusManager(focusVisibleDataKey), [focusVisibleDataKey])

  useEffect(() => {
    focusManagerInstance.listen()
    return () => {
      focusManagerInstance.unlisten()
    }
  }, [focusManagerInstance])

  return focusManagerInstance
}
