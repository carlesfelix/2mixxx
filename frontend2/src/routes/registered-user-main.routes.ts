import { type Route } from '@/core/core-router'
import {
  RegisteredUserEventsPage,
  NotFoundPage,
  RegisteredUserCreateEventPage
} from '@/pages'

export default function registeredUserMainRoutes (): Route[] {
  return [
    {
      path: '/',
      Component: RegisteredUserEventsPage
    },
    {
      path: '/events/create',
      Component: RegisteredUserCreateEventPage
    },
    {
      path: '/404',
      Component: NotFoundPage
    },
    {
      path: '*',
      activate: { redirectTo: '/404' }
    }
  ]
}
