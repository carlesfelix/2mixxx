import { LazyExoticComponent } from 'react';
import AppLink from './AppLink';

type AppRoute = {
  path: string;
  toolbarTitle?: string;
  toolbarLinkBack?: string;
  Component: LazyExoticComponent<() => JSX.Element>;
  permission?: string;
  links?: AppLink[];
  exact?: boolean;
  layout?: boolean;
};

export default AppRoute;
