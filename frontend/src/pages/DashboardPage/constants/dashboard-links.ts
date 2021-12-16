import { permissions } from '../../../constants/permissions';
import { DashboardLink } from '../types';

const dashboardLinks: DashboardLink[] = [
  {
    label: 'Moderate rooms',
    description: 'Delete and control the song requests from a room.',
    to: '/moderate/rooms',
    className: 'dashboard-item',
    permission: permissions.PAGE_MODERATE_ROOMS
  },
  {
    label: 'Manage rooms',
    description: 'Create, edit, delete and configure rooms.',
    to: '/dashboard/rooms',
    className: 'dashboard-item',
    permission: permissions.PAGE_ROOMS_DASHBOARD
  },
  {
    label: 'Manage libraries',
    description: 'Create, edit, and delete libraries and manage their songs.',
    to: '/dashboard/libraries',
    className: 'dashboard-item',
    permission: permissions.PAGE_LIBRARIES_DASHBOARD
  },
  {
    label: 'Manage users',
    description: 'Create, edit and delete registered users.',
    to: '/dashboard/users',
    className: 'dashboard-item',
    permission: permissions.PAGE_USERS_DASHBOARD
  }
];

export default dashboardLinks;
