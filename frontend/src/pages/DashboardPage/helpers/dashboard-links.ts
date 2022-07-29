import { permissions } from '../../../constants/permissions';
import { TFunction } from '../../../services/i18n';
import { DashboardLink } from '../types';

export function getDashboardLinks(
  t: TFunction, userPermissions: string[]
): DashboardLink[] {
  const dashboardLinks: DashboardLink[] = [
    {
      label: t('Pages.DashboardPage.cardLinks.moderateRooms.title'),
      description: t('Pages.DashboardPage.cardLinks.moderateRooms.description'),
      to: '/moderate/rooms',
      className: 'dashboard-item',
      permission: permissions.PAGE_MODERATE_ROOMS
    },
    {
      label: t('Pages.DashboardPage.cardLinks.manageRooms.title'),
      description: t('Pages.DashboardPage.cardLinks.manageRooms.description'),
      to: '/rooms',
      className: 'dashboard-item',
      permission: permissions.PAGE_ROOMS_DASHBOARD
    },
    {
      label: t('Pages.DashboardPage.cardLinks.manageLibraries.title'),
      description: t('Pages.DashboardPage.cardLinks.manageLibraries.description'),
      to: '/libraries',
      className: 'dashboard-item',
      permission: permissions.PAGE_LIBRARIES_DASHBOARD
    },
    {
      label: t('Pages.DashboardPage.cardLinks.manageUsers.title'),
      description: t('Pages.DashboardPage.cardLinks.manageUsers.description'),
      to: '/users',
      className: 'dashboard-item',
      permission: permissions.PAGE_USERS_DASHBOARD
    }
  ];
  return dashboardLinks.filter(
    link => !link.permission || userPermissions.includes(link.permission)
  );
}
