import classNames from 'classnames'
import { ForwardedRef, forwardRef, ReactElement } from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'
import { LinkProps } from './types'

function LinkWithRef (
  props: LinkProps,
  ref: ForwardedRef<HTMLAnchorElement>
): ReactElement {
  const { children, className, to } = props

  const rootClassName = classNames('Link', className)
  return (
    <ReactRouterLink
      ref={ref}
      className={rootClassName}
      to={to}
      tabIndex={0}
    >
      {children}
    </ReactRouterLink>
  )
}

const Link = forwardRef(LinkWithRef)

export default Link
