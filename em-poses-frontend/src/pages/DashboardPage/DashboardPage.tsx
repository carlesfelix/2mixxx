import PageLayout from '../../components/PageLayout';
import DashboardLink from './components/DashboardLink';
import dashboardLinks from './constants/dashboard-links';
import './DashboardPage.scss';

export default function DashboardPage() {
  return (
    <PageLayout toolbarTitle="Dashboard">
      <div className="DashboardPage">
        {
          dashboardLinks.map((link, iLink) => (
            <DashboardLink dashboardLink={link} key={iLink} />
          ))
        }
      </div>
    </PageLayout>
  );
}
