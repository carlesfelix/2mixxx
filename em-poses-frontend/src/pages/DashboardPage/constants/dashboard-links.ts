import { DashboardLink } from '../types';

const dashboardLinks: DashboardLink[] = [
  {
    label: 'Manage rooms',
    to: '/dashboard/rooms',
    className: 'dashboard-item'
  },
  {
    label: 'Manage libraries',
    to: '/dashboard/libraries',
    className: 'dashboard-item'
  },
  {
    label: 'Manage users',
    to: '/dashboard/users',
    className: 'dashboard-item'
  }
];

export default dashboardLinks;