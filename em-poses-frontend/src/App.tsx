import { createElement } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PageLayout from './components/PageLayout';
import appRoutes from './constants/app-routes';
import './App.scss';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {
            appRoutes.map((appRoute, iAppRoute) => (
              <Route path={appRoute.route.path} key={iAppRoute}>
                <PageLayout toolbarTitle={appRoute.route.toolbarTitle} routes={appRoutes}>
                  {createElement(appRoute.route.component)}
                </PageLayout>
              </Route>
            ))
          }
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
