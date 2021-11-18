import OptionItem from '../../types/OptionItem';
import Room from '../../types/Room';

type GetRoomItemMenuProps = {
  onManageLibraries: (room: Room) => void;
  onManageModerators: (room: Room) => void;
  onDeleteRoom: (room: Room) => void;
};
export function getRoomItemMenu(props: GetRoomItemMenuProps): OptionItem[] {
  const {
    onManageLibraries, onManageModerators,
    onDeleteRoom
  } = props;
  const roomItemMenu: OptionItem[] = [
    {
      label: 'Manage libraries',
      onSelected: onManageLibraries
    },
    {
      label: 'Manage moderators',
      onSelected: onManageModerators
    },
    {
      label: 'Delete room',
      onSelected: onDeleteRoom
    },
  ];
  return roomItemMenu;
}
