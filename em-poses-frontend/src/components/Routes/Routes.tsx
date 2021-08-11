import { Redirect, Route, Switch } from 'react-router-dom';
import AppRoute from '../../types/AppRoute';
import PageLayout from '../PageLayout';
import RouteContent from './components/RouteContent';

type Props = {
  routes: AppRoute[];
  fallbackPath?: string;
};
export default function Routes(props: Props) {
  const { routes, fallbackPath } = props;
  return (
    <Switch>
      {
        routes.map(({
          path, exact, Component: PageComponent, layout = true,
          toolbarTitle, toolbarLinkBack, links
        }, iRoute) => (
          <Route path={path} exact={exact} key={iRoute}>
            {
              layout ? (
                <PageLayout toolbarTitle={toolbarTitle} links={links} toolbarLinkBack={toolbarLinkBack}>
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
