import { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import appRoutes from './constants/app-routes';

import './App.scss';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {
            appRoutes.map((appRoute, iAppRoute) => (
              <Route path={appRoute.path} key={iAppRoute}>
                <Suspense fallback={false}>
                  <appRoute.Component />
                </Suspense>
              </Route>
            ))
          }
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
