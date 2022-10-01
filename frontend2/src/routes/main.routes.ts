import { Route } from "@/core/core-router";
import {
  NoUserMainPage,
  RoomUserMainPage,
  RegisteredUserMainPage
} from "@/pages";
import UserType from "@/types/UserType";

export default function mainRoutes(userType: UserType): Route[] {
  return [
    {
      path: '*',
      Component: NoUserMainPage,
      activate: userType === 'none'
    },
    {
      path: '*',
      Component: RoomUserMainPage,
      activate: userType === 'room'
    },
    {
      path: '*',
      Component: RegisteredUserMainPage,
      activate: userType === 'registered'
    }
  ];
}
