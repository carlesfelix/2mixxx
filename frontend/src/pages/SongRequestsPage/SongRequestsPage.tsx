import BottomLink from '../../components/BottomLink';
import PageLayout from '../../components/PageLayout';
import SongRequestQueue from '../../components/SongRequestQueue';
import { useRoomSession } from '../../contexts/room-session';
import { useTranslation } from '../../services/i18n';
import './SongRequestsPage.scss';

export default function SongRequestsPage() {
  const { t } = useTranslation();
  const { songRequests, connectionStatus } = useRoomSession();

  return (
    <PageLayout
      toolbarTitle={t('Pages.SongRequestsPage.toolbarTitle')}
      className="SongRequestsPage"
      inProgress={!connectionStatus.connected}
      bottomBar={
        <BottomLink to="/new-request">
          {t('Pages.SongRequestsPage.bottomAction')}
        </BottomLink>
      }
    >
      <div className="page-content SongRequestsPage__content">
        <SongRequestQueue
          className="pending-songs"
          songRequests={songRequests.data}
        />
      </div>
    </PageLayout>
  );
}
