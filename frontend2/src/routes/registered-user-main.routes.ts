import { Route } from '@/core/core-router';
import { RegisteredUserRoomsPage, NotFoundPage } from '@/pages';

export default function registeredUserMainRoutes(): Route[] {
  return [
    {
      path: '/',
      Component: RegisteredUserRoomsPage
    },
    {
      path: '/404',
      Component: NotFoundPage
    },
    {
      path: '*',
      activate: { redirectTo: '/404' }
    }
  ];
}
