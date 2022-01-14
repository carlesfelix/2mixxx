
import { getLangOptions } from '../../../../helpers/input-options';
import { changeLanguage, useLanguage, useTranslation } from '../../../../services/i18n';
import Dialog from '../../../Dialog';
import RadioButtonBox from '../../../forms/inputs/RadioButtonBox';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};
export default function LanguageDialog(props: Props) {
  const { isOpen, onClose } = props;
  const currentLang = useLanguage();
  const { t } = useTranslation();
  function changeHandler(nextLang: string): void {
    changeLanguage(nextLang);
  }
  function closeHandler(): void {
    onClose();
  }
  return (
    <Dialog
      title="Language"
      isOpen={isOpen}
      onClose={closeHandler}
      closeOptions={['clickOutside', 'closeBtn', 'escape']}
      className="LanguageDialog"
      maxWidth="18.75rem"
    >
      <RadioButtonBox
        className="list list-hr"
        value={currentLang}
        onChange={changeHandler}
        extraProps={{
          itemClassName: 'list-item',
          items: getLangOptions(text => t(text))
        }}
      />
    </Dialog>
  );
}