import AppRoute from '../../types/AppRoute';
import { ReactNode } from 'react';

export type RoutingProps = {
  routes: AppRoute[];
  loadingElement?: ReactNode;
};
