import Dialog from "../../../../components/Dialog";
import { useTranslation } from "../../../../services/i18n";

type Props = {
  onClose: () => void;
  isOpen: boolean;
};
export default function WrongFileDialog(props: Props) {
  const { isOpen, onClose } = props;
  const { t } = useTranslation();
  return (
    <Dialog
      isOpen={isOpen}
      title={t('Pages.LibrariesDashboardPage.wrongFileDialogTitle')}
      className="LibraryInfoDialog"
      closeOptions={['closeBtn', 'clickOutside', 'escape']}
      onClose={onClose}
      maxWidth="15rem"
    >
      <p>{t('Pages.LibrariesDashboardPage.wrongFileDialogMessage')}</p>
    </Dialog>
  );
}