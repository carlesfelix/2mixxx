import { Route } from '@/core/core-router';
import {
  NoUserMainPage,
  EventUserMainPage,
  RegisteredUserMainPage
} from '@/pages';
import UserType from '@/types/UserType';

export default function mainRoutes (userType: UserType): Route[] {
  return [
    {
      path: '*',
      Component: NoUserMainPage,
      activate: userType === 'none'
    },
    {
      path: '*',
      Component: EventUserMainPage,
      activate: userType === 'event'
    },
    {
      path: '*',
      Component: RegisteredUserMainPage,
      activate: userType === 'registered'
    }
  ];
}
