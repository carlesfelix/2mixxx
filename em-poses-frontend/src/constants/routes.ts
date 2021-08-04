import { lazy } from 'react';
import IRoute from '../models/IRoute.model';
import { roomLinks } from './links';
import { guestPermissions, permissions } from './permissions';

const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const HomePage = lazy(() => import('../pages/HomePage'));
const RoomPage = lazy(() => import('../pages/RoomPage'));
const RoomByIdPage = lazy(() => import('../pages/RoomByIdPage'));
const MakeASongRequestPage = lazy(() => import('../pages/MakeASongRequestPage'));
const RecommendSongPage = lazy(() => import('../pages/RecommendSongPage'));
const SongRequestsPage = lazy(() => import('../pages/SongRequestsPage'));

export const registeredAppRoutes: IRoute[] = [
  {
    path: '/dashboard',
    Component: DashboardPage,
    toolbarLinkBack: '/',
    permission: permissions.PAGE_DASHBOARD,
    exact: true
  },
  {
    path: '/rooms/:id',
    toolbarTitle: 'Room',
    Component: RoomByIdPage,
    toolbarLinkBack: '/',
    permission: permissions.PAGE_ROOM_BY_ID
  },
  {
    path: '/',
    toolbarTitle: 'Home',
    Component: HomePage,
    exact: true
  }
];

export const guestAppRoutes: IRoute[] = [
  {
    path: '/app',
    toolbarTitle: 'Room',
    Component: RoomPage,
    toolbarLinkBack: '/',
    permission: guestPermissions.PAGE_ROOM
  },
  {
    path: '/',
    toolbarTitle: 'Home',
    Component: HomePage,
    exact: true
  }
];

export const roomRoutes: IRoute[] = [
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
