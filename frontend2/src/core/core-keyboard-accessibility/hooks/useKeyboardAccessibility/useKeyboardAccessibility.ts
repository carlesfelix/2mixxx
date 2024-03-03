import { useContext } from 'react'
import KeyboardAccessibilityContext from '../../contexts/KeyboardAccessibilityContext'
import { type KeyboardAccessibilityContextReturn } from '../../types'

export default function useKeyboardAccessibility (): KeyboardAccessibilityContextReturn {
  const context = useContext(KeyboardAccessibilityContext)

  if (context === undefined) {
    throw new Error('useKeyboardAccessibility must be used within KeyboardAccessibilityProvider')
  }

  return context
}
