import { MainMenuLinkItem } from '@/components/molecules/MainMenuLinks';
import { ReactComponent as HomeIcon } from '@/assets/svg/Home.svg';
import { ReactComponent as AddCircleOutlineIcon } from '@/assets/svg/AddCircleOutline.svg';
import { ReactComponent as ManageAccountsIcon } from '@/assets/svg/ManageAccounts.svg';

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
];
