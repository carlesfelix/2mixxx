import { type FocusContainerProps } from '@/core/core-focus'

export interface OverlayContainerProps extends FocusContainerProps {
  contentClassName?: string
  onClose?: () => void
  setFloatingElement?: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>
  touchUI?: boolean
  dismissableMask?: boolean
  dismissableKeyboardCodes?: string[]
}
