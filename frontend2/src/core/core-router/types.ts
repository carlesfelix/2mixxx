import { type ComponentType, type FocusEvent, type KeyboardEventHandler, type LazyExoticComponent, type ReactNode } from 'react'

export interface Route {
  path: string
  Component?: LazyExoticComponent<ComponentType>
  activate?: boolean | { redirectTo: string }
}

export interface RouteItemProps {
  route: Route
  loadingElement?: ReactNode
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
  onKeyDown?: KeyboardEventHandler<HTMLAnchorElement>
}
