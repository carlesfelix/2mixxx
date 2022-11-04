import classNames from "classnames";
import { NavLink as ReactRouterNavLink } from "react-router-dom";
import { NavLinkProps } from "../../types";

export default function NavLink(props: NavLinkProps) {
  const { children, to, className, activeClassName } = props;
  function classNameCallback(opts: { isActive: boolean }): string {
    const { isActive } = opts;
    return classNames(
      'NavLink',
      isActive && activeClassName,
      className
    );
  }
  return (
    <ReactRouterNavLink to={to} className={classNameCallback}>
      {children}
    </ReactRouterNavLink>
  );
}