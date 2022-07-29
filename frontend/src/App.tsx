import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import './App.scss';
import Routing from './components/Routing';
import { getGuestMeAction, getRegisteredMeAction, useMe } from './contexts/me';
import { logoutGuestMeAction } from './contexts/me/me.actions';
import { removeRoomUserAction, useRoomUser } from './contexts/room-user';
import LoadingPage from './pages/LoadingPage';
import getGuestRoutes from './routes/guest';
import getRegisteredRoutes from './routes/registered';
import getRoomRoutes from './routes/room';
import { setRegisteredTokenFn, setRoomUserConfigFn } from './services/http-auth';
import { getGuestToken } from './services/room-user-auth';
import AppRoute from './types/AppRoute';

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
      removeInterceptors = setRegisteredTokenFn(() => getIdTokenClaims());
      getRegisteredMeAction(meDispatch);
    } else if (guestLogged) {
      removeInterceptors = setRoomUserConfigFn({
        tokenCb: getGuestToken,
        unauthorizedCb: () => {
          removeRoomUserAction(roomUserAuthDispatch);
          logoutGuestMeAction();
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

  function getRoutes(): AppRoute[] {
    if (meState.user) {
      if (meState.user.type === 'roomUser') {
        return getRoomRoutes({ user: meState.user });
      }
      if (meState.user.type === 'registeredUser') {
        return getRegisteredRoutes({ user: meState.user });
      }
    }
    return getGuestRoutes();
  }

  return (
    <div className="App">
      {
        globalInProgress ? (
          <LoadingPage />
        ) : (
          <Routing routes={getRoutes()} loadingElement={<LoadingPage />} />
        )
      }
    </div>
  );
}

export default App;
