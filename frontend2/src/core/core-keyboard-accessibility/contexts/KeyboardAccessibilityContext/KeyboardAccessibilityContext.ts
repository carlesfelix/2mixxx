import { createContext } from 'react'
import { type KeyboardAccessibilityContextReturn } from '../../types'

const KeyboardAccessibilityContext = createContext<KeyboardAccessibilityContextReturn | undefined>(undefined)

export default KeyboardAccessibilityContext
