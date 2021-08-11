import AppRoute from '../types/AppRoute';

type GetRoutesProps = {
  routes: AppRoute[];
  permissions?: string[];
};
export function getRoutes(props: GetRoutesProps): AppRoute[] {
  const { routes, permissions } = props;
  const allowedRoutes = routes.filter((route) => {
    const { permission } = route;
    if (!permissions) {
      return !permission;
    }
    return !!permission && permissions.includes(permission);
  });
  return allowedRoutes;
}
