import { TFunction } from '../../services/i18n';
import validationRules from '../../services/validation-rules';
import FormValidation from '../../types/FormValidation';
import Library from '../../types/Library';
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

export const getLibraryInfoFormValidation: FormValidation<
  Partial<Library>,
  [t: TFunction]
> = (t) => {
  return {
    title: { required: validationRules.required(t) }
  };
};
