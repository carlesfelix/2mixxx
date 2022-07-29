import AppRoute from '../../types/AppRoute';
import { HomePage, NotFoundPage } from '../components';

export default function getGuestRoutes(): AppRoute[] {
  return [
    {
      path: '',
      Component: HomePage
    },
    {
      path: '/404',
      Component: NotFoundPage
    },
    {
      path: '*',
      canActivate: () => ({ navigateTo: '/404' })
    }
  ];
}
