import { Route } from '@/core/core-router';
import { RegisteredUserEventsPage, NotFoundPage } from '@/pages';

export default function registeredUserMainRoutes(): Route[] {
  return [
    {
      path: '/',
      Component: RegisteredUserEventsPage
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
