import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { RoutingProps } from './types';

export default function Routing(props: RoutingProps) {
  const { routes, loadingElement = false } = props;
  const resolvedRoutes = routes.map(({
    canActivate = () => true, ...route
  }) => ({
    ...route,
    activate: canActivate()
  }));
  const allowedRoutes = resolvedRoutes.filter(({ activate }) => {
    return activate;
  });
  return (
    <Routes>
      {
        allowedRoutes.map(({
          path, Component: PageComponent, activate
        }, iRoute) => {
          return (
            <Route
              path={path}
              key={iRoute}
              element={
                typeof activate === 'object' ? (
                  <Navigate to={activate.navigateTo} />
                ) : (
                  <Suspense fallback={loadingElement}>
                    {PageComponent && <PageComponent />}
                  </Suspense>
                )
              }
            />
          );
        })
      }
    </Routes>
  );
}
