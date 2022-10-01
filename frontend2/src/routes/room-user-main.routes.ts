import { Route } from '@/core/core-router';
import { NotFoundPage } from '@/pages';

export default function roomUserMainRoutes(): Route[] {
  return [
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
