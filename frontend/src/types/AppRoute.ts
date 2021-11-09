import { LazyExoticComponent } from 'react';

type AppRoute = {
  path: string;
  Component: LazyExoticComponent<() => JSX.Element>;
  permission?: string;
  exact?: boolean;
};

export default AppRoute;
