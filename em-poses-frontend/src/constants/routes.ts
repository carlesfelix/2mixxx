import { lazy } from 'react';
import IRoute from '../models/IRoute.model';
import { roomLinks } from './links';

const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const HomePage = lazy(() => import('../pages/HomePage'));
const RoomPage = lazy(() => import('../pages/RoomPage'));
const MakeASongRequestPage = lazy(() => import('../pages/MakeASongRequestPage'));
const RecommendSongPage = lazy(() => import('../pages/RecommendSongPage'));
const SongRequestsPage = lazy(() => import('../pages/SongRequestsPage'));

export const appRoutes: IRoute[] = [
  {
    path: '/dashboard',
    Component: DashboardPage,
    toolbarLinkBack: '/',
    permission: 'page:dashboard',
    exact: true
  },
  {
    path: '/rooms/:id',
    toolbarTitle: 'Room',
    Component: RoomPage,
    toolbarLinkBack: '/',
    permission: 'page:room'
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
