import { lazy } from 'react';
import AppRoute from '../../types/AppRoute';
import { permissions } from '../../constants/permissions';
import { MainRoutesProps } from './types';

const DashboardPage = lazy(() => import('../../pages/DashboardPage'));
const RoomsDashboardPage = lazy(() => import('../../pages/RoomsDashboardPage'));
const ManageRoomLibrariesPage = lazy(() => import('../../pages/ManageRoomLibrariesPage'));
const LibrariesDashboardPage = lazy(() => import('../../pages/LibrariesDashboardPage'));
const UsersDashboardPage = lazy(() => import('../../pages/UsersDashboardPage'));
const HomePage = lazy(() => import('../../pages/HomePage'));
const MakeASongRequestPage = lazy(() => import('../../pages/MakeASongRequestPage'));
const RecommendSongPage = lazy(() => import('../../pages/RecommendSongPage'));
const SongRequestsPage = lazy(() => import('../../pages/SongRequestsPage'));
const ManageRoomModeratorsPage = lazy(() => import('../../pages/ManageRoomModeratorsPage'));
const ModerateRoomsPage = lazy(() => import('../../pages/ModerateRoomsPage'));
const ModerateRoomPage = lazy(() => import('../../pages/ModerateRoomPage'));
const LoadingPage = lazy(() => import('../../pages/LoadingPage'));

export default function getMainRoutes(props: MainRoutesProps): AppRoute[] {
  const { user, inProgress } = props;
  function canActivateRoute(permission: string): boolean {
    return user && !inProgress ? (
      user.user.permissions.includes(permission)
    ) : false;
  }
  return [
    {
      path: '/',
      Component: SongRequestsPage,
      canActivate: () => canActivateRoute(permissions.PAGE_SONG_REQUEST)
    },
    {
      path: '/make-a-song-request',
      Component: MakeASongRequestPage,
      canActivate: () => canActivateRoute(permissions.PAGE_MAKE_A_SONG_REQUEST)
    },
    {
      path: '/recommend-song',
      Component: RecommendSongPage,
      canActivate: () => canActivateRoute(permissions.PAGE_RECOMMEND_SONG)
    },
    {
      path: '/moderate/rooms',
      Component: ModerateRoomsPage,
      canActivate: () => canActivateRoute(permissions.PAGE_MODERATE_ROOMS)
    },
    {
      path: '/moderate/rooms/:roomId',
      Component: ModerateRoomPage,
      canActivate: () => canActivateRoute(permissions.PAGE_MODERATE_ROOM)
    },
    {
      path: '/dashboard',
      Component: DashboardPage,
      canActivate: () => canActivateRoute(permissions.PAGE_DASHBOARD)
    },
    {
      path: '/dashboard/rooms',
      Component: RoomsDashboardPage,
      canActivate: () => canActivateRoute(permissions.PAGE_ROOMS_DASHBOARD)
    },
    {
      path: '/dashboard/rooms/:roomId/libraries',
      Component: ManageRoomLibrariesPage,
      canActivate: () => canActivateRoute(permissions.PAGE_MANAGE_ROOM_LIBRARIES)
    },
    {
      path: '/dashboard/rooms/:roomId/moderators',
      Component: ManageRoomModeratorsPage,
      canActivate: () => canActivateRoute(permissions.PAGE_MANAGE_ROOM_MODERATORS)
    },
    {
      path: '/dashboard/libraries',
      Component: LibrariesDashboardPage,
      canActivate: () => canActivateRoute(permissions.PAGE_LIBRARIES_DASHBOARD)
    },
    {
      path: '/dashboard/users',
      Component: UsersDashboardPage,
      canActivate: () => canActivateRoute(permissions.PAGE_USERS_DASHBOARD)
    },
    {
      path: '/',
      Component: HomePage,
      canActivate: () => !user && !inProgress
    },
    {
      path: '*',
      Component: LoadingPage,
      canActivate: () => inProgress
    },
    {
      path: '*',
      canActivate: () => {
        if (inProgress) {
          return false;
        }

        if (user) {
          return { navigateTo: user.type === 'roomUser' ? '/' : '/dashboard' };
        }

        return { navigateTo: '/' };
      }
    }
  ];
}
