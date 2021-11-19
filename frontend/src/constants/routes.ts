import { lazy } from 'react';
import AppRoute from '../types/AppRoute';
import { guestPermissions, registeredPermissions } from './permissions';

const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const RoomsDashboardPage = lazy(() => import('../pages/RoomsDashboardPage'));
const ManageRoomLibrariesPage = lazy(() => import('../pages/ManageRoomLibrariesPage'));
const LibrariesDashboardPage = lazy(() => import('../pages/LibrariesDashboardPage'));
const UsersDashboardPage = lazy(() => import('../pages/UsersDashboardPage'));
const HomePage = lazy(() => import('../pages/HomePage'));
const RoomByIdPage = lazy(() => import('../pages/RoomByIdPage'));
const MakeASongRequestPage = lazy(() => import('../pages/MakeASongRequestPage'));
const RecommendSongPage = lazy(() => import('../pages/RecommendSongPage'));
const SongRequestsPage = lazy(() => import('../pages/SongRequestsPage'));
const ManageRoomModeratorsPage = lazy(() => import('../pages/ManageRoomModeratorsPage'));
const ModerateRoomsPage = lazy(() => import('../pages/ModerateRoomsPage'));
const ModerateRoomPage = lazy(() => import('../pages/ModerateRoomPage'));

export const registeredAppRoutes: AppRoute[] = [
  {
    path: '/moderate/rooms',
    Component: ModerateRoomsPage,
    permission: registeredPermissions.PAGE_DASHBOARD,
    exact: true
  },
  {
    path: '/moderate/rooms/:roomId',
    Component: ModerateRoomPage,
    permission: registeredPermissions.PAGE_DASHBOARD,
    exact: true
  },
  {
    path: '/dashboard',
    Component: DashboardPage,
    permission: registeredPermissions.PAGE_DASHBOARD,
    exact: true
  },
  {
    path: '/dashboard/rooms',
    Component: RoomsDashboardPage,
    permission: registeredPermissions.PAGE_DASHBOARD,
    exact: true
  },
  {
    path: '/dashboard/rooms/:roomId/libraries',
    Component: ManageRoomLibrariesPage,
    permission: registeredPermissions.PAGE_DASHBOARD,
    exact: true
  },
  {
    path: '/dashboard/rooms/:roomId/moderators',
    Component: ManageRoomModeratorsPage,
    permission: registeredPermissions.PAGE_DASHBOARD,
    exact: true
  },
  {
    path: '/dashboard/libraries',
    Component: LibrariesDashboardPage,
    permission: registeredPermissions.PAGE_DASHBOARD,
    exact: true
  },
  {
    path: '/dashboard/users',
    Component: UsersDashboardPage,
    permission: registeredPermissions.PAGE_DASHBOARD,
    exact: true
  },
  {
    path: '/rooms/:id',
    Component: RoomByIdPage,
    permission: registeredPermissions.PAGE_ROOM_BY_ID,
  },
  {
    path: '/',
    Component: HomePage,
    exact: true
  }
];

export const guestAppRoutes: AppRoute[] = [
  // {
  //   path: '/',
  //   Component: RoomPage,
  //   permission: guestPermissions.PAGE_ROOM,
  //   exact: true
  // },
  {
    path: '/',
    Component: SongRequestsPage,
    permission: guestPermissions.PAGE_ROOM,
    exact: true
  },
  {
    path: '/make-a-song-request',
    Component: MakeASongRequestPage,
    permission: guestPermissions.PAGE_ROOM,
    exact: true
  },
  {
    path: '/recommend-song',
    Component: RecommendSongPage,
    permission: guestPermissions.PAGE_ROOM,
    exact: true
  },
  {
    path: '/',
    Component: HomePage,
    exact: true
  }
];
