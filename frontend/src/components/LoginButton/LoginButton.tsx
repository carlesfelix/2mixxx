import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from '../../services/i18n';

function LoginButton() {
  const { t } = useTranslation('Components/LoginButton');
  const { loginWithRedirect } = useAuth0();

  function clickHandler(): void {
    loginWithRedirect();
  }

  return (
    <button className="btn btn-secondary btn-lg" onClick={clickHandler}>
      {t('loginBtn')}
    </button>
  );
};

export default LoginButton;
