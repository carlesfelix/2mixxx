import { TFunction } from '../../services/i18n';
import validationRules from '../../helpers/validation-rules';
import FormValidation from '../../types/FormValidation';
import Library from '../../types/Library';
import OptionItem from '../../types/OptionItem';

type GetLibraryMenuProps = {
  t: TFunction;
  onEditInfo: () => void;
  onDeleteLibrary: () => void;
};
export function getLibraryMenu(props: GetLibraryMenuProps): OptionItem[] {
  const { t, onEditInfo, onDeleteLibrary } = props;
  const libraryMenu: OptionItem[] = [
    {
      label: t('Pages.LibrariesDashboardPage.helpers.libraryMenu.editInfo'),
      onSelected: onEditInfo
    },
    {
      label: t('Pages.LibrariesDashboardPage.helpers.libraryMenu.deleteLibrary'),
      onSelected: onDeleteLibrary
    }
  ];
  return libraryMenu;
}

export const getLibraryInfoFormValidation: FormValidation<
  Partial<Library>
> = () => {
  return {
    title: { required: validationRules.required() }
  };
};
