import { FocusEvent, LazyExoticComponent, ReactNode } from 'react';

export type Route = {
  path: string;
  Component?: LazyExoticComponent<() => JSX.Element>;
  activate?: boolean | { redirectTo: string };
};

export type RoutesProps = {
  routes: Route[];
  loadingElement?: ReactNode;
};

export type NavLinkProps = {
  children: ReactNode;
  to: string;
  className?: string;
  activeClassName?: string;
  end?: boolean;
  onFocus?: (event: FocusEvent<HTMLAnchorElement>) => void;
  onBlur?: (event: FocusEvent<HTMLAnchorElement>) => void;
};
