import { LazyExoticComponent, ReactNode } from 'react';

export type Route = {
  path: string;
  Component?: LazyExoticComponent<() => JSX.Element>;
  activate?: boolean | { redirectTo: string };
};

export type RouterProps = {
  routes: Route[];
  loadingElement?: ReactNode;
};
