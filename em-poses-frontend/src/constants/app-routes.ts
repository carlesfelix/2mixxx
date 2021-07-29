import { faCog, faListAlt, faPaperPlane, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { lazy } from 'react';
import IAppRoute from '../models/IAppRoute.model';

const AdminPage = lazy(() => import('../pages/AdminPage'));
const HomePage = lazy(() => import('../pages/HomePage'));
const MakeASongRequestPage = lazy(() => import('../pages/MakeASongRequestPage'));
const RecommendSongPage = lazy(() => import('../pages/RecommendSongPage'));
const SongRequestsPage = lazy(() => import('../pages/SongRequestsPage'));

const appRoutes: IAppRoute[] = [
  {
    navLink: {
      to: '/song-requests',
      icon: faListAlt,
      label: 'Song requests'
    },
    route: {
      path: '/song-requests',
      toolbarTitle: 'Song requests',
      Component: SongRequestsPage
    }
  },
  {
    navLink: {
      to: '/make-a-song-request',
      icon: faPlusSquare,
      label: 'Make a song request'
    },
    route: {
      path: '/make-a-song-request',
      toolbarTitle: 'Make a song request',
      Component: MakeASongRequestPage
    }
  },
  {
    navLink: {
      to: '/recommend-song',
      icon: faPaperPlane,
      label: 'Recommend song'
    },
    route: {
      path: '/recommend-song',
      toolbarTitle: 'Recomend song',
      Component: RecommendSongPage
    }
  },
  {
    navLink: {
      to: '/admin',
      icon: faCog,
      label: 'Admin'
    },
    route: {
      path: '/admin',
      toolbarTitle: 'Admin',
      Component: AdminPage
    }
  },
  {
    route: {
      path: '/',
      toolbarTitle: 'Home',
      Component: HomePage
    }
  }
];

export default appRoutes;
