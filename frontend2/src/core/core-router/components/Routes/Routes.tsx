import { Suspense } from 'react'
import { Navigate, Route, Routes as ReactRouterRoutes } from 'react-router-dom'
import { RoutesProps } from '../../types'

export default function Routes (props: RoutesProps): JSX.Element {
  const { routes, loadingElement } = props
  const allowedRoutes = routes
    .map(({ activate = true, ...rest }) => ({
      ...rest,
      activate
    }))
    .filter(({ activate }) => activate)
  return (
    <ReactRouterRoutes>
      {
        allowedRoutes.map(({
          path, Component: PageComponent, activate
        }, iRoute) => {
          return (
            <Route
              path={path}
              key={iRoute}
              element={
                typeof activate === 'boolean'
                  ? (
                  <Suspense fallback={loadingElement}>
                    {(PageComponent != null) && <PageComponent />}
                  </Suspense>
                    )
                  : (
                  <Navigate to={activate.redirectTo} />
                    )
              }
            />
          )
        })
      }
    </ReactRouterRoutes>
  )
}
