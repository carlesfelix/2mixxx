import { type Route } from '@/core/core-router'
import { LoginPage, NotFoundPage } from '@/pages'

export default function noUserMainRoutes (): Route[] {
  return [
    {
      path: '/',
      Component: LoginPage
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
