import { LazyExoticComponent } from 'react';
import IAppLink from './IAppLink.model';

export default interface IAppRoute {
  path: string;
  toolbarTitle?: string;
  toolbarLinkBack?: string;
  Component: LazyExoticComponent<() => JSX.Element>;
  permission?: string;
  links?: IAppLink[];
}
