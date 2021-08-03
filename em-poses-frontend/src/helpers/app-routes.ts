import { appRoutes, roomRoutes } from '../constants/routes';
import IRoute from '../models/IRoute.model';

export function getAppRoutes(permissions?: string[]): IRoute[] {
  return appRoutes.filter(({ permission }) => {
    if (!permissions) {
      return !permission
    }
    return !!permission && permissions.includes(permission);
  });
}

export function getRoomRoutes(parentUrl: string = ''): IRoute[] {
  return roomRoutes.map(roomRoute => {
    const mappedLinks = roomRoute.links ? (
      roomRoute.links.map(roomLink => ({
        ...roomLink,
        to: `${parentUrl}${roomLink.to}`
      }))
    ) : undefined;
    return {
      ...roomRoute,
      links: mappedLinks
    }
  });
}

export default getAppRoutes;
