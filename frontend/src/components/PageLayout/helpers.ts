import { TFunction } from '../../services/i18n';
import OptionItem from '../../types/OptionItem';
import { AnyUserAuth } from '../../types/UserMe';

type GetMenuProps = {
  t: TFunction,
  me?: AnyUserAuth,
  meProgress: boolean;
  onAbout: () => void;
  onLogOutRoomUser: () => void;
  onLogOutRegisteredUser: () => void;
  onLanguage: () => void;
};
export function getMenu(props: GetMenuProps): OptionItem[] {
  const {
    t, me, onAbout, onLanguage,
    onLogOutRoomUser, onLogOutRegisteredUser,
    meProgress
  } = props;
  const menuOptions: OptionItem[] = [
    {
      label: t('Components.PageLayout.helpers.menuItems.language'),
      onSelected: onLanguage
    },
    {
      label: t('Components.PageLayout.helpers.menuItems.about'),
      onSelected: onAbout
    }
  ];
  if (me && !meProgress) {
    if (me.type === 'roomUser') {
      menuOptions.push({
        label: t('Components.PageLayout.helpers.menuItems.roomUserLogout'),
        onSelected: onLogOutRoomUser
      });
    } else if (me.type === 'registeredUser') {
      menuOptions.push({
        label: t('Components.PageLayout.helpers.menuItems.registeredUserLogout'),
        onSelected: onLogOutRegisteredUser
      });
    }
  }
  return menuOptions;
}