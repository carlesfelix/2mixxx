import { type MainMenuLinkItem } from '@/components/molecules/MainMenuLinks'
import HomeIcon from '@/assets/svg/Home.svg?react'
import AddCircleOutlineIcon from '@/assets/svg/AddCircleOutline.svg?react'
import ManageAccountsIcon from '@/assets/svg/ManageAccounts.svg?react'

export const MAIN_MENU_LINKS: MainMenuLinkItem[] = [
  {
    icon: <HomeIcon />,
    label: 'Home',
    to: '/'
  },
  {
    icon: <AddCircleOutlineIcon />,
    label: 'Create Event',
    to: '/events/create'
  },
  {
    icon: <ManageAccountsIcon />,
    label: 'Manage Users',
    to: '/users'
  }
]
