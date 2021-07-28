import { faCog, faListAlt, faPaperPlane, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import IAppRoute from '../models/IAppRoute.model';
import HomePage from '../pages/HomePage';
import SongRequestsPage from '../pages/SongRequestsPage';

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
      component: SongRequestsPage
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
      component: HomePage
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
      component: HomePage
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
      component: HomePage
    }
  },
  {
    route: {
      path: '/',
      toolbarTitle: 'Home',
      component: HomePage
    }
  }
];

export default appRoutes;
