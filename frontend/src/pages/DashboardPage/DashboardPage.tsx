import PageLayout from '../../components/PageLayout';
import { useMe } from '../../contexts/me';
import { useTranslation } from '../../services/i18n';
import DashboardLink from './components/DashboardLink';
import { getDashboardLinks } from './helpers/dashboard-links';
import './DashboardPage.scss';

export default function DashboardPage() {
  const { state: meState } = useMe();
  const { t } = useTranslation();
  const dashboardLinks = getDashboardLinks(
    t, meState.user?.permissions || []
  );
  return (
    <PageLayout
      toolbarTitle={t('Pages.DashboardPage.toolbar.title')}
      className="DashboardPage"
    >
      <div className="page-content dashboard-menu layout layout-center-v">
        <div className="dashboard-menu__items">
          {
            dashboardLinks.map((link, iLink) => (
              <DashboardLink dashboardLink={link} key={iLink} />
            ))
          }
        </div>
      </div>
    </PageLayout>
  );
}
