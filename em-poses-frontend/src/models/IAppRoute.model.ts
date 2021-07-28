import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FunctionComponent } from 'react';

export default interface IAppRoute {
  route: {
    path: string;
    toolbarTitle: string;
    component: FunctionComponent;
  };
  navLink?: {
    to: string;
    icon: IconDefinition;
    label: string;
  };
  permission?: string;
}
