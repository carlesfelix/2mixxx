import { lazy } from 'react';
import IAppRoute from '../models/IAppRoute.model';

const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const HomePage = lazy(() => import('../pages/HomePage'));
const RoomPage = lazy(() => import('../pages/RoomPage'));

const appRoutes: IAppRoute[] = [
  {
    path: '/dashboard',
    Component: DashboardPage,
    toolbarLinkBack: '/'
  },
  {
    path: '/rooms/:id',
    toolbarTitle: 'Room',
    Component: RoomPage,
    toolbarLinkBack: '/'
  },
  {
    path: '/',
    toolbarTitle: 'Home',
    Component: HomePage
  }
];

export default appRoutes;
