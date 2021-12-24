import PageLayout from '../../components/PageLayout';
import { useMe } from '../../contexts/me';
import DashboardLink from './components/DashboardLink';
import dashboardLinks from './constants/dashboard-links';
import './DashboardPage.scss';

export default function DashboardPage() {
  const { state: meState } = useMe();
  const mePermissions = meState.user?.user.permissions || [];
  return (
    <PageLayout toolbarTitle="Dashboard" className="DashboardPage">
      <div className="page-content dashboard-menu layout layout-center-v">
        <div className="dashboard-menu__items">
          {
            dashboardLinks.filter(
              link => !link.permission || mePermissions.includes(link.permission)
            ).map((link, iLink) => (
              <DashboardLink dashboardLink={link} key={iLink} />
            ))
          }
        </div>
      </div>
    </PageLayout>
  );
}
