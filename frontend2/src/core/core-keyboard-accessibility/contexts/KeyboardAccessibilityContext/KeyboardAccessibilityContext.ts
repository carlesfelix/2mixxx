import { createContext } from 'react'
import { KeyboardAccessibilityContextReturn } from '../../types'

const KeyboardAccessibilityContext = createContext<KeyboardAccessibilityContextReturn | undefined>(undefined)

export default KeyboardAccessibilityContext
