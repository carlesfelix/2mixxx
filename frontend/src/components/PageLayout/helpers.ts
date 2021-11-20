import OptionItem from '../../types/OptionItem';
import UserMe from '../../types/UserMe';

type GetMenuProps = {
  me?: UserMe,
  meProgress: boolean;
  onAbout: () => void;
  onLogOutRoomUser: () => void;
  onLogOutRegisteredUser: () => void;
};
export function getMenu(props: GetMenuProps): OptionItem[] {
  const {
    me, onAbout, onLogOutRoomUser,
    onLogOutRegisteredUser,
    meProgress
  } = props;
  const menuOptions: OptionItem[] = [
    {
      label: 'About',
      onSelected: onAbout
    }
  ];
  if (me && !meProgress) {
    if (me.type === 'guest') {
      menuOptions.push({
        label: 'Log out',
        onSelected: onLogOutRoomUser
      });
    } else if (me.type === 'registered') {
      menuOptions.push({
        label: 'Log out',
        onSelected: onLogOutRegisteredUser
      });
    }
  }
  return menuOptions;
}