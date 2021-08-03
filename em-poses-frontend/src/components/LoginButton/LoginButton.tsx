import { useAuth0 } from '@auth0/auth0-react';

function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  function clickHandler(): void {
    loginWithRedirect();
  }

  return (
    <button className="btn btn-tertiary" onClick={clickHandler}>
      Enter as registered user
    </button>
  );
};

export default LoginButton;
