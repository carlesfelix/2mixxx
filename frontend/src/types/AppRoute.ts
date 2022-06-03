import { LazyExoticComponent } from 'react';

type AppRoute = {
  path: string;
  Component?: LazyExoticComponent<() => JSX.Element>;
  canActivate?: () => boolean | { navigateTo: string };
};

export default AppRoute;
