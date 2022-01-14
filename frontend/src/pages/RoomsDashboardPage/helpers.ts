import { TFunction } from '../../services/i18n';
import OptionItem from '../../types/OptionItem';
import Room from '../../types/Room';

type GetRoomItemMenuProps = {
  t: TFunction,
  onManageLibraries: (room: Room) => void;
  onManageModerators: (room: Room) => void;
  onDeleteRoom: (room: Room) => void;
};
export function getRoomItemMenu(props: GetRoomItemMenuProps): OptionItem[] {
  const {
    t, onManageLibraries, onManageModerators,
    onDeleteRoom
  } = props;
  const roomItemMenu: OptionItem[] = [
    {
      label: t('Pages.RoomsDashboardPage.helpers.roomMenuItems.manageLibraries'),
      onSelected: onManageLibraries
    },
    {
      label: t('Pages.RoomsDashboardPage.helpers.roomMenuItems.manageModerators'),
      onSelected: onManageModerators
    },
    {
      label: t('Pages.RoomsDashboardPage.helpers.roomMenuItems.deleteRoom'),
      onSelected: onDeleteRoom
    },
  ];
  return roomItemMenu;
}
