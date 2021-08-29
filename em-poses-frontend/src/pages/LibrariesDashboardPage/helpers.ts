import OptionItem from '../../types/OptionItem';

type GetLibraryMenuProps = {
  onEditInfo: () => void;
  onDeleteLibrary: () => void;
};
export function getLibraryMenu(props: GetLibraryMenuProps): OptionItem[] {
  const { onEditInfo, onDeleteLibrary } = props;
  const libraryMenu: OptionItem[] = [
    {
      label: 'Edit info',
      onSelected: onEditInfo
    },
    {
      label: 'Delete library',
      onSelected: onDeleteLibrary
    }
  ];
  return libraryMenu;
}
