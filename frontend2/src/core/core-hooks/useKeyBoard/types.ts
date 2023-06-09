type KeyboardMode = 'keydown' | 'keyup'

export interface UseKeyBoardProps {
  listen?: boolean
  listener: (event: KeyboardEvent) => void
  code?: string
  mode?: KeyboardMode
}
