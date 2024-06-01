import { type FocusContainerProps } from '@/core/core-focus'
import { type KeyboardKeyFilter } from '@/core/core-keyboard'

export interface OverlayContainerProps extends FocusContainerProps {
  contentClassName?: string
  onClose?: () => void
  setFloatingElement?: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>
  touchUI?: boolean
  dismissableMask?: boolean
  dismissableKeyboardKeyFilters?: KeyboardKeyFilter[]
}
