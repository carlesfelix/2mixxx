import { LazyExoticComponent } from 'react';
import ILink from './ILink.model';

export default interface IRoute {
  path: string;
  toolbarTitle?: string;
  toolbarLinkBack?: string;
  Component: LazyExoticComponent<() => JSX.Element>;
  permission?: string;
  links?: ILink[];
  exact?: boolean;
}
