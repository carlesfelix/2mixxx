import { Redirect, Route, Switch } from 'react-router-dom';
import AppRoute from '../../types/AppRoute';
import PageLayout from '../PageLayout';
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
          path, exact, Component: PageComponent, layout = true,
          toolbarTitle, toolbarLinkBack, links
        }, iRoute) => (
          <Route path={`${parentUrl}${path}`} exact={exact} key={iRoute}>
            {
              layout ? (
                <PageLayout
                  toolbarTitle={toolbarTitle} links={links}
                  toolbarLinkBack={toolbarLinkBack}
                  parentUrl={parentUrl}
                >
                  <RouteContent>
                    <PageComponent />
                  </RouteContent>
                </PageLayout>
              ) : (
                <RouteContent>
                  <PageComponent />
                </RouteContent>
              )
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
