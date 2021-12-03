import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import './App.scss';
import Routes from './components/Routes';
import appRoutes from './constants/routes';
import { getGuestMeAction, getRegisteredMeAction, useMe } from './contexts/me';
import { logoutGuestMeAction } from './contexts/me/me.actions';
import { removeRoomUserAction, useRoomUser } from './contexts/room-user';
import LoadingPage from './pages/LoadingPage';
import { setRegisteredTokenFn, setRoomUserConfigFn } from './services/http-auth';
import { getGuestToken } from './services/room-user-auth';

function App() {
  const { state: roomUserState, dispatch: roomUserAuthDispatch } = useRoomUser();
  const { isAuthenticated, isLoading, getIdTokenClaims } = useAuth0();
  const { state: meState, dispatch: meDispatch } = useMe();

  const registeredLogged = !isLoading && isAuthenticated;
  const guestLogged =  !roomUserState.inProgress &&
    roomUserState.isAuthenticated;
  const shouldGetMe = !meState.user && (registeredLogged || guestLogged) &&
    !meState.inProgress && !meState.error;
  const globalInProgress = isLoading || roomUserState.inProgress ||
    meState.inProgress || shouldGetMe;

  useEffect(() => {
    let removeInterceptors: () => void;
    if (registeredLogged) {
      removeInterceptors = setRegisteredTokenFn(getIdTokenClaims);
      getRegisteredMeAction(meDispatch);
    } else if (guestLogged) {
      removeInterceptors = setRoomUserConfigFn({
        tokenCb: getGuestToken,
        unauthorizedCb: () => {
          removeRoomUserAction(roomUserAuthDispatch);
          logoutGuestMeAction(meDispatch);
        }
      });
      getGuestMeAction(meDispatch);
    }
    return () => {
      if (removeInterceptors) {
        removeInterceptors();
      }
    }
  }, [
    registeredLogged, guestLogged, meDispatch,
    getIdTokenClaims, roomUserAuthDispatch
  ]);
  let redirectPath: string = '/';
  if (meState.user) {
    if (meState.user.type === 'registeredUser') {
      redirectPath = '/dashboard';
    }
  }

  if (globalInProgress) {
    return <LoadingPage />;
  }

  return (
    <div className="App">
      <Routes
        routes={appRoutes} fallbackPath={redirectPath}
        permissions={meState.user?.user.permissions}
      />
    </div>
  );
}

export default App;
