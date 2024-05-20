import { type CloseEvent } from '../../types'

export type UseNotifyCloseEventReturn<T = Element, E = MouseEvent> = (closeEvent: CloseEvent<T, E>) => void
