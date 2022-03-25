import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from '../../services/i18n';
import BasicButton from '../SubmitButton/SubmitButton';

function LoginButton() {
  const { t } = useTranslation();
  const { loginWithRedirect } = useAuth0();

  function clickHandler(): void {
    loginWithRedirect();
  }

  return (
    <BasicButton color="secondary" size="large" onClick={clickHandler}>
      {t('Components.LoginButton.loginBtn')}
    </BasicButton>
  );
};

export default LoginButton;
