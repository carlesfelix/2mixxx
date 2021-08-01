import { lazy } from 'react';
import IAppRoute from '../models/IAppRoute.model';

const AdminPage = lazy(() => import('../pages/AdminPage'));
const HomePage = lazy(() => import('../pages/HomePage'));
const RoomPage = lazy(() => import('../pages/RoomPage'));

const appRoutes: IAppRoute[] = [
  {
    path: '/admin',
    toolbarTitle: 'Admin',
    Component: AdminPage,
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
