import { permissions } from '../../constants/permissions';
import AppRoute from '../../types/AppRoute';
import { MakeASongRequestPage, SongRequestsPage } from '../components';
import { RoomRoutesProps } from './types';

export default function getRoomRoutes(props: RoomRoutesProps): AppRoute[] {
  const { roomUser } = props;
  return [
    {
      path: '/',
      Component: SongRequestsPage,
      canActivate: () => roomUser.permissions.includes(permissions.PAGE_SONG_REQUEST)
    },
    {
      path: '/new-request',
      Component: MakeASongRequestPage,
      canActivate: () => roomUser.permissions.includes(permissions.PAGE_MAKE_A_SONG_REQUEST)
    },
    {
      path: '*',
      canActivate: () => ({ navigateTo: '/404' })
    }
  ];
}
