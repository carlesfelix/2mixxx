import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import './App.scss';
import { getGuestMeAction, getRegisteredMeAction, useMe } from './contexts/me';
import { logoutGuestMeAction } from './contexts/me/me.actions';
import { removeRoomUserAction, useRoomUser } from './contexts/room-user';
import DashboardRootPage from './pages/DashboardRootPage';
import GuestRootPage from './pages/GuestRootPage';
import LoadingPage from './pages/LoadingPage';
import RoomRootPage from './pages/RoomRootPage';
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

  function getRootPage(): JSX.Element {
    if (meState.user) {
      if (meState.user.type === 'roomUser') {
        return <RoomRootPage roomUser={meState.user} />;
      }
      if (meState.user.type === 'registeredUser') {
        return <DashboardRootPage registeredUser={meState.user} />
      }
    }
    return <GuestRootPage />;
  }

  return (
    <div className="App">
      {
        globalInProgress ? (
          <LoadingPage />
        ) : (
          getRootPage()
        )
      }
    </div>
  );
}

export default App;
