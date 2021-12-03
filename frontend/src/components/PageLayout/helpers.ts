import OptionItem from '../../types/OptionItem';
import { AnyUserAuth } from '../../types/UserMe';

type GetMenuProps = {
  me?: AnyUserAuth,
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
    if (me.type === 'roomUser') {
      menuOptions.push({
        label: 'Log out',
        onSelected: onLogOutRoomUser
      });
    } else if (me.type === 'registeredUser') {
      menuOptions.push({
        label: 'Log out',
        onSelected: onLogOutRegisteredUser
      });
    }
  }
  return menuOptions;
}