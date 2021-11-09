import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { DashboardLink as DashboardLinkType } from '../../types';
import './DashboardLink.scss';

export type Props = {
  dashboardLink: DashboardLinkType
};
export default function DashboardLink(props: Props) {
  const { dashboardLink } = props;
  const { label, to, className = '' } = dashboardLink;
  const rootClassNames = classNames('card card-primary DashboardLink', {
    [className]: !!className
  });
  return (
    <NavLink to={to} className={rootClassNames}>
      <span className="dashboard-link__label">
        {label}
      </span>
      <span className="dashboard-link__icon">
        <FontAwesomeIcon icon={faChevronRight} />
      </span>
    </NavLink>
  );
}