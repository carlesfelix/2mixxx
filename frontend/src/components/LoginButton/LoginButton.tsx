import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from '../../services/i18n';

function LoginButton() {
  const { t } = useTranslation();
  const { loginWithRedirect } = useAuth0();

  function clickHandler(): void {
    loginWithRedirect();
  }

  return (
    <button className="btn btn-secondary btn-lg" onClick={clickHandler}>
      {t('Components.LoginButton.loginBtn')}
    </button>
  );
};

export default LoginButton;
