import { Suspense } from 'react';
import { Navigate, Route, Routes as Switch } from 'react-router-dom';
import LoadingPage from '../../pages/LoadingPage';
import AppRoute from '../../types/AppRoute';

type Props = {
  routes: AppRoute[];
  fallbackPath?: string;
  parentUrl?: string;
  permissions?: string[];
};
export default function Routes(props: Props) {
  const { routes, fallbackPath, parentUrl = '', permissions } = props;
  const allowedRoutes = routes.filter(route => {
    const { permission } = route;
    if (!permissions) {
      return !permission;
    }
    return !!permission && permissions.includes(permission);
  });
  return (
    <>
      <Switch>
        {
          allowedRoutes.map(({
            path, Component: PageComponent
          }, iRoute) => (
            <Route
              path={`${parentUrl}${path}`}
              key={iRoute}
              element={
                <Suspense fallback={<LoadingPage />}>
                  <PageComponent />
                </Suspense>
              }
            />
          ))
        }
        {
          fallbackPath && (
            <Route path="*" element={<Navigate to={fallbackPath} />} />
          )
        }
      </Switch>
      {/* {
        !!fallbackPath && (
          <Navigate to={fallbackPath} />
        )
      } */}
    </>
  );
}
