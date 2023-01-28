import { IconButtonProps } from '@/components/atoms/IconButton'
import { MenuItem } from '@/components/molecules/MenuItems'

export interface PopupMenuProps extends
  Omit<IconButtonProps, 'children' | 'ref' | 'onClick' | 'className'> {
  className?: string
  buttonClassName?: string
  items: MenuItem[]
}
