import { lazy } from 'react';
import IAppRoute from '../../../models/IAppRoute.model';
import { getRoomPageLinks } from './room-page-links';

const MakeASongRequestPage = lazy(() => import('../../MakeASongRequestPage'));
const RecommendSongPage = lazy(() => import('../../RecommendSongPage'));
const SongRequestsPage = lazy(() => import('../../SongRequestsPage'));
const RoomPageHome = lazy(() => import('../../RoomPageHome'));

export function getRoomPageRoutes(parentUrl: string = ''): IAppRoute[] {
  const commonLinks = getRoomPageLinks(parentUrl);
  const routes: IAppRoute[] = [
    {
      path: '/song-requests',
      toolbarTitle: 'Song requests',
      Component: SongRequestsPage,
      links: commonLinks,
      toolbarLinkBack: '/'
    },
    {
      path: '/make-a-song-request',
      toolbarTitle: 'Make a song request',
      Component: MakeASongRequestPage,
      links: commonLinks
    },
    {
      path: '/recommend-song',
      toolbarTitle: 'Recomend song',
      Component: RecommendSongPage,
      links: commonLinks
    },
    {
      path: '/',
      toolbarTitle: 'Song requests',
      Component: RoomPageHome,
    },
  ];
  return routes;
}
