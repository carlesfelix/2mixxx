import { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AppRoute from '../../types/AppRoute';
import RouteContent from './components/RouteContent';

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
    <Switch>
      {
        allowedRoutes.map(({
          path, exact, Component: PageComponent
        }, iRoute) => (
          <Route path={`${parentUrl}${path}`} exact={exact} key={iRoute}>
            {
              <RouteContent>
                <Suspense fallback={false}>
                  <PageComponent />
                </Suspense>
              </RouteContent>
            }
          </Route>
        ))
      }
      {
        !!fallbackPath && (
          <Route render={() => <Redirect to={fallbackPath} />} />
        )
      }
    </Switch>
  );
}
