import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { DashboardLink as DashboardLinkType } from '../../types';
import './DashboardLink.scss';

export type Props = {
  dashboardLink: DashboardLinkType
};
export default function DashboardLink(props: Props) {
  const { dashboardLink } = props;
  const { label, to, description, className = '' } = dashboardLink;
  const rootClassNames = classNames('card card-primary DashboardLink', {
    [className]: !!className
  });
  return (
    <NavLink to={to} className={rootClassNames}>
      <h2 className="card-title dashboard-link__label">
        {label}
      </h2>
      {
        !!description && (
          <p className="card-paragraph">
            {description}
          </p>
        )
      }
    </NavLink>
  );
}