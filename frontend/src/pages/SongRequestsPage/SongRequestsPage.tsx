import BottomLink from '../../components/BottomLink';
import PageLayout from '../../components/PageLayout';
import { useTranslation } from '../../services/i18n';
import SongRequestsPageContent from './components/SongRequestsPageContent';
import './SongRequestsPage.scss';

export default function SongRequestsPage() {
  const { t } = useTranslation();

  return (
    <PageLayout
      toolbarTitle={t('Pages.SongRequestsPage.toolbarTitle')}
      className="SongRequestsPage"
      bottomBar={
        <BottomLink to="/new-request">
          {t('Pages.SongRequestsPage.bottomAction')}
        </BottomLink>
      }
    >
      <SongRequestsPageContent />
    </PageLayout>
  );
}
