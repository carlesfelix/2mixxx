import AppRoute from '../types/AppRoute';

type GetRoutesProps = {
  routes: AppRoute[];
  permissions?: string[];
  parentUrl?: string;
};
export function getRoutes(props: GetRoutesProps): AppRoute[] {
  const { routes, permissions, parentUrl = '' } = props;
  const allowedRoutes = routes.filter((route) => {
    const { permission } = route;
    if (!permissions) {
      return !permission;
    }
    return !!permission && permissions.includes(permission);
  });
  return allowedRoutes.map(roomRoute => {
    const mappedLinks = roomRoute.links ? (
      roomRoute.links.map(roomLink => ({
        ...roomLink,
        to: `${parentUrl}${roomLink.to}`
      }))
    ) : undefined;
    return {
      ...roomRoute,
      links: mappedLinks,
      path: `${parentUrl}${roomRoute.path}`
    }
  });
}
