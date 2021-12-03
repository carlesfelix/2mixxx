import { lazy } from 'react';
import AppRoute from '../types/AppRoute';
import { permissions } from './permissions';

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

const appRoutes: AppRoute[] = [
  {
    path: '/',
    Component: SongRequestsPage,
    permission: permissions.PAGE_SONG_REQUEST,
    exact: true
  },
  {
    path: '/make-a-song-request',
    Component: MakeASongRequestPage,
    permission: permissions.PAGE_MAKE_A_SONG_REQUEST,
    exact: true
  },
  {
    path: '/recommend-song',
    Component: RecommendSongPage,
    permission: permissions.PAGE_RECOMMEND_SONG,
    exact: true
  },
  {
    path: '/moderate/rooms',
    Component: ModerateRoomsPage,
    permission: permissions.PAGE_MODERATE_ROOM,
    exact: true
  },
  {
    path: '/moderate/rooms/:roomId',
    Component: ModerateRoomPage,
    permission: permissions.PAGE_ROOM_BY_ID,
    exact: true
  },
  {
    path: '/dashboard',
    Component: DashboardPage,
    permission: permissions.PAGE_DASHBOARD,
    exact: true
  },
  {
    path: '/dashboard/rooms',
    Component: RoomsDashboardPage,
    permission: permissions.PAGE_MODERATE_ROOMS,
    exact: true
  },
  {
    path: '/dashboard/rooms/:roomId/libraries',
    Component: ManageRoomLibrariesPage,
    permission: permissions.PAGE_MANAGE_ROOM_LIBRARIES,
    exact: true
  },
  {
    path: '/dashboard/rooms/:roomId/moderators',
    Component: ManageRoomModeratorsPage,
    permission: permissions.PAGE_MANAGE_ROOM_MODERATORS,
    exact: true
  },
  {
    path: '/dashboard/libraries',
    Component: LibrariesDashboardPage,
    permission: permissions.PAGE_LIBRARIES_DASHBOARD,
    exact: true
  },
  {
    path: '/dashboard/users',
    Component: UsersDashboardPage,
    permission: permissions.PAGE_USERS_DASHBOARD,
    exact: true
  },
  {
    path: '/rooms/:id',
    Component: RoomByIdPage,
    permission: permissions.PAGE_ROOM_BY_ID,
  },
  {
    path: '/',
    Component: HomePage,
    exact: true
  }
];

export default appRoutes;
