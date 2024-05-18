import { useContext } from 'react'
import FocusContext from '../../contexts/FocusContext'
import { type UseFocusContextReturn } from './types'

export default function useFocusContext (): UseFocusContextReturn {
  const context = useContext(FocusContext)
  if (context === undefined) {
    throw new Error('useFocusContext must be used within an FocusProvider')
  }
  return context
}
