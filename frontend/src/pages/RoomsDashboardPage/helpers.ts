import OptionItem from '../../types/OptionItem';

type GetRoomItemMenuProps = {
  onManageLibraries: () => void;
  onManageModerators: () => void;
  onDeleteRoom: () => void;
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
