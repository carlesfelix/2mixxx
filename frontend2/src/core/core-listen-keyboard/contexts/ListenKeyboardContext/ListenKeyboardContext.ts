import { createContext } from 'react'
import { ListenKeyboardContextReturn } from '../../types'

const ListenKeyboardContext = createContext<ListenKeyboardContextReturn | undefined>(undefined)

export default ListenKeyboardContext
