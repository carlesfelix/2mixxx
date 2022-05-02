import Dialog from "../../../Dialog";
import { AboutDialogProps } from "./types";
import { ReactComponent as Logo } from '../../../../assets/svg/logo.svg';
import gitHubLogo from '../../../../assets/images/GitHub-Mark-32px.png';
import './AboutDialog.scss';
import environment from "../../../../environment";
import { useTranslation } from "../../../../services/i18n";

export default function AboutDialog(props: AboutDialogProps) {
  const { isOpen, onClose } = props;
  const { t } = useTranslation();

  function closeHandler(): void {
    onClose();
  }
  console.log(process.env)
  return (
    <Dialog
      title={t('Components.PageLayout.aboutDialogTitle')}
      isOpen={isOpen}
      onClose={closeHandler}
      closeOptions={['clickOutside', 'closeBtn', 'escape']}
      className="AboutDialog"
      maxWidth="40rem"
    >
      <div className="about-content">
        <div className="about-logo">
          <Logo width="100%" />
        </div>
        <div className="about-description">
          <p className="about-description__version">
            {t(
              'Components.PageLayout.aboutDialogVersion',
              { version: environment.VERSION }
            )}
          </p>
          <p>
            {t('Components.PageLayout.aboutDialogDescription1')}
          </p>
          <p>
            {t('Components.PageLayout.aboutDialogDescription2')}
          </p>
        </div>
      </div>
      <div className="about-footer">
        <a href={environment.repository} target="_blank" rel="noreferrer">
          <img src={gitHubLogo} alt={t('Components.PageLayout.aboutDialogGitHubUrlAlt')} />
        </a>
      </div>
    </Dialog>
  );
}