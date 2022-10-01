import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { RouterProps } from './types';

export function Router(props: RouterProps): JSX.Element {
  const { routes, loadingElement } = props;
  const allowedRoutes = routes
    .map(({ activate = true, ...rest }) => ({
      ...rest,
      activate
    }))
    .filter(({ activate }) => activate);
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
                typeof activate === 'boolean' ? (
                  <Suspense fallback={loadingElement}>
                    {PageComponent && <PageComponent />}
                  </Suspense>
                ) : (
                  <Navigate to={activate.redirectTo} />
                )
              }
            />
          );
        })
      }
    </Routes>
  );
}
