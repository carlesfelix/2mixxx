import { useTranslation } from '../../../../services/i18n';
import { ReactComponent as Logo } from '../../../../assets/svg/logo.svg';
import './AppTitle.scss';

export default function AppTitle() {
  const { t } = useTranslation();
  return (
    <div className="AppTitle">
      <Logo width="4rem" height="4rem" />
      <span>
        <h1 className="welcome-msg">
          {t('Pages.HomePage.title')}
        </h1>
      </span>
    </div>
  );
}
