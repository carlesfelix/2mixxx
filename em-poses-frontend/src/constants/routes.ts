import { lazy } from 'react';
import AppRoute from '../types/AppRoute';
import { roomLinks } from './links';
import { guestPermissions, registeredPermissions } from './permissions';

const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const RoomsDashboardPage = lazy(() => import('../pages/RoomsDashboardPage'));
const ManageRoomLibrariesPage = lazy(() => import('../pages/ManageRoomLibrariesPage'));
const LibrariesDashboardPage = lazy(() => import('../pages/LibrariesDashboardPage'));
const UsersDashboardPage = lazy(() => import('../pages/UsersDashboardPage'));
const HomePage = lazy(() => import('../pages/HomePage'));
const RoomPage = lazy(() => import('../pages/RoomPage'));
const RoomByIdPage = lazy(() => import('../pages/RoomByIdPage'));
const MakeASongRequestPage = lazy(() => import('../pages/MakeASongRequestPage'));
const RecommendSongPage = lazy(() => import('../pages/RecommendSongPage'));
const SongRequestsPage = lazy(() => import('../pages/SongRequestsPage'));

export const registeredAppRoutes: AppRoute[] = [
  {
    path: '/dashboard',
    Component: DashboardPage,
    toolbarLinkBack: '/',
    permission: registeredPermissions.PAGE_DASHBOARD,
    exact: true
  },
  {
    path: '/dashboard/rooms',
    Component: RoomsDashboardPage,
    toolbarLinkBack: '/dashboard',
    permission: registeredPermissions.PAGE_DASHBOARD,
    exact: true
  },
  {
    path: '/dashboard/rooms/:roomId/libraries',
    Component: ManageRoomLibrariesPage,
    toolbarLinkBack: '/dashboard/rooms',
    toolbarTitle: 'Manage libraries of room',
    permission: registeredPermissions.PAGE_DASHBOARD,
    exact: true
  },
  {
    path: '/dashboard/libraries',
    Component: LibrariesDashboardPage,
    toolbarLinkBack: '/dashboard',
    permission: registeredPermissions.PAGE_DASHBOARD,
    exact: true
  },
  {
    path: '/dashboard/users',
    Component: UsersDashboardPage,
    toolbarLinkBack: '/dashboard',
    permission: registeredPermissions.PAGE_DASHBOARD,
    exact: true
  },
  {
    path: '/rooms/:id',
    toolbarTitle: 'Room',
    Component: RoomByIdPage,
    toolbarLinkBack: '/',
    permission: registeredPermissions.PAGE_ROOM_BY_ID,
    layout: false
  },
  {
    path: '/',
    toolbarTitle: 'Home',
    Component: HomePage,
    exact: true
  }
];

export const guestAppRoutes: AppRoute[] = [
  {
    path: '/app',
    toolbarTitle: 'Room',
    Component: RoomPage,
    toolbarLinkBack: '/',
    permission: guestPermissions.PAGE_ROOM,
    layout: false
  },
  {
    path: '/',
    toolbarTitle: 'Home',
    Component: HomePage,
    exact: true
  }
];

export const roomRoutes: AppRoute[] = [
  {
    path: '/song-requests',
    toolbarTitle: 'Song requests',
    Component: SongRequestsPage,
    links: roomLinks,
    toolbarLinkBack: '/',
    exact: true
  },
  {
    path: '/make-a-song-request',
    toolbarTitle: 'Make a song request',
    Component: MakeASongRequestPage,
    links: roomLinks,
    exact: true
  },
  {
    path: '/recommend-song',
    toolbarTitle: 'Recomend song',
    Component: RecommendSongPage,
    links: roomLinks,
    exact: true
  }
];
