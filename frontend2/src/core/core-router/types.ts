import { FocusEvent, LazyExoticComponent, ReactNode } from 'react'

export interface Route {
  path: string
  Component?: LazyExoticComponent<() => JSX.Element>
  activate?: boolean | { redirectTo: string }
}

export interface RoutesProps {
  routes: Route[]
  loadingElement?: ReactNode
}

export interface NavLinkProps {
  children: ReactNode
  to: string
  className?: string
  activeClassName?: string
  end?: boolean
  onFocus?: (event: FocusEvent<HTMLAnchorElement>) => void
  onBlur?: (event: FocusEvent<HTMLAnchorElement>) => void
}
