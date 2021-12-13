import { permissions } from '../../../constants/permissions';
import { DashboardLink } from '../types';

const dashboardLinks: DashboardLink[] = [
  {
    label: 'Moderate rooms',
    to: '/moderate/rooms',
    className: 'dashboard-item',
    permission: permissions.PAGE_MODERATE_ROOMS
  },
  {
    label: 'Manage rooms',
    to: '/dashboard/rooms',
    className: 'dashboard-item',
    permission: permissions.PAGE_ROOMS_DASHBOARD
  },
  {
    label: 'Manage libraries',
    to: '/dashboard/libraries',
    className: 'dashboard-item',
    permission: permissions.PAGE_LIBRARIES_DASHBOARD
  },
  {
    label: 'Manage users',
    to: '/dashboard/users',
    className: 'dashboard-item',
    permission: permissions.PAGE_USERS_DASHBOARD
  }
];

export default dashboardLinks;
