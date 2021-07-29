import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { LazyExoticComponent } from 'react';

export default interface IAppRoute {
  route: {
    path: string;
    toolbarTitle: string;
    Component: LazyExoticComponent<() => JSX.Element>;
  };
  navLink?: {
    to: string;
    icon: IconDefinition;
    label: string;
  };
  permission?: string;
}
