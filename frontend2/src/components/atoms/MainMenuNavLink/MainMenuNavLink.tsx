import { useFocusHighlight } from '@/core/core-pointer-element';
import { NavLink } from '@/core/core-router';
import classNames from 'classnames';
import { FocusEvent } from 'react';
import './MainMenuNavLink.css';
import { MainMenuNavLinkProps } from './types';

export default function MainMenuNavLink(props: MainMenuNavLinkProps) {
  const { icon, label, to } = props;
  const { blur, focus, isHighlighted } = useFocusHighlight();
  function focusHandler(event: FocusEvent<HTMLAnchorElement>): void {
    focus(event);
  }
  function blurHandler(): void {
    blur();
  }
  const rootClassName = classNames(
    'MainMenuNavLink',
    { 'MainMenuNavLink--highlighted': isHighlighted }
  );
  return (
    <NavLink
      to={to}
      className={rootClassName}
      activeClassName="MainMenuNavLink--active"
      onBlur={blurHandler}
      onFocus={focusHandler}
    >
      <span className="MainMenuNavLink__icon">
        {icon}
      </span>
      <span className="MainMenuNavLink__label">
        {label}
      </span>
    </NavLink>
  );
}
