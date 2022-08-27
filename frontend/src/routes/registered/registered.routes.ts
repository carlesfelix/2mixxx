import AppRoute from '../../types/AppRoute';
import { permissions } from '../../constants/permissions';
import { RegisteredRoutesProps } from './types';
import {
  DashboardPage, LibrariesDashboardPage, ManageRoomLibrariesPage,
  ManageRoomModeratorsPage, ModerateRoomPage, ModerateRoomsPage,
  NotFoundPage, RecommendSongPage, RoomsDashboardPage,
  UsersDashboardPage
} from '../components';

export default function getRegisteredRoutes(
  props: RegisteredRoutesProps
): AppRoute[] {
  const { registeredUser } = props;
  return [
    {
      path: '/recommend-song',
      Component: RecommendSongPage,
      canActivate: () => registeredUser.permissions.includes(permissions.PAGE_RECOMMEND_SONG)
    },
    {
      path: '/moderate/rooms',
      Component: ModerateRoomsPage,
      canActivate: () => registeredUser.permissions.includes(permissions.PAGE_MODERATE_ROOMS)
    },
    {
      path: '/moderate/rooms/:roomId',
      Component: ModerateRoomPage,
      canActivate: () => registeredUser.permissions.includes(permissions.PAGE_MODERATE_ROOM)
    },
    {
      path: '/',
      Component: DashboardPage,
      canActivate: () => registeredUser.permissions.includes(permissions.PAGE_DASHBOARD)
    },
    {
      path: '/rooms',
      Component: RoomsDashboardPage,
      canActivate: () => registeredUser.permissions.includes(permissions.PAGE_ROOMS_DASHBOARD)
    },
    {
      path: '/rooms/:roomId/libraries',
      Component: ManageRoomLibrariesPage,
      canActivate: () => registeredUser.permissions.includes(permissions.PAGE_MANAGE_ROOM_LIBRARIES)
    },
    {
      path: '/rooms/:roomId/moderators',
      Component: ManageRoomModeratorsPage,
      canActivate: () => registeredUser.permissions.includes(permissions.PAGE_MANAGE_ROOM_MODERATORS)
    },
    {
      path: '/libraries',
      Component: LibrariesDashboardPage,
      canActivate: () => registeredUser.permissions.includes(permissions.PAGE_LIBRARIES_DASHBOARD)
    },
    {
      path: '/users',
      Component: UsersDashboardPage,
      canActivate: () => registeredUser.permissions.includes(permissions.PAGE_USERS_DASHBOARD)
    },
    {
      path: '*',
      Component: NotFoundPage
    }
  ];
}
